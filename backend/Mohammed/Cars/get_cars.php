<?php
// backend/Mohammed/get_cars.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../db.php'; 

try {
    $db = connectDB();
    
    // Select all cars (adjust column names if your DB is different)
    $stmt = $db->prepare("SELECT * FROM cars"); 
    $stmt->execute();
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cars);

} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>