<?php

use Illuminate\Database\Seeder;

/**
 * Class UserRoleTableSeeder
 * @author ntd1712
 */
class UserRoleTableSeeder extends Seeder
{
    public function run()
    {
        $name = 'user_role';
        DB::table($name)->truncate();

        DB::table($name)->insert([
            [
                'user_id' => 1,
                'role_id' => 1,
                'is_primary' => true
            ],[
                'user_id' => 2,
                'role_id' => 3,
                'is_primary' => true
            ]
        ]);
    }
}