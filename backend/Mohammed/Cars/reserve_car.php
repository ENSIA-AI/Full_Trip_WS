<?php
// reserve_car.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php'; 

$data = json_decode(file_get_contents("php://input"));

// 1. Validation: Ensure all fields from your TABLE are present
if (
    !isset($data->user_id) || 
    !isset($data->car_id) || 
    !isset($data->pickup_d) || 
    !isset($data->return_d) || 
    !isset($data->pickup_l) || 
    !isset($data->return_l)
) {
    echo json_encode([
        "success" => false, 
        "error" => "Missing required data (dates or locations)."
    ]);
    exit();
}

try {
    $pdo = connectDB();

    // 2. Insert into 'car_reservations' (Matching your screenshot)
    $stmt = $pdo->prepare("
        INSERT INTO car_reservations 
        (user_id, car_id, pickup_d, return_d, pickup_l, return_l, status) 
        VALUES 
        (:uid, :cid, :pd, :rd, :pl, :rl, 'Pending')
    ");

    $result = $stmt->execute([
        ':uid' => $data->user_id,
        ':cid' => $data->car_id,
        ':pd'  => $data->pickup_d,
        ':rd'  => $data->return_d,
        ':pl'  => $data->pickup_l,
        ':rl'  => $data->return_l
    ]);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Reservation created successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to create reservation"]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database Error: " . $e->getMessage()]);
}
?>