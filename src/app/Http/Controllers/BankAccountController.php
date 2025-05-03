<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use Illuminate\Http\Request;
use App\Http\Requests\BankAccountCreateRequest;

/**
* @OA\Schema(
*     schema="BankAccount",
*     type="object",
*     title="Cuenta Bancaria",
*     @OA\Property(property="id", type="integer", example=1),
*     @OA\Property(property="holder_name", type="string", example="Juan Pérez"),
*     @OA\Property(property="document_number", type="string", example="12345678"),
*     @OA\Property(property="account_type", type="string", example="credit"),
*     @OA\Property(property="balance", type="number", format="float", example=1000.00),
*     @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-03T12:00:00Z")
* )
*/
class BankAccountController extends Controller
{

    /**
    * @OA\Get(
    *     path="/api/accounts",
    *     summary="Lista de cuentas bancarias paginadas",
    *     tags={"Cuentas Bancarias"},
    *     security={{"sanctum": {}}},
    *     @OA\Response(
    *         response=200,
    *         description="Listado de cuentas bancarias",
    *         @OA\JsonContent(
    *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/BankAccount"))
    *         )
    *     )
    * )
    */
    public function index(){
        $bankAccounts = BankAccount::paginate(10);
        return $bankAccounts;
    }

    /**
    * @OA\Post(
    *     path="/api/accounts",
    *     summary="Crear una nueva cuenta bancaria",
    *     tags={"Cuentas Bancarias"},
    *     security={{"sanctum": {}}},
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(ref="#/components/schemas/BankAccountCreateRequest")
    *     ),
    *     @OA\Response(
    *         response=201,
    *         description="Cuenta creada exitosamente",
    *         @OA\JsonContent(ref="#/components/schemas/BankAccount")
    *     )
    * )
    */
    public function create(BankAccountCreateRequest $request){
        $data = $request->validated();

        $bankAccount = BankAccount::create([
            'holder_name' => $data['holder_name'],
            'document_number' => $data['document_number'],
            'account_type' => $data['account_type'],
            'balance' => 0,
            'created_at' => now()
        ]);

        return $bankAccount;
    }

    /**
    * @OA\Get(
    *     path="/api/accounts/{id}",
    *     summary="Obtener información de una cuenta específica",
    *     tags={"Cuentas Bancarias"},
    *     security={{"sanctum": {}}},
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         description="ID de la cuenta bancaria",
    *         @OA\Schema(type="integer", example=1)
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Detalles de la cuenta bancaria",
    *         @OA\JsonContent(ref="#/components/schemas/BankAccount")
    *     ),
    *     @OA\Response(
    *         response=404,
    *         description="Cuenta no encontrada"
    *     )
    * )
    */
    public function search(BankAccount $bankAccount) {
        return $bankAccount;
    }

    /**
    * @OA\Get(
    *     path="/api/accounts/{id}/balance",
    *     summary="Consultar el saldo de una cuenta",
    *     tags={"Cuentas Bancarias"},
    *     security={{"sanctum": {}}},
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         description="ID de la cuenta bancaria",
    *         @OA\Schema(type="integer", example=1)
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Saldo actual de la cuenta",
    *         @OA\JsonContent(
    *             @OA\Property(property="balance", type="number", format="float", example=1500.75)
    *         )
    *     ),
    *     @OA\Response(
    *         response=404,
    *         description="Cuenta no encontrada"
    *     )
    * )
    */
    public function balance(BankAccount $bankAccount) {
        return $bankAccount->balance;
    }
}
