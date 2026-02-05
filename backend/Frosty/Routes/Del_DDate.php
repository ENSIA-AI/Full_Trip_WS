<?php

header("Access-Control-Allow-Origin: *", true);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE", true);
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true", true);
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
require '../../Database.php';
$db = connectDB();

$id = $_GET['id'] ?? null;



if ($id) {
    $sql = "DELETE FROM departure_dates WHERE ddate_id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute([':id' => $id]);

    echo json_encode([
        "success" => true, 
        "rows_affected" => $stmt->rowCount()
    ]);
} else {
    echo json_encode(["success" => false, "message" => "No ID provided"]);
}