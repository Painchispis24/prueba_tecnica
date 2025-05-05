<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\BankAccount;
use App\Models\Transaction;
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

        $acc1 = BankAccount::create([
            'holder_name' => 'Miguel',
            'document_number' => '132456',
            'account_type' => 'CREDIT',
            'balance' => 600,
            'created_at' =>  now(),
        ]);

        $acc2 = BankAccount::create([
            'holder_name' => 'Jose',
            'document_number' => '987654',
            'account_type' => 'DEBIT',
            'balance' => 50,
            'created_at' =>  now(),
        ]);

        $acc3 = BankAccount::create([
            'holder_name' => 'Mariano',
            'document_number' => '654723',
            'account_type' => 'DEBIT',
            'balance' => 89456,
            'created_at' =>  now()
        ]);

        $acc4 = BankAccount::create([
            'holder_name' => 'Franco',
            'document_number' => '32789',
            'account_type' => 'CREDIT',
            'balance' => 9900,
            'created_at' =>  now()
        ]);

        Transaction::create([
            'type' => 'DEPOSIT',
            'amount' => 100,
            'source_account_id' => $acc1->id,
            'created_at' => now()
        ]);

        Transaction::create([
            'type' => 'WITHDRAW',
            'amount' => 32,
            'source_account_id' => $acc3->id,
            'created_at' => now()
        ]);

        Transaction::create([
            'type' => 'WITHDRAW',
            'amount' => 56,
            'source_account_id' => $acc2->id,
            'created_at' => now()
        ]);

        Transaction::create([
            'type' => 'TRANSFER',
            'amount' => 15,
            'source_account_id' => $acc1->id,
            'target_account_id' => $acc2->id,
            'created_at' => now()
        ]);

        Transaction::create([
            'type' => 'WITHDRAW',
            'amount' => 66,
            'source_account_id' => $acc1->id,
            'created_at' => now()
        ]);

        Transaction::create([
            'type' => 'TRANSFER',
            'amount' => 79,
            'source_account_id' => $acc3->id,
            'target_account_id' => $acc4->id,
            'created_at' => now()
        ]);
    }
}
