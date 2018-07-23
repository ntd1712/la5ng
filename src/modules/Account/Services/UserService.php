<?php

namespace Account\Services;

use Chaos\Foundation\AbstractBaseService;
use Chaos\Foundation\Events\UpdateEventArgs;
use Chaos\Foundation\Exceptions\ValidateException;
use Symfony\Component\Security\Core\Encoder\BCryptPasswordEncoder;

/**
 * Class UserService
 * @author ntd1712
 */
class UserService extends AbstractBaseService
{
    /**
     * @param   string $value
     * @return  null|\Account\Entities\User
     */
    public function getByEmail($value)
    {
        return null === $value ? null : $this->getRepository()->getByEmail($value);
    }

    /**
     * @param   string $value
     * @return  null|\Account\Entities\User
     */
    public function getByName($value)
    {
        return $this->getRepository()->getByName($value);
    }

    /**
     * {@inheritdoc}
     */
    protected function onExchangeArray(UpdateEventArgs $eventArgs)
    {
        $payload = $eventArgs->getPayload();
        $post = $eventArgs->getPost();

        if (!$eventArgs->isNew()) {
            if (isset($post['Password']) && $this->__getConfig()->get('app.default_password') === $post['Password']) {
                unset($post['Password']);
            }
        }

        if (isset($post['Password'])) {
            if (isset($payload['ConfirmPassword']) && $payload['ConfirmPassword'] !== $post['Password']) {
                throw new ValidateException('Password does not match the confirm password');
            }

            $bcrypt = new BCryptPasswordEncoder(10);

            if (isset($payload['OldPassword']) && !$eventArgs->isNew() &&
                !$bcrypt->isPasswordValid($eventArgs->getEntity()->getPassword(), $payload['OldPassword'], null)) {
                throw new ValidateException('The old password is invalid');
            }

            $post['Password'] = $bcrypt->encodePassword($post['Password'], null);
        }

        if (isset($post['Profile'])) {
            if (is_array($post['Profile'])) {
                foreach ($post['Profile'] as &$v) {
                    $v = filter_var(html_entity_decode($v, ENT_QUOTES), FILTER_SANITIZE_STRING);
                }
                unset($v);
            } else {
                $post['Profile'] = null;
            }
        }

        $eventArgs->setPost($post);
    }

    /**
     * {@inheritdoc}
     */
    protected function onBeforeSave(UpdateEventArgs $eventArgs)
    {
        $payload = $eventArgs->getPayload();

        // check to make sure we have an unique email
        if ($eventArgs->isNew()) {
            if (!(null === $this->getByName($eventArgs->getEntity()->Name)
                || null === $this->getByEmail($eventArgs->getEntity()->Email))) {
                throw new ValidateException('The username or email address is already in use, please try another');
            }
        } else {
            $criteria = $this->getRepository()->criteria;
            $criteria->where($criteria->expr()->eq('Name', $eventArgs->getEntity()->Name));

            if (null !== $this->getByEmail($eventArgs->getEntity()->Email)) {
                $criteria->orWhere($criteria->expr()->eq('Email', $eventArgs->getEntity()->Email));
            }

            $criteria->andWhere($criteria->expr()->neq('Id', $eventArgs->getEntity()->Id));

            if ($this->getRepository()->exist($criteria)) {
                throw new ValidateException('The username or email address is already in use, please try another');
            }

            $this->getRepository('UserRole')->deleteByUser($eventArgs->getEntity()->Id);
        }

        // update associated data
        if (!empty($eventArgs->getEntity()->Roles)) {
            $eventArgs->getEntity()->Roles->clear();
        }

        if (!empty($payload['Roles']) && is_array($payload['Roles'])) {
            foreach ($payload['Roles'] as $k => $v) {
                if (!isset($v['Id']) || !is_numeric($v['Id']) || 1 > $v['Id']) {
                    unset($payload['Roles'][$k]);
                }
            }

            $roles = $this->getRepository('Role')->getByIds(array_column($payload['Roles'], 'Id'));

            /** @var \Account\Entities\UserRole $userRole */
            $userRole = $this->getRepository('UserRole')->getClassName();

            foreach ($roles as $v) {
                $userRole = new $userRole;
                $userRole
                    ->setUser($eventArgs->getEntity())
                    ->setRole($v)
                    ->setIsPrimary($payload['Roles'][0]['Id'] == $v->Id);

                $eventArgs->getEntity()->Roles->add($userRole);
            }
        }
    }
}
