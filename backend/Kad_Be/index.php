<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request immediately
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

  case 'flights':
    require_once __DIR__ . '/routes/flights.php';
    break;

  default:
    http_response_code(404);
    echo json_encode(["error" => "Unknown endpoint"]);
}
