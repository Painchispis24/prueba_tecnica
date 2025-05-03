<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transaction';

    protected $primaryKey = 'id';

    protected $fillable = [
        'type',
        'amount',
        'source_account_id',
        'target_account_id',
        'created_at'
    ];

    /* Relación con la cuenta de origen. */
    public function sourceAccount()
    {
        return $this->belongsTo(BankAccount::class, 'source_account_id', 'id');
    }

    /* Relación con la cuenta de destino. */
    public function targetAccount()
    {
        return $this->belongsTo(BankAccount::class, 'target_account_id', 'id');
    }

    public $timestamps=false;
}
