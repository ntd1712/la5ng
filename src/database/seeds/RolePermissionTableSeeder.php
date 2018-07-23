<?php

use Illuminate\Database\Seeder;

/**
 * Class RolePermissionTableSeeder
 * @author ntd1712
 */
class RolePermissionTableSeeder extends Seeder
{
    public function run()
    {
        $name = 'role_permission';
        DB::table($name)->truncate();

        DB::table($name)->insert([
            [
                'role_id' => 1,
                'permission_id' => 1
            ],[
                'role_id' => 1,
                'permission_id' => 2
            ],[
                'role_id' => 1,
                'permission_id' => 3
            ],[
                'role_id' => 1,
                'permission_id' => 4
            ],[
                'role_id' => 1,
                'permission_id' => 5
            ],[
                'role_id' => 1,
                'permission_id' => 6
            ],[
                'role_id' => 1,
                'permission_id' => 7
            ],[
                'role_id' => 1,
                'permission_id' => 8
            ],[
                'role_id' => 3,
                'permission_id' => 1
            ],[
                'role_id' => 3,
                'permission_id' => 4
            ],[
                'role_id' => 3,
                'permission_id' => 5
            ],[
                'role_id' => 3,
                'permission_id' => 6
            ],[
                'role_id' => 3,
                'permission_id' => 8
            ]
        ]);
    }
}