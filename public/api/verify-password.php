<?php
require_once __DIR__ . '/bootstrap.php';

header('Content-Type: application/json');

// Permitir apenas requisições POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Código 405: Método não permitido
    echo json_encode(['success' => false, 'error' => 'Método não permitido. Use POST.']);
    exit;
}

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
    http_response_code(401); // Código 401: Não autorizado
    echo json_encode(['success' => false, 'error' => 'Senha incorreta.']);
}