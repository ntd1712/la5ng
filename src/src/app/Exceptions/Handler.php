<?php namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

/**
 * Class Handler
 * @author ntd1712
 */
class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        'Symfony\Component\HttpKernel\Exception\HttpException',
        'Chaos\Foundation\Exceptions\ServiceException',
        'Chaos\Foundation\Exceptions\ValidateException'
    ];

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, \Exception $e)
    {
        if ($e instanceof \Chaos\Foundation\Exceptions\ValidateException || // status code: 418, 404
            $e instanceof \Chaos\Foundation\Exceptions\ServiceException ||
            $e instanceof \Doctrine\DBAL\Exception\ConstraintViolationException)
        {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 418);
        }
        elseif ($e instanceof \Tymon\JWTAuth\Exceptions\JWTException || // status code: 0, 400, 401, 404, 500
            $e instanceof \League\OAuth2\Client\Provider\Exception\IdentityProviderException)
        {
            return response()->json(['error' => $e->getMessage()], 401);
        }
        elseif ($e instanceof \Illuminate\Contracts\Encryption\DecryptException ||
            $e instanceof \Illuminate\Session\TokenMismatchException)
        {
            return response()->json(['error' => 'csrf_invalid'], 500);
        }
        elseif ($e instanceof \Throwable)
        {
            return response()->json(['error' => (bool)config('app.debug') ? $e->getMessage() :
                'An error occurred, please contact the administrator'], 500);
        }

        return parent::render($request, $e);
    }
}