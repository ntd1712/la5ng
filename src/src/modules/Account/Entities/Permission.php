<?php

namespace Account\Entities;

use Chaos\Foundation\AbstractBaseEntity;
use Chaos\Foundation\Traits\AuditEntityAwareTrait;
use Chaos\Foundation\Traits\IdentityEntityAwareTrait;
use Zend\Form\Annotation;

/**
 * Class Permission
 * @author ntd1712
 *
 * @Annotation\Hydrator("Zend\Stdlib\Hydrator\Reflection")
 * @Doctrine\ORM\Mapping\Entity(repositoryClass="Account\Repositories\PermissionRepository")
 * @Doctrine\ORM\Mapping\EntityListeners({ "Account\Events\PermissionListener" })
 * @Doctrine\ORM\Mapping\Table(name="permission")
 */
class Permission extends AbstractBaseEntity
{
    use IdentityEntityAwareTrait, AuditEntityAwareTrait;

    /**
     * @Annotation\Required({"required":"true"})
     * @Annotation\Filter({"name":"HtmlEntities"})
     * @Doctrine\ORM\Mapping\Column(name="name", type="string")
     */
    protected $Name;
    /**
     * @Annotation\Filter({"name":"HtmlEntities"})
     * @Doctrine\ORM\Mapping\Column(name="description", type="string", nullable=true)
     */
    protected $Description;

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
}
