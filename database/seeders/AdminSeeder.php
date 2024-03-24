<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Kamranullah Hakimi',
            'email' => 'hakimi@gmail.com',
            'profession' => 'Manager',
            'bio' => 'By setting up the scheduled task and the ClearExpiredTokens command, Laravel will automatically delete expired tokens from the personal_access_tokens table every minute. You can adjust the frequency of the task execution based on your requirements.',
            'password' => '$2y$10$cSXI.xBMGHKP0XRFgZ7AruYF.384.VcMIySldhHFE1vp4pAuU98JW' //1234
        ])->assignRole('Admin');
    }
}