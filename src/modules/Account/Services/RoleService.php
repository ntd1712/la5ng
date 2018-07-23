<?php

namespace Account\Services;

use Chaos\Foundation\AbstractBaseService;
use Chaos\Foundation\Events\UpdateEventArgs;

/**
 * Class RoleService
 * @author ntd1712
 */
class RoleService extends AbstractBaseService
{
    /**
     * {@inheritdoc}
     */
    protected function onBeforeSave(UpdateEventArgs $eventArgs)
    {
        $payload = $eventArgs->getPayload();

        if (!empty($eventArgs->getEntity()->Permissions)) {
            $eventArgs->getEntity()->Permissions->clear();
        }

        if (!empty($payload['Permissions']) && is_array($payload['Permissions'])) {
            foreach ($payload['Permissions'] as $k => $v) {
                if (empty($v['Id']) || !is_numeric($v['Id']) || 1 > $v['Id']) {
                    unset($payload['Permissions'][$k]);
                }
            }

            $permissions = $this->getRepository('Permission')
                ->getByIds(array_column($payload['Permissions'], 'Id'));

            foreach ($permissions as $v) {
                $eventArgs->getEntity()->Permissions->add($v);
            }
        }
    }
}
