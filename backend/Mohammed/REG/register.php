<?php
// backend/Mohammed/REG/register.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../db.php';

$data = json_decode(file_get_contents("php://input"));

// Basic validation
if (!isset($data->email) || !isset($data->password) || !isset($data->first_name)) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit();
}

try {
    $db = connectDB();
    
    // 1. Hash the password for security
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

    // 2. Insert the new user
    $stmt = $db->prepare("
        INSERT INTO users 
        (first_name, last_name, email, country, state, currency, phone_num, password, user_type) 
        VALUES 
        (:first_name, :last_name, :email, :country, :state, :currency, :phone_num, :password, 'user')
    ");

    $success = $stmt->execute([
        ':first_name' => $data->first_name,
        ':last_name' => $data->last_name,
        ':email' => $data->email,
        ':country' => $data->country,
        ':state' => $data->state,
        ':currency' => $data->currency,
        ':phone_num' => $data->phone_num,
        ':password' => $hashedPassword
    ]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Account created successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => "Registration failed"]);
    }

} catch (PDOException $e) {
    // Check if error is "Duplicate Entry" (Email already exists)
    if ($e->getCode() == 23505 || strpos($e->getMessage(), 'Duplicate entry') !== false) {
        echo json_encode(["success" => false, "error" => "Email already exists"]);
    } else {
        echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
    }
}
?>