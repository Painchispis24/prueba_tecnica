<?php

namespace App\Http\Controllers;
use App\Http\Requests\BankTransferRequest;
use App\Http\Requests\BankDepositRequest;
use App\Http\Requests\BankWithdrawRequest;
use App\Models\BankAccount;
use App\Models\Transaction;
use Illuminate\Http\Request;


/**
* @OA\Schema(
*     schema="Transaction",
*     type="object",
*     title="Transacción Bancaria",
*     description="Representación de una transacción bancaria",
*     @OA\Property(property="id", type="integer", example=1),
*     @OA\Property(property="type", type="string", enum={"DEPOSIT", "WITHDRAW", "TRANSFER"}, example="DEPOSIT"),
*     @OA\Property(property="amount", type="number", format="float", example=500.00),
*     @OA\Property(property="source_account_id", type="integer", example=1),
*     @OA\Property(property="target_account_id", type="integer", example=2, nullable=true),
*     @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-03T12:00:00Z"),
*     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-05-03T12:00:00Z")
* )
*/
class TransactionController extends Controller
{
    /**
    * @OA\Post(
    *     path="/api/deposit",
    *     summary="Realiza un depósito en una cuenta bancaria",
    *     tags={"Transacciones"},
    *     security={{"sanctum": {}}},
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(ref="#/components/schemas/BankDepositRequest")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Depósito realizado correctamente",
    *         @OA\JsonContent(ref="#/components/schemas/Transaction")
    *     ),
    *     @OA\Response(
    *         response=402,
    *         description="Fondos insuficientes"
    *     )
    * )
    */
    public function deposit(BankDepositRequest $request){

        $data = $request->validated();

        $transacction = Transaction::create([
            'type' => 'DEPOSIT',
            'amount' => $data['amount'],
            'source_account_id' => $data['source_account_id'],
        ]);

        $source_account = BankAccount::find($data['source_account_id']);

        $total = $source_account->balance + $data['amount'];

        $source_account->update(['balance' => $total]);

        return $transacction;
    }

    /**
    * @OA\Post(
    *     path="/api/withdraw",
    *     summary="Realiza un retiro de una cuenta bancaria",
    *     tags={"Transacciones"},
    *     security={{"sanctum": {}}},
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(ref="#/components/schemas/BankWithdrawRequest")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Retiro realizado correctamente",
    *         @OA\JsonContent(ref="#/components/schemas/Transaction")
    *     ),
    *     @OA\Response(
    *         response=402,
    *         description="Fondos insuficientes"
    *     )
    * )
    */
    public function withdraw(BankWithdrawRequest $request){

        $data = $request->validated();

        $source_account = BankAccount::find($data['source_account_id']);

        abort_unless($source_account->balance >= $data['amount'],402,'Fondos insuficientes');

        $transacction = Transaction::create([
            'type' => 'WITHDRAW',
            'amount' => $data['amount'],
            'source_account_id' => $data['source_account_id'],
        ]);

        $total = $source_account->balance - $data['amount'];

        $source_account->update(['balance' => $total]);

        return $transacction;
    }

    /**
    * @OA\Post(
    *     path="/api/transfer",
    *     summary="Realiza una transferencia entre cuentas bancarias",
    *     tags={"Transacciones"},
    *     security={{"sanctum": {}}},
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(ref="#/components/schemas/BankTransferRequest")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Transferencia realizada correctamente",
    *         @OA\JsonContent(ref="#/components/schemas/Transaction")
    *     ),
    *     @OA\Response(
    *         response=402,
    *         description="Fondos insuficientes"
    *     )
    * )
    */
    public function transfer(BankTransferRequest $request){

        $data = $request->validated();

        $source_account = BankAccount::find($data['source_account_id']);

        abort_unless($source_account->balance >= $data['amount'],402,'Fondos insuficientes');

        $transacction = Transaction::create([
            'type' => 'TRANSFER',
            'amount' => $data['amount'],
            'source_account_id' => $data['source_account_id'],
            'target_account_id' => $data['target_account_id'],
        ]);

        $target_account = BankAccount::find($data['target_account_id']);

        $total_source = $source_account->balance - $data['amount'];
        $total_target = $target_account->balance + $data['amount'];

        $source_account->update(['balance' => $total_source]);
        $target_account->update(['balance' => $total_target]);

        return $transacction;
    }

    /**
    * @OA\Get(
    *     path="/api/transactions/{bankAccount}",
    *     summary="Obtiene las transacciones de una cuenta bancaria",
    *     tags={"Transacciones"},
    *     security={{"sanctum": {}}},
    *     @OA\Parameter(
    *         name="bankAccount",
    *         in="path",
    *         description="ID de la cuenta bancaria",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Lista de transacciones",
    *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Transaction"))
    *     )
    * )
    */
    public function index(BankAccount $bankAccount){
        return Transaction::where('source_account_id',$bankAccount->id)->paginate(10);
    }
}
