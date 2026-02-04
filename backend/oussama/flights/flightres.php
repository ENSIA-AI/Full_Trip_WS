<?php
// 1. CORS Headers (Allowing connection from your React App)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. DB Connection
require_once __DIR__ . '/../../db.php'; // Adjust path to your actual db.php location

try {
    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        throw new Exception("No data received");
    }

    // 3. SECURITY: Check if User is Logged In
    // We expect the frontend to send a 'user_id'. If it's missing, they aren't logged in.
    if (empty($input['user_id'])) {
        http_response_code(401); // Unauthorized
        echo json_encode(["success" => false, "error" => "User not logged in"]);
        exit;
    }

    // Validate Required Fields
    if (empty($input['flight_id']) || empty($input['payment'])) {
        throw new Exception("Missing flight details or payment information");
    }

    $db = connectDB();

    // 4. Insert Reservation
    // Note: storing full credit card numbers is bad practice for security. 
    // We typically store the last 4 digits. For this example, we store what is sent.
    
    $sql = "INSERT INTO flight_bookings 
            (user_id, flight_id, booking_date, card_name, card_number, card_expiry, price, status) 
            VALUES 
            (:uid, :fid, NOW(), :cname, :cnum, :cexp, :price, 'confirmed')";

    $stmt = $db->prepare($sql);

    // Execute with data
    $stmt->execute([
        ':uid'   => $input['user_id'],
        ':fid'   => $input['flight_id'],
        ':cname' => $input['payment']['cardName'],
        ':cnum'  => $input['payment']['cardNumber'], // In real apps, hash this!
        ':cexp'  => $input['payment']['expiry'],
        ':price' => $input['price']
    ]);

    echo json_encode([
        "success" => true, 
        "message" => "Flight booked successfully!",
        "booking_id" => $db->lastInsertId()
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "Booking Error: " . $e->getMessage()
    ]);
}
?>