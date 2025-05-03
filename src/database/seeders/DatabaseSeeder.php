<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'usuario_1',
            'email' => 'usu_1@gmail.com',
            'password' => Hash::make('usu123usu'),
        ]);

        User::factory()->create([
            'name' => 'usuario_2',
            'email' => 'usu_2@gmail.com',
            'password' => Hash::make('usu456usu'),
        ]);


    }
}
