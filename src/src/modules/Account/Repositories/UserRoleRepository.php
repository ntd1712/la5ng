<?php

namespace Account\Repositories;

use Chaos\Foundation\AbstractDoctrineRepository;

/**
 * Class UserRoleRepository
 * @author ntd1712
 */
class UserRoleRepository extends AbstractDoctrineRepository
{
    /**
     * @param   integer $value The ID.
     * @return  integer
     */
    public function deleteByUser($value)
    {
        return $this->delete(['where' => ['User' => $value]]);
    }
}
