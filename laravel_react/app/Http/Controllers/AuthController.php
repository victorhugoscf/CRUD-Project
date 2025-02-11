<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Método para registrar um novo usuário
   public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ], [
         'email.unique' => 'Este endereço de e-mail já está em uso. Por favor escolha outro.',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Geração do token de acesso
    $token = $user->createToken('Personal Access Token')->plainTextToken;

    return response()->json(['user' => $user, 'token' => $token], 201);
}

    // Método para login de usuário
   
public function login(Request $request)
{
    // Valida os campos email e senha
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    // Procura o usuário pelo email
    $user = User::where('email', $request->email)->first();

    // Verifica a senha e retorna erro se estiver incorreta
    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['As credenciais fornecidas estão incorretas.'],
        ]);
    }

    // Gera o token de acesso e o retorna junto com os dados do usuário
    $token = $user->createToken('Personal Access Token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}

}