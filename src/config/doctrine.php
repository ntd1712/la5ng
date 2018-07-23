<?php return [
    /*
     * Metadata Driver Configuration
     */
    'metadata' => [
        'driver' => 'annotation',
        'paths' => glob(__DIR__ . '/../modules/*/Entities'),
        'simple' => false
    ],
    /*
    'mappings' => [
        'App\MyModel' => [
            'table' => 'my_model',
            'abstract' => false,
            'repository' => 'App\Repository\MyModel',
            'fields' => [
                'id' => [
                    'type' => 'integer',
                    'strategy' => 'identity'
                ],
                'name' => [
                    'type' => 'string',
                    'nullable' => false,
                ]
            ],
            'indexes' => [
                'name'
            ],
        ],
    ],
    */
    /*
     * By default, this package mimics the database configuration from Laravel.
     *
     * You can override it in whole or in part here. The 'database' and 'username'
     * laravel settings will be automatically converted to the proper doctrine 'dbname'
     * and 'user' settings. Other custom laravel to doctrine mappings can be added on
     * a per configuration basis by including a 'mappings' entry with 'laravel'=>'doctrine'
     * mappings (see the sqlite configuration for an example).
     *
     * This array passes right through to the EntityManager factory.
     * For example, here you can set additional connection details like "charset".
     *
     * http://doctrine-dbal.readthedocs.org/en/latest/reference/configuration.html#connection-details
     */
    'connection' => [
        'prefix' => env('DB_TABLE_PREFIX', '')
    ],
    'connections' => [
        // Override your laravel environment database selection here if desired
        'default' => env('DB_CONNECTION', 'mysql'),
        // Override your laravel values here if desired.
        'mysql' => [
            'driver' => 'pdo_mysql',
            'host' => env('DB_HOST', 'localhost'),
            'dbname' => env('DB_DATABASE', 'forge'),
            'user' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'prefix' => env('DB_TABLE_PREFIX', ''),
            'charset' => 'utf8',
            'driverOptions' => array(
                PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
            )
        ],
        'oci8' => [
            'driver' => 'oci8',
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1521'),
            'dbname' => env('DB_DATABASE', 'forge'),
            'user' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8'
        ],
        // Some preset configurations to map laravel sqlite configs to doctrine
        'sqlite' => [
            'driver' => 'pdo_sqlite',
            'mappings' => [
                'database' => 'path'
            ]
        ]
    ],
    /*
     * By default, this package mimics the cache configuration from Laravel.
     *
     * You can create your own cache provider by extending the
     * Atrauzzi\LaravelDoctrine\CacheProvider\CacheProvider class.
     * Each provider requires a like named section with an array of configuration options
     */
    'cache' => [
        // Remove or set to null for no cache
        'provider' => env('CACHE_DRIVER', 'file'),
        'file' => [
            'directory' => storage_path('framework/cache'),
            'extension' => '.doctrinecache.data'
        ],
        'redis' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'port' => env('REDIS_PORT', 6379),
            'database' => 1
        ],
        'memcached' => [
            'host' => env('MEMCACHED_HOST', '127.0.0.1'),
            'port' => env('MEMCACHED_PORT', 11211)
        ],
        'providers' => [
            'memcache' => 'Atrauzzi\LaravelDoctrine\CacheProvider\MemcacheProvider',
            'memcached' => 'Atrauzzi\LaravelDoctrine\CacheProvider\MemcachedProvider',
            'couchbase' => 'Atrauzzi\LaravelDoctrine\CacheProvider\CouchbaseProvider',
            'redis' => 'Atrauzzi\LaravelDoctrine\CacheProvider\RedisProvider',
            'apc' => 'Atrauzzi\LaravelDoctrine\CacheProvider\ApcCacheProvider',
            'xcache' => 'Atrauzzi\LaravelDoctrine\CacheProvider\XcacheProvider',
            'array' => 'Atrauzzi\LaravelDoctrine\CacheProvider\ArrayCacheProvider',
            'file' => 'Atrauzzi\LaravelDoctrine\CacheProvider\FilesystemCacheProvider'
            // 'custom' => 'Path\To\Your\Class'
        ]
    ],
    /*
     * Set the directory where Doctrine generates any proxy classes, including with which namespace.
     * http://doctrine-orm.readthedocs.org/en/latest/reference/advanced-configuration.html
     */
    'proxy_classes' => [
        'auto_generate' => 'local' === env('APP_ENV', 'production') ? 2 : 0,
        'directory' => storage_path('framework/proxies'),
        'namespace' => null,
    ],
    'migrations' => [
        'directory' => database_path('doctrine-migrations'),
        'namespace' => 'DoctrineMigrations',
        'table_name' => 'doctrine_migration_versions'
    ],
    /*
     * Use to specify the default repository.
     * http://doctrine-orm.readthedocs.org/en/latest/reference/working-with-objects.html#custom-repositories
     */
    'default_repository' => 'Doctrine\ORM\EntityRepository',
    /*
     * Use to specify the SQL Logger.
     * To use with \Doctrine\DBAL\Logging\EchoSQLLogger, do:
     *   'sqlLogger' => new \Doctrine\DBAL\Logging\EchoSQLLogger();
     *
     * http://doctrine-orm.readthedocs.org/en/latest/reference/advanced-configuration.html#sql-logger-optional
     */
    'sql_logger' => env('APP_DEBUG', false) ? new \Doctrine\DBAL\Logging\DebugStack : null,
    /*
     * In some circumstances, you may wish to diverge from what's configured in Laravel
     */
    'debug' => env('APP_DEBUG', false),
    /*
     * Add custom Doctrine types here.
     * For more information: http://doctrine-dbal.readthedocs.org/en/latest/reference/types.html#custom-mapping-types
     */
    'custom_types' => [
        //'json' => 'Atrauzzi\LaravelDoctrine\Type\Json'
    ],
    /*'custom_datetime_functions' => [
        'DATEADD' => 'DoctrineExtensions\Query\Mysql\DateAdd',
        'DATEDIFF' => 'DoctrineExtensions\Query\Mysql\DateDiff',
        'DATESUB' => 'DoctrineExtensions\Query\Mysql\DateSub',
        'FROM_UNIXTIME' => 'DoctrineExtensions\Query\Mysql\FromUnixtime'
    ],
    'custom_numeric_functions' => [
        'ACOS' => 'DoctrineExtensions\Query\Mysql\Acos',
        'ASIN' => 'DoctrineExtensions\Query\Mysql\Asin',
        'ATAN' => 'DoctrineExtensions\Query\Mysql\Atan',
        'ATAN2' => 'DoctrineExtensions\Query\Mysql\Atan2',
        'COS' => 'DoctrineExtensions\Query\Mysql\Cos',
        'COT' => 'DoctrineExtensions\Query\Mysql\Cot',
        'DEGREES' => 'DoctrineExtensions\Query\Mysql\Degrees',
        'RADIANS' => 'DoctrineExtensions\Query\Mysql\Radians',
        'SIN' => 'DoctrineExtensions\Query\Mysql\Sin',
        'TAN' => 'DoctrineExtensions\Query\Mysql\Tan'
    ],
    'custom_string_functions' => [
        'CHAR_LENGTH' => 'DoctrineExtensions\Query\Mysql\CharLength',
        'CONCAT_WS' => 'DoctrineExtensions\Query\Mysql\ConcatWs',
        'FIELD' => 'DoctrineExtensions\Query\Mysql\Field',
        'FIND_IN_SET' => 'DoctrineExtensions\Query\Mysql\FindInSet',
        'REPLACE' => 'DoctrineExtensions\Query\Mysql\Replace',
        'SOUNDEX' => 'DoctrineExtensions\Query\Mysql\Soundex',
        'STR_TO_DATE' => 'DoctrineExtensions\Query\Mysql\StrToDate',
        'SUBSTRING_INDEX' => 'DoctrineExtensions\Query\Mysql\SubstringIndex'
    ],*/
    'auth' => [
        //'authenticator' => 'Atrauzzi\LaravelDoctrine\DoctrineAuthenticator',
        //'model' => 'App\User',
    ]
];