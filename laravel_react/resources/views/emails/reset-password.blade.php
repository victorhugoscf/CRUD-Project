<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir Senha</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            width: 100%;
            max-width: 600px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #555;
            line-height: 1.5;
            margin: 10px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 25px;
            background-color: #5b08a7;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #4a0371;
        }
        .footer {
            font-size: 12px;
            color: #aaa;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Redefina sua Senha</h2>
        <p>Olá,</p>
        <p>Você solicitou a redefinição de senha. Clique no link abaixo para definir uma nova senha:</p>
        <a href="{{ $resetLink }}" class="button">Redefinir Senha</a>
        <p>Se você não solicitou esta alteração, ignore este e-mail.</p>
        <p class="footer">Equipe da Aplicação</p>
    </div>
</body>
</html>
