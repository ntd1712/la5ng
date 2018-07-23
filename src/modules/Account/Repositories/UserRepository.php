<?php

namespace Account\Repositories;

use Chaos\Foundation\AbstractDoctrineRepository;

/**
 * Class UserRepository
 * @author ntd1712
 */
class UserRepository extends AbstractDoctrineRepository
{
    /**
     * @param   string $value
     * @return  null|object|\Account\Entities\User
     */
    public function getByEmail($value)
    {
        return $this->findOneBy(['Email' => $value]);
    }

    /**
     * @param   string $value
     * @return  null|object|\Account\Entities\User
     */
    public function getByName($value)
    {
        return $this->findOneBy(['Name' => $value]);
    }
}
