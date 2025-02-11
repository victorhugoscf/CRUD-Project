<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    /**
     * Redefine a senha do usuário.
     *
     * @param  \Illuminate\Http\Request 
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
{
    // Valida os dados
    $validatedData = $request->validate([
        'token' => 'required',
        'email' => 'required|email|exists:users,email',
        'password' => 'required|confirmed|min:8',
    ], [
        'token.required' => 'O token é obrigatório.',
        'email.required' => 'O e-mail é obrigatório.',
        'email.email' => 'Formato de e-mail inválido.',
        'email.exists' => 'E-mail não encontrado no banco de dados.',
        'password.required' => 'A senha é obrigatória.',
        'password.confirmed' => 'As senhas não coincidem.',
        'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
    ]);

    //Mostra os dados recebidos
    \Log::info('Resetando senha para:', $validatedData);

    //redefine a senha
    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();
        }
    );

    // Captura o status exato do erro
    if ($status === Password::PASSWORD_RESET) {
        return response()->json(['message' => 'Senha redefinida com sucesso!'], 200);
    } else {
        return response()->json(['error' => __($status), 'status' => $status], 422);
    }
}


    /**
     * Enviar resposta de link de redefinição de senha.
     *
     * @param \Illuminate\Http\Request 
     * @param string $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkResponse(Request $request, $response)
{
    // Obtém o e-mail do usuário
    $email = $request->only('email');

    // Gera o token para redefinição de senha
    $token = Password::getRepository()->create(app('auth')->user());

    // Gera a URL do frontend para redefinição de senha
    //$resetUrl = env('FRONTEND_URL') . "/reset-password/{$token}?email=" . urlencode($email['email']);

    // Aqui você pode personalizar o envio do e-mail
    Mail::to($email['email'])->send(new ResetPasswordMail($resetUrl));

    return response()->json(['message' => 'E-mail de redefinição enviado!'], 200);
}
    /**
     * Enviar resposta de falha ao enviar link de redefinição de senha.
     *
     * @param \Illuminate\Http\Request 
     * @param string $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response()->json(['error' => trans($response)], 400);
    }
}
