<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="BankWithdrawRequest",
 *     type="object",
 *     required={"amount", "source_account_id"},
 *     @OA\Property(property="amount", type="number", format="float", description="El monto a retirar"),
 *     @OA\Property(property="source_account_id", type="integer", description="El ID de la cuenta a la cual se hará el retiro")
 * )
 */
class BankWithdrawRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'source_account_id' => ['required', 'integer', 'exists:bank_account,id'],
            'amount' => ['required', 'numeric', 'gt:0', 'regex:/^\d+(\.\d{1,2})?$/'],
        ];
    }
}
