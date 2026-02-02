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
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit(0);
}

// Destroy session
$SESSION_TIMEOUT = 60 * 60 * 24 * 7;
session_set_cookie_params([
  'lifetime' => $SESSION_TIMEOUT,
  'path' => '/',
  'httponly' => true,
  'secure' => false,
  'samesite' => 'None'
]);
session_start();

// Unset and destroy session on server
session_unset();
session_destroy();

// Expire the session cookie using the same options used during creation
// Use PHP 7.3+ style setcookie with options array to include SameSite
setcookie(session_name(), '', [
  'expires' => time() - 3600,
  'path' => '/',
  'domain' => $_SERVER['HTTP_HOST'] ?? '',
  'secure' => false,
  'httponly' => true,
  'samesite' => 'None'
]);

// Also try clearing common domain variants (localhost with and without port)
setcookie(session_name(), '', time() - 3600, '/', 'localhost');
setcookie(session_name(), '', time() - 3600, '/');

echo json_encode(['success' => true]);
