<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


/**
 * @OA\OpenApi(
 *     @OA\Info(
 *         title="API de Banco",
 *         version="1.0",
 *         description="Crear cuentas bancarias y realizar depósitos, transferencias y retiros"
 *     ),
 *     @OA\Server(url="http://127.0.0.1:8000"),
 *     @OA\Components(
 *         @OA\SecurityScheme(
 *             securityScheme="sanctum",
 *             type="http",
 *             scheme="bearer"
 *         )
 *     )
 * )
 */

class LoginController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Inicia sesión y obtiene un token",
     *     tags={"Autenticación"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", example="usuario@correo.com"),
     *             @OA\Property(property="password", type="string", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inicio de sesión exitoso",
     *         @OA\JsonContent(
     *             @OA\Property(property="token", type="string", example="1|eyJ0eXAiOiJKV1QiLC...")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciales incorrectas",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Invalid credentials")
     *         )
     *     )
     * )
     */
    public function login(){
        $user = User::where('email',request('email'))->first();
        if ($user && Hash::check(request('password'), $user->password)) {
            $token = $user->createToken('login');
            return [
                'token' => $token->plainTextToken,
            ];
        }
        return response()->json([
            'message' => "Invalid credentials",
        ], 401);
    }
}
