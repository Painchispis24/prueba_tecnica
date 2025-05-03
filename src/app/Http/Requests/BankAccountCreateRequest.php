<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="BankAccountCreateRequest",
 *     type="object",
 *     required={"holder_name", "document_number", "account_type"},
 *     @OA\Property(property="holder_name", type="string", description="Nombre del propietario", example="Juan Pérez"),
 *     @OA\Property(property="document_number", type="string", description="Número de cuenta", example="12345678"),
 *     @OA\Property(property="account_type", type="string", description="Tipo de cuenta", example="credit")
 * )
 */
class BankAccountCreateRequest extends FormRequest
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
            'holder_name' => 'required|string|max:20',
            'document_number' => 'required|string|max:20',
            'account_type' => 'required|string|max:20'
        ];
    }
}
