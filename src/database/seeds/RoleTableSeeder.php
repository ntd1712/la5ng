<?php

use Illuminate\Database\Seeder;

/**
 * Class RoleTableSeeder
 * @author ntd1712
 */
class RoleTableSeeder extends Seeder
{
    public function data(Faker\Generator $faker)
    {
        return [
            [
                'name' => 'Administrator',
                'description' => 'Members of the Administrator role have the largest amount of default permissions and the ability to change their own permissions.'
            ],[
                'name' => 'Guest',
                'description' => null
            ],[
                'name' => 'Power User',
                'description' => null
            ],[
                'name' => 'User',
                'description' => null
            ]
        ];
    }
}