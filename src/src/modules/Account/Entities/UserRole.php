<?php

namespace Account\Entities;

use Chaos\Foundation\AbstractBaseEntity;

/**
 * Class UserRole
 * @author ntd1712
 *
 * @Doctrine\ORM\Mapping\Entity(repositoryClass="Account\Repositories\UserRoleRepository")
 * @Doctrine\ORM\Mapping\EntityListeners({ "Account\Events\UserRoleListener" })
 * @Doctrine\ORM\Mapping\Table(name="user_role")
 */
class UserRole extends AbstractBaseEntity
{
    /**
     * @Doctrine\ORM\Mapping\Id
     * @Doctrine\ORM\Mapping\ManyToOne(targetEntity="User", inversedBy="Roles")
     * @Doctrine\ORM\Mapping\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $User;
    /**
     * @Doctrine\ORM\Mapping\Id
     * @Doctrine\ORM\Mapping\ManyToOne(targetEntity="Role", inversedBy="Users", fetch="EAGER")
     * @Doctrine\ORM\Mapping\JoinColumn(name="role_id", referencedColumnName="id")
     */
    protected $Role;
    /**
     * @Doctrine\ORM\Mapping\Column(name="is_primary", type="boolean", nullable=true)
     */
    protected $IsPrimary;

    /**
     * @return \Account\Entities\User
     */
    public function getUser()
    {
        return $this->User;
    }

    /**
     * @param \Account\Entities\User $User
     * @return self
     */
    public function setUser($User)
    {
        $this->User = $User;

        return $this;
    }

    /**
     * @return \Account\Entities\Role
     */
    public function getRole()
    {
        return $this->Role;
    }

    /**
     * @param \Account\Entities\Role $Role
     * @return self
     */
    public function setRole($Role)
    {
        $this->Role = $Role;

        return $this;
    }

    /**
     * @return boolean
     */
    public function getIsPrimary()
    {
        return $this->IsPrimary;
    }

    /**
     * @param boolean $IsPrimary
     * @return self
     */
    public function setIsPrimary($IsPrimary)
    {
        $this->IsPrimary = $IsPrimary;

        return $this;
    }
}
