<?php

namespace Account\Repositories;

use Chaos\Foundation\AbstractDoctrineRepository;

/**
 * Class PermissionRepository
 * @author ntd1712
 */
class PermissionRepository extends AbstractDoctrineRepository
{
    /**
     * @param   string $value An array of IDs.
     * @return  \Account\Entities\Permission[]
     */
    public function getByIds($value)
    {
        return $this->findBy(['Id' => $value]);
    }
}
