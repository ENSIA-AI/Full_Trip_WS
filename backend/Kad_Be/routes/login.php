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

require_once __DIR__ . '/../db.php';

$SESSION_TIMEOUT = 60 * 60 * 24 * 7;
session_set_cookie_params([
  'lifetime' => $SESSION_TIMEOUT,
  'path' => '/',
  'httponly' => true,
  'secure' => false,
  'samesite' => 'None'
]);
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  if (!isset($_SESSION['user_id'], $_SESSION['email'])) {
    http_response_code(401);
    echo json_encode(['logged_in' => false]);
    exit;
  }

  echo json_encode([
    'logged_in' => true,
    'email' => $_SESSION['email'],
    'user_id' => $_SESSION['user_id']
  ]);
  exit;
}


$input_raw = file_get_contents('php://input');
error_log("login.php: Received request from origin=" . ($_SERVER['HTTP_ORIGIN'] ?? '') . " body=" . $input_raw);
$input = json_decode($input_raw);
if (!isset($input->email) || !isset($input->password)) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing credentials']);
  exit;
}

try {
  $db = connectDB();
  $stmt = $db->prepare('SELECT user_id, first_name, last_name, email, country, state, currency, phone_num, password FROM users WHERE email = :email LIMIT 1');
  $stmt->execute([':email' => $input->email]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$user) {
    error_log("login.php: user not found for email=" . $input->email);
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
  }

  $pw_ok = password_verify($input->password, $user['password']);
  error_log("login.php: password_verify for email=" . $input->email . " result=" . ($pw_ok ? 'true' : 'false'));
  if (!$pw_ok) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
  }

  unset($user['password']);

  session_regenerate_id(true);
  $_SESSION['user_id'] = $user['user_id'];
  $_SESSION['email'] = $user['email'];

  echo json_encode($user);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
