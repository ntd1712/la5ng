<?php

namespace System\Services;

use Chaos\Foundation\AbstractBaseService;
use Chaos\Foundation\Events\UpdateEventArgs;

/**
 * Class SettingService
 * @author ntd1712
 */
class SettingService extends AbstractBaseService
{
    /**
     * TODO
     *
     * {@inheritdoc}
     */
    protected function onAfterSave(UpdateEventArgs $eventArgs, $isDeleted = false)
    {
        // write data to cached file(s)
        // if (file_exists($target = $this->__getConfig()->get('paths.config')))
        // {
        //     $response = $this->readAll();
        //     $config = require $target;
        //
        //     foreach ($response['data'] as $v)
        //     {
        //         $config['app'][$v->Name] = $v->Value;
        //     }
        //
        //     if ($isDeleted)
        //     {
        //         unset($config['app'][$eventArgs->getEntity()->Name]);
        //     }
        //     else
        //     {
        //         $config['app'][$eventArgs->getEntity()->Name] = $eventArgs->getEntity()->Value;
        //     }
        //
        //     // params.php
        //     $source = sys_get_temp_dir() . '/' . md5(microtime(true));
        //     $data = '<?php return ' . var_export($config, true) . ';';
        //
        //     if (false !== file_put_contents($source, $data))
        //     {
        //         @copy($source, $target);
        //         @chmod($target, 0777 & ~umask());
        //         @unlink($source);
        //     }
        // }
    }

    /**
     * {@inheritdoc}
     */
    protected function onAfterDelete(UpdateEventArgs $eventArgs)
    {
        return $this->onAfterSave($eventArgs, true);
    }
}
