<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;

// Carregar o .env da raiz do projeto
$dotenv = Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();