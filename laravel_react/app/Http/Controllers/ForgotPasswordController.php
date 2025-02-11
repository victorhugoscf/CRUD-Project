<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use App\Models\User;

class ForgotPasswordController extends Controller
{
    /**
     * Envia o e-mail de redefinição de senha.
     *
     * @param  \Illuminate\Http\Request  
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Gera o token manualmente
        $token = Password::broker()->createToken(\App\Models\User::where('email', $request->email)->first());

        // Envia o e-mail usando o Mailable personalizado
        Mail::to($request->email)->send(new ResetPasswordMail($token, $request->email));

        return response()->json(['message' => 'E-mail de redefinição de senha enviado com sucesso!'], 200);
    }
}
