<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client as GuzzleHttpClient,
    League\OAuth2\Client\Provider\Exception\IdentityProviderException,
    League\OAuth2\Client\Provider\GenericProvider,
    League\OAuth2\Client\Token\AccessToken,
    Symfony\Component\Security\Core\Encoder\BCryptPasswordEncoder,
    Tymon\JWTAuth\Exceptions\JWTException,
    Zend\Mail\Message,
    Zend\Mail\Transport\Smtp as SmtpTransport,
    Zend\Mail\Transport\SmtpOptions,
    Zend\Mime\Message as MimeMessage,
    Zend\Mime\Part as MimePart,
    Chaos\Foundation\Exceptions\ValidateException;

/**
 * Class AuthController
 * @author ntd1712
 */
class AuthController extends Controller
{
    /**
     * For route:cache only.
     */
    public function spa()
    {
        return view($this->__getConfig()->get('app.theme') . '.app', ['config' => $this->__getConfig()]);
    }

    /**
     * For route:cache only.
     */
    public function ping() {}

    /**
     * {@inheritdoc}
     */
    public function oauth2(\Request $request, $returnOnly = false)
    {
        // get resource owner
        $provider = new GenericProvider($this->__getConfig()->get('auth.drivers.oauth2'));
        $provider->setHttpClient(new GuzzleHttpClient(['verify' => false]));

        switch ($grant = $request::get('grant'))
        {
            case 'access_token':
                $accessToken = new AccessToken($request::all() + [
                    'expires_in' => $this->__getConfig()->get('session.cookie_lifetime')
                ]);

                if ($accessToken->hasExpired())
                {
                    throw new IdentityProviderException('token_expired', 0, []);
                }
                break;
            case 'client_credentials':
                $accessToken = $provider->getAccessToken($grant);
                break;
            case 'password':
                $accessToken = $provider->getAccessToken($grant, [
                    'username' => $request::get('email'),
                    'password' => $request::get('password')
                ]);
                break;
            case 'refresh_token':
                try
                {
                    $accessToken = $provider->getAccessToken($grant, [
                        'refresh_token' => $request::get('refresh_token')
                    ]);
                }
                catch (IdentityProviderException $e) {}
                break;
            default:
        }

        if (!isset($accessToken))
        {
            if (null === $request::get('code'))
            {
                $authorizationUrl = $provider->getAuthorizationUrl();
                \Session::set('oauth2state', $provider->getState());
                \Session::save();

                return \Redirect::away($authorizationUrl);
            }
            elseif (isBlank($request::get('state')) ||
                urldecode($request::get('state')) !== urldecode(\Session::pull('oauth2state')))
            {
                \Session::save();
                throw new IdentityProviderException('invalid_state', 0, []);
            }

            $accessToken = $provider->getAccessToken('authorization_code', [
                'code' => urldecode($request::get('code'))
            ]);
        }

        $resourceOwner = $provider->getResourceOwner($accessToken)->toArray()['data'][0];
        /** @var \Account\Entities\User $entity */
        $entity = $this->getService('User')->getByName($resourceOwner['userName']);

        if (null === $entity) // create user if not exist
        {
            $response = $this->getService('User')->create([
                'Name' => $resourceOwner['userName'],
                'Email' => $resourceOwner['emailAddress'],
                'Profile' => [
                    'DisplayName' => $resourceOwner['realName'] ?: $resourceOwner['loginName'],
                    'Age' => $resourceOwner['age'],
                    'Sex' => $resourceOwner['sex']
                ],
                'OpenId' => $resourceOwner['userId'],
                'EditedBy' => $resourceOwner['userName']
            ] + $this->getRequest());
            $entity = $response['data'];
        }

        // prepare data
        $user = $entity->toSimpleArray();
        $user['Roles'] = $user['Permissions'] = [];

        \JWTAuth::manager()->getPayloadFactory()->setTTL(($accessToken->getExpires() - time()) / 60);
        $token = \JWTAuth::setIdentifier('Id')->fromUser($entity, ['res' => $user]);

        // save into session
        \Session::set('accessToken', $accessToken);
        \Session::set('locale', $request::get('language', @$user['Locale']));
        \Session::set('loggedName', $user['Name']);
        \Session::set('loggedUser', $user);
        \Session::save();

        // bye!
        if ($returnOnly)
        {
            return compact('token');
        }

        return \Redirect::away($this->__getConfig()->get('app.url') . "/#/oauth2?s={$token}&r={$accessToken->getRefreshToken()}");
    }

    /**
     * The "login" action.
     *
     * @param   \Request $request
     * @return  array|\Symfony\Component\HttpFoundation\Response
     * @throws  JWTException
     * @throws  ValidateException
     */
    public function postLogin(\Request $request)
    {
        // are we logging out, or doing something else?
        if (true === (bool)$request::get('logout'))
        {
            return $this->postLogout();
        }

        if (true === (bool)$request::get('identity'))
        {
            return $this->postIdentity($request);
        }

        if (true === (bool)$request::get('reset'))
        {
            return $this->postReset($request);
        }

        // do some checks
        $validator = $this->getValidationFactory()->make($request::all(), [
            'email' => 'required|email|max:255', 'password' => 'required'
        ]);

        if ($validator->fails())
        {
            throw new ValidateException(implode('; ', $validator->getMessageBag()->all()));
        }

        switch ($this->__getConfig()->get('auth.default_driver'))
        {
            case 'oauth2':
                return $this->oauth2($request, true);
            default:
        }

        /** @var \Account\Entities\User $entity */
        $entity = $this->getService('User')->getByEmail($request::get('email'));

        if (null === $entity || !\Hash::check($request::get('password'), $entity->getPassword()))
        {
            throw new ValidateException('Invalid credentials');
        }

        // prepare data
        $user = $entity->toArray();
        $user['Roles'] = $user['Permissions'] = [];

        if (0 !== count($roles = $entity->getRoles()))
        {   /** @var \Account\Entities\UserRole $userRole */
            foreach ($roles as $userRole)
            {
                $user['Roles'][strtolower($userRole->getRole()->getName())] = $userRole->getRole()->getId();

                if (0 !== count($permissions = $userRole->getRole()->getPermissions()))
                {   /** @var \Account\Entities\Permission $permission */
                    foreach ($permissions as $permission)
                    {
                        $user['Permissions'][strtolower($permission->getName())] = $permission->getId();
                    }
                }
            }
        }

        $token = \JWTAuth::setIdentifier('Id')->fromUser($entity, ['res' => $user]);

        // save into session
        \Session::set('locale', $request::get('locale', @$user['Locale']));
        \Session::set('loggedName', $user['Name']);
        \Session::set('loggedUser', $user);
        \Session::save();

        // bye!
        return compact('token');
    }

    /**
     * The "logout" action.
     *
     * @return  array
     */
    public function postLogout()
    {
        try
        {
            \JWTAuth::invalidate(\JWTAuth::getToken());
        }
        catch (JWTException $e) {}

        \Session::forget('locale');
        \Session::forget('loggedName');
        \Session::forget('loggedUser');
        \Session::save();

        return ['success' => true];
    }

    /**
     * The "identity (forgot password)" action.
     *
     * @param   \Request $request
     * @return  array
     * @throws  JWTException
     */
    public function postIdentity(\Request $request)
    {
        // do some checks
        $validator = $this->getValidationFactory()->make($request::all(), [
            'email' => 'required|email|max:255'
        ]);

        if (!$validator->fails())
        {   /** @var \Account\Entities\User $entity */
            $entity = $this->getService('User')->getByEmail($request::get('email'));
        }

        if (!isset($entity))
        {
            throw new ValidateException('Invalid credentials');
        }

        // prepare data for email
        $part = new MimePart(nl2br(strtr(\Lang::get('auth.identity_tpl'), [
            ':name' => $entity->getName(),
            ':link' => $this->__getConfig()->get('app.url') . $this->__getConfig()->get('urls.reset')
                . base64_encode($entity->getEmail())
        ])));
        $part->type = 'text/html';
        $body = new MimeMessage;
        $body->addPart($part);

        $mailer = $this->__getConfig()->get('mail.mailers')[$this->__getConfig()->get('mail.default_mailer')];
        $message = new Message;
        $message
            ->addTo($entity->getEmail(), $entity->getName())
            ->addFrom($mailer['username'], \Lang::get('auth.identity_sender'))
            ->setSubject(\Lang::get('auth.identity_subject'))
            ->setBody($body);

        $smtp = new SmtpTransport(new SmtpOptions([
            'host' => $mailer['host'],
            'port' => $mailer['port'],
            'connection_config' => [
                'username' => $mailer['username'],
                'password' => $mailer['password']
            ],
            'connection_class' => $mailer['auth_mode']
        ]));
        $smtp->send($message);

        // bye!
        return ['success' => true];
    }

    /**
     * TODO: make sure we are the one who have requested to reset password
     *
     * The "reset (password)" action.
     *
     * @param   \Request $request
     * @return  array
     * @throws  JWTException
     */
    public function postReset(\Request $request)
    {
        // do some checks
        $email = base64_decode($request::get('email'));
        $validator = $this->getValidationFactory()->make(['email' => $email] + $request::all(), [
            'email' => 'required|email|max:255', 'password' => 'required'
        ]);

        if (!$validator->fails())
        {   /** @var \Account\Entities\User $entity */
            $entity = $this->getService('User')->getByEmail($email);
        }

        if (!isset($entity))
        {
            throw new ValidateException('Invalid credentials');
        }

        // prepare data
        $entity->setPassword((new BCryptPasswordEncoder(10))->encodePassword($request::get('password'), null));
        $affectedRows = $this->getService('User')->getRepository()->update($entity);

        // bye!
        return ['success' => 0 != $affectedRows];
    }

    /**
     * The "register" action.
     *
     * @return  array
     */
    public function postRegister()
    {
        return $this->getService('User')->create($this->getRequest());
    }
}