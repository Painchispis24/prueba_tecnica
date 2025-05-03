<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->string('type', 20);
            $table->decimal('amount', 10, 2);
            $table->unsignedBigInteger('source_account_id');
            $table->unsignedBigInteger('target_account_id')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('source_account_id')->references('id')->on('bank_account');
            $table->foreign('target_account_id')->references('id')->on('bank_account');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
