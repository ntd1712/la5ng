<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', 'AuthController@spa'); // load SPA template

Route::group(['prefix' => 'api'], function() {    // access without authorization; used for login, reset password, etc.
    Route::post('auth/renewtoken', [
        'middleware' => 'jwt.refresh',
        'uses' => 'AuthController@ping'
    ]);
    Route::controllers([
        'auth' => 'AuthController'
    ]);
});

Route::group(['prefix' => 'api'/*, 'middleware' => 'jwt.auth'*/], function() {
    foreach (glob(__DIR__ . '/Controllers/*/*.*') as $v) {
        preg_match('#controllers/([^/]+)/(.*)controller.*#i', $v, $matches);

        if (isset($matches[2])) {
            $name = strtolower($matches[1] . '/' . $matches[2]);
            $controller = $matches[1] . '\\' . $matches[2] . 'Controller';

            // if (!('Account' === $matches[1] || 'System' === $matches[1]))
            // {
            //     Route::get($name . '/getinit', $controller . '@getInit');
            //     Route::post($name . '/sendemail', $controller . '@sendEmail');
            // }

            Route::resource($name, $controller);
        }
    }
});
