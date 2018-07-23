<?php

namespace App\Http\Controllers;

use Chaos\Foundation\AbstractLaravelRestController;

/**
 * Class Controller
 * @author ntd1712
 */
abstract class Controller extends AbstractLaravelRestController
{
    /**
     * {@inheritdoc}
     */
    public function __construct()
    {
        $cfg = app('config');
        $config = glob(($basePath = base_path()) . '/modules/*/settings.yml', GLOB_NOSORT);
        array_unshift($config, $basePath . '/modules/settings.yml');

        $config['__options__'] = [
            'cache' => 'production' === $cfg->get('app.env'),
            'cache_path' => $basePath . '/storage/framework', #/vars
            'loaders' => ['yaml'],
            'merge_globals' => false,
            'replacements' => [
                'base_path' => $basePath,
                'base_url' => $cfg->get('app.url')
            ]
        ];

        parent::__construct(glob($basePath . '/modules/*/services.yml', GLOB_NOSORT), $config);
    }
}
