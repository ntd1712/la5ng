<?php

/** @var Illuminate\Contracts\Http\Kernel $kernel */
require __DIR__.'/bootstrap/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

// Doctrine
$config = glob(__DIR__ . '/modules/*/settings.yml', GLOB_NOSORT);
array_unshift($config, __DIR__ . '/modules/settings.yml');

$config['__options__'] = [
    'cache' => false,
    'cache_path' => __DIR__ . '/storage/framework',
    'loaders' => ['php', 'yaml'],
    'replacements' => [
        'base_path' => __DIR__,
        'base_url' => ''
    ]
];

try {
    return Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet(
        (new Chaos\Bridge\Doctrine\EntityManagerFactory)->__invoke(null, null, $config)
    );
} catch (Exception $ex) {
    //
}
