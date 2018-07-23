<?php

use Illuminate\Database\Seeder;

/**
 * Class SettingTableSeeder
 * @author ntd1712
 */
class SettingTableSeeder extends Seeder
{
    public function data(Faker\Generator $faker)
    {
        return [
            [
                'name' => 'copyright',
                'value' => 'Copyright (c) 2017 ntd1712'
            ],[
                'name' => 'title',
                'value' => 'Admin Panel'
            ],[
                'name' => 'locale',
                'value' => 'en'
            ],[
                'name' => 'dateFormat',
                'value' => 'Y-m-d'
            ],[
                'name' => 'imageAllowedExt',
                'value' => 'gif,jpeg,jpg,png'
            ],[
                'name' => 'imageMaxSize',
                'value' => 2097152
            ]
        ];
    }
}