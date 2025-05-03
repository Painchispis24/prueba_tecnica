<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $table = 'bank_account';

    protected $primaryKey = 'id';

    protected $fillable = [
        'holder_name',
        'document_number',
        'account_type',
        'balance',
        'created_at'
    ];

    public $timestamps=false;
}
