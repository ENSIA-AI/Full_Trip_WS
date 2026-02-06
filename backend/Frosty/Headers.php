<?php
// Only allow production origin
$allowed_origins = [
  'https://full-trip-ws-i6fv.onrender.com'
];
header('Access-Control-Allow-Origin: https://full-trip-ws-i6fv.onrender.com');
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');