<?php

namespace Account\Entities;

use Chaos\Foundation\AbstractBaseEntity;
use Chaos\Foundation\Traits\AuditEntityAwareTrait;
use Chaos\Foundation\Traits\IdentityEntityAwareTrait;

/**
 * Class User
 * @author ntd1712
 *
 * @Doctrine\ORM\Mapping\Entity(repositoryClass="Account\Repositories\UserRepository")
 * @Doctrine\ORM\Mapping\EntityListeners({ "Account\Events\UserListener" })
 * @Doctrine\ORM\Mapping\Table(name="user")
 */
class User extends AbstractBaseEntity
{
    use IdentityEntityAwareTrait, AuditEntityAwareTrait;

    /**
     * [NotEmpty]
     *
     * @Doctrine\ORM\Mapping\Column(name="name", type="string")
     */
    protected $Name;
    /**
     * [EmailAddress]
     *
     * @Doctrine\ORM\Mapping\Column(name="email", type="string", nullable=true)
     */
    protected $Email;
    /**
     * @Doctrine\ORM\Mapping\Column(name="password", type="string", nullable=true)
     */
    private $Password;
    /**
     * @Doctrine\ORM\Mapping\Column(name="password_expiry_date", type="datetime", nullable=true)
     */
    private $PasswordExpiryDate;
    /**
     * @Doctrine\ORM\Mapping\Column(name="remember_token", type="string", length=100, nullable=true)
     */
    private $RememberToken;
    /**
     * @Doctrine\ORM\Mapping\Column(name="open_id", type="string", length=64, nullable=true)
     */
    private $OpenId;
    /**
     * [HtmlEntities]
     *
     * @Doctrine\ORM\Mapping\Column(name="locale", type="string", length=20, nullable=true)
     */
    protected $Locale = 'en';
    /**
     * [HtmlEntities]
     *
     * @Doctrine\ORM\Mapping\Column(name="timezone", type="string", nullable=true)
     */
    protected $Timezone = 'UTC';
    /**
     * @Doctrine\ORM\Mapping\Column(name="profile", type="json_array", length=65535, nullable=true)
     */
    protected $Profile;
    /**
     * @ignore
     * @Doctrine\ORM\Mapping\OneToMany(targetEntity="UserRole", mappedBy="User", cascade={"all"})
     */
    protected $Roles;

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
    public function getEmail()
    {
        return $this->Email;
    }

    /**
     * @param string $Email
     * @return self
     */
    public function setEmail($Email)
    {
        $this->Email = $Email;

        return $this;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->Password;
    }

    /**
     * @param string $Password
     * @return self
     */
    public function setPassword($Password)
    {
        $this->Password = $Password;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getPasswordExpiryDate()
    {
        return $this->PasswordExpiryDate;
    }

    /**
     * @param \DateTime $PasswordExpiryDate
     * @return self
     */
    public function setPasswordExpiryDate($PasswordExpiryDate)
    {
        $this->PasswordExpiryDate = $PasswordExpiryDate;

        return $this;
    }

    /**
     * @return string
     */
    public function getRememberToken()
    {
        return $this->RememberToken;
    }

    /**
     * @param string $RememberToken
     * @return self
     */
    public function setRememberToken($RememberToken)
    {
        $this->RememberToken = $RememberToken;

        return $this;
    }

    /**
     * @return string
     */
    public function getOpenId()
    {
        return $this->OpenId;
    }

    /**
     * @param string $OpenId
     * @return self
     */
    public function setOpenId($OpenId)
    {
        $this->OpenId = $OpenId;

        return $this;
    }

    /**
     * @return string
     */
    public function getLocale()
    {
        return $this->Locale;
    }

    /**
     * @param string $Locale
     * @return self
     */
    public function setLocale($Locale)
    {
        $this->Locale = $Locale;

        return $this;
    }

    /**
     * @return string
     */
    public function getTimezone()
    {
        return $this->Timezone;
    }

    /**
     * @param string $Timezone
     * @return self
     */
    public function setTimezone($Timezone)
    {
        $this->Timezone = $Timezone;

        return $this;
    }

    /**
     * @return string
     */
    public function getProfile()
    {
        return $this->Profile;
    }

    /**
     * @param string $Profile
     * @return self
     */
    public function setProfile($Profile)
    {
        $this->Profile = $Profile;

        return $this;
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getRoles()
    {
        return $this->Roles;
    }
}
