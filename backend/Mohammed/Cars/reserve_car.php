<?php
// 1. CORS Headers
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ✅ PATH FIXED: db.php is in the same folder
require_once __DIR__ . '/db.php'; 

try {
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (!$input) {
        throw new Exception("No data received");
    }

    $db = connectDB();

        // 2. Insert Command 
        // We let the database auto-generate 'creservation_id'
        // Explicitly set created_at using NOW() to avoid null issues when DB defaults are not applied
        $sql = "INSERT INTO car_reservations 
            (user_id, car_id, pickup_d, return_d, pickup_l, return_l, status, created_at) 
            VALUES 
            (:uid, :cid, :pickup_d, :return_d, :pickup_l, :return_l, 'active'"; 

    $stmt = $db->prepare($sql);
    
    $stmt->execute([
        ':uid' => $input['user_id'],
        ':cid' => $input['car_id'],
        ':pickup_d' => $input['pickup_d'],
        ':return_d' => $input['return_d'],
        ':pickup_l' => $input['pickup_l'],
        ':return_l' => $input['return_l']
    ]);

    echo json_encode(["success" => true, "message" => "Reservation created"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "Database Error: " . $e->getMessage()
    ]);
}
?>