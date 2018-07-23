<?php

use Illuminate\Database\Seeder;

/**
 * Class PermissionTableSeeder
 * @author ntd1712
 */
class PermissionTableSeeder extends Seeder
{
    public function data(Faker\Generator $faker)
    {
        return [
            [
                'name' => 'Backend.Account',
                'description' => 'Allows you to manage users, roles and permissions.'
            ],[
                'name' => 'Backend.Account.Permission',
                'description' => 'Allows you to manage permissions.'
            ],[
                'name' => 'Backend.Account.Role',
                'description' => 'Allows you to manage roles.'
            ],[
                'name' => 'Backend.Account.User',
                'description' => 'Allows you to manage users.'
            ],[
                'name' => 'Backend.System',
                'description' => 'Allows you to manage audit trails, lookup values and settings.'
            ],[
                'name' => 'Backend.System.Audit',
                'description' => 'Allows you to manage audit trails.'
            ],[
                'name' => 'Backend.System.Lookup',
                'description' => 'Allows you to manage lookup values.'
            ],[
                'name' => 'Backend.System.Setting',
                'description' => 'Allows you to manage settings.'
            ]
        ];
    }
}