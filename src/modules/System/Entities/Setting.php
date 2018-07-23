<?php

namespace System\Entities;

use Chaos\Foundation\AbstractBaseEntity;
use Chaos\Foundation\Traits\AuditEntityAwareTrait;
use Chaos\Foundation\Traits\IdentityEntityAwareTrait;

/**
 * Class Setting
 * @author ntd1712
 *
 * @Doctrine\ORM\Mapping\Entity(repositoryClass="System\Repositories\SettingRepository")
 * @Doctrine\ORM\Mapping\EntityListeners({ "System\Events\SettingListener" })
 * @Doctrine\ORM\Mapping\Table(name="setting")
 */
class Setting extends AbstractBaseEntity
{
    use IdentityEntityAwareTrait, AuditEntityAwareTrait;

    /**
     * [NotEmpty|Alpha]
     *
     * @Doctrine\ORM\Mapping\Column(name="name", type="string")
     */
    protected $Name;
    /**
     * [HtmlEntities]
     *
     * @Doctrine\ORM\Mapping\Column(name="value", type="text", length=65535)
     */
    protected $Value;
    /**
     * [HtmlEntities]
     *
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
    public function getValue()
    {
        return $this->Value;
    }

    /**
     * @param string $Value
     * @return self
     */
    public function setValue($Value)
    {
        $this->Value = $Value;
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
