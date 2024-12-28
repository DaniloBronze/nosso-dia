<?php
require_once __DIR__ . '/bootstrap.php';

header('Content-Type: application/json');

// Obter a senha secreta do .env
$correctPassword = $_ENV['SECRET_PASSWORD'] ?? null;

// Lendo a senha enviada pelo cliente
$input = json_decode(file_get_contents('php://input'), true);
$inputPassword = $input['password'] ?? '';

if ($inputPassword === $correctPassword) {
    echo json_encode([
        'success' => true,
        'message' => 'Desde aquele dia em que te encontrei na igreja, enquanto eu estava no ônibus e já tinha decidido que queria você na minha vida, até hoje, depois de muitos anos, eu vejo que faria tudo de novo se precisasse. Não me arrependo de nada. Te amo do jeitinho que você é e sempre vou te amar. 💖'
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Senha incorreta.']);
}