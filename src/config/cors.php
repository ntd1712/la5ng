<?php

return [
    /*
     |--------------------------------------------------------------------------
     | Laravel CORS
     |--------------------------------------------------------------------------
     |
     | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
     | to accept any value, the allowed methods however have to be explicitly listed.
     */
    'supportsCredentials' => true,
    'allowedOrigins' => ['*'],
    'allowedMethods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'allowedHeaders' => ['*'],
    'exposedHeaders' => [],
    'maxAge' => 0,
    'hosts' => [],
];