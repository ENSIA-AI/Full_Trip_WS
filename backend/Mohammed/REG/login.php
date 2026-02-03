<?php
// backend/Mohammed/REG/login.php

// 1. Allow React to access this file (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// 2. Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. Connect to Database (Adjusting path to go back two folders)
require_once  'db.php';

// 4. Get the JSON data from React
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "error" => "Email and Password are required"]);
    exit();
}

try {
    $db = connectDB();
    
    // 5. Select user by Email
    $stmt = $db->prepare("SELECT user_id, first_name, password, user_type FROM users WHERE email = :email");
    $stmt->execute([':email' => $data->email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 6. Verify the Password
    if ($user && password_verify($data->password, $user['password'])) {
        // Success! Return user info
        echo json_encode([
            "success" => true,
            "user_id" => $user['user_id'],
            "username" => $user['first_name'],
            "role" => $user['user_type'] ?? 'user'
        ]);
    } else {
        // Fail
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Invalid Email or Password"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database Error: " . $e->getMessage()]);
}
?>