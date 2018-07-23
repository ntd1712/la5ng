<?php

namespace Account\Repositories;

use Chaos\Foundation\AbstractDoctrineRepository;

/**
 * Class RoleRepository
 * @author ntd1712
 */
class RoleRepository extends AbstractDoctrineRepository
{
    /**
     * @param   string $value An array of IDs.
     * @return  \Account\Entities\Role[]
     */
    public function getByIds($value)
    {
        return $this->findBy(['Id' => $value]);
    }
}
