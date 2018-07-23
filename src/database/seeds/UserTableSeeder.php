<?php

use Illuminate\Database\Seeder;

/**
 * Class UserTableSeeder
 * @author ntd1712
 */
class UserTableSeeder extends Seeder
{
    public function data(Faker\Generator $faker)
    {
        return [
            [
                'name' => 'sysadmin',
                'email' => 'sysadmin@example.com',
                'password' => bcrypt('@sysadmin*'),
                'remember_token' => str_random(10),
                'profile' => json_encode([
                    'DisplayName' => $faker->name,
                    'Photo' => '/uploads/no_photo.jpg',
                    'About' => $faker->text
                ])
            ],[
                'name' => 'demo',
                'email' => 'demo@example.com',
                'password' => bcrypt('@demo*'),
                'remember_token' => str_random(10),
                'profile' => json_encode([
                    'DisplayName' => $faker->name,
                    'Photo' => '/uploads/no_photo.jpg',
                    'About' => $faker->text
                ])
            ]
        ];
    }
}