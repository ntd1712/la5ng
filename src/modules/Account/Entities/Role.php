<?php

namespace Account\Entities;

use Chaos\Foundation\AbstractBaseEntity;
use Chaos\Foundation\Traits\AuditEntityAwareTrait;
use Chaos\Foundation\Traits\IdentityEntityAwareTrait;
use Zend\Form\Annotation;

/**
 * Class Role
 * @author ntd1712
 *
 * @Doctrine\ORM\Mapping\Entity(repositoryClass="Account\Repositories\RoleRepository")
 * @Doctrine\ORM\Mapping\EntityListeners({ "Account\Events\RoleListener" })
 * @Doctrine\ORM\Mapping\Table(name="role")
 */
class Role extends AbstractBaseEntity
{
    use IdentityEntityAwareTrait, AuditEntityAwareTrait;

    /**
     * [NotEmpty|HtmlEntities]
     *
     * @Doctrine\ORM\Mapping\Column(name="name", type="string")
     */
    protected $Name;
    /**
     * [HtmlEntities]
     *
     * @Doctrine\ORM\Mapping\Column(name="description", type="string", nullable=true)
     */
    protected $Description;
    /**
     * @ignore
     * @Doctrine\ORM\Mapping\ManyToMany(targetEntity="Permission")
     * @Doctrine\ORM\Mapping\JoinTable(name="role_permission",
     *  joinColumns={@Doctrine\ORM\Mapping\JoinColumn(name="role_id", referencedColumnName="id")},
     *  inverseJoinColumns={@Doctrine\ORM\Mapping\JoinColumn(name="permission_id", referencedColumnName="id")})
     */
    protected $Permissions;
    /**
     * @Annotation\Exclude
     * @Doctrine\ORM\Mapping\OneToMany(targetEntity="UserRole", mappedBy="Role")
     */
    private $Users;

    /**
     * @return string
     */
    public function getName()
    {
        return $this->Name;
    }

    /**
     * @param string $Name
     * @return self
     */
    public function setName($Name)
    {
        $this->Name = $Name;

        return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->Description;
    }

    /**
     * @param string $Description
     * @return self
     */
    public function setDescription($Description)
    {
        $this->Description = $Description;

        return $this;
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getPermissions()
    {
        return $this->Permissions;
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getUsers()
    {
        return $this->Users;
    }
}
