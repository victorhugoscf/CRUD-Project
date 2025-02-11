<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;
    public $email;

   
    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

   
    public function build()
    {
        // Link para a página de redefinição de senha no frontend React
        $resetLink = env('FRONTEND_URL') . "/reset-password?token={$this->token}&email={$this->email}";

        return $this->subject('Redefinição de Senha')
            ->view('emails.reset-password') 
            ->with([
                'resetLink' => $resetLink,
            ]);
    }
}
