<?php

use App\Http\Controllers\BankAccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TransactionController;


/**
* @OA\Info(
*   title="Api de Banco",
*   version="1.0",
*   description="Todas las transacciones posibles"
* )
*
* @OA\Server(url="http://127.0.0.1:8000/")
*/

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('login',[LoginController::class,'login']);

Route::middleware('auth:sanctum')->group(function (){
    /* Cuentas */
    Route::get('accounts',[BankAccountController::class,'index']);
    Route::get('accounts/{bankAccount}',[BankAccountController::class,'search']);
    Route::post('accounts',[BankAccountController::class,'create']);
    Route::get('accounts/{bankAccount}/balance',[BankAccountController::class,'balance']);

    /* Transacciones */
    Route::post('transactions/deposit',[TransactionController::class,'deposit']);
    Route::post('transactions/withdraw',[TransactionController::class,'withdraw']);
    Route::post('transactions/transfer',[TransactionController::class,'transfer']);
    Route::get('transactions/{bankAccount}',[TransactionController::class,'index']);

});
