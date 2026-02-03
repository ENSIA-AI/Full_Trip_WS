<?php

$allowed_origins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
} else {
  if ($origin) {
    header('Access-Control-Allow-Origin: ' . $origin);
  }
}

header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit(0);
}

require_once __DIR__ . '/db.php';

$endpoint = $_GET['endpoint'] ?? null;

switch ($endpoint) {
  case 'users':
    require_once __DIR__ . '/routes/user.php';
    break;

  case 'feedback':
    require_once __DIR__ . '/routes/feedback.php';
    break;

  case 'cities':
    require_once __DIR__ . '/routes/cities.php';
    break;

  default:
    http_response_code(404);
    echo json_encode(["error" => "Unknown endpoint"]);
}
