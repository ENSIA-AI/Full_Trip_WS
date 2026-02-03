<?php
// search_attractions.php

// إعدادات الرأس (Headers)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"));

// نستقبل المتغير "city" من الفرونت اند، لكننا سنستخدمه للبحث في الاسم والمكان
$searchTerm = isset($input->city) ? trim($input->city) : '';
$category = isset($input->category) ? trim($input->category) : '';

try {
    $pdo = connectDB();

    // جملة الاستعلام الأساسية
    $sql = "SELECT attrac_id, name, location, category, price, rating, attrac_img_url 
            FROM attractions 
            WHERE 1=1";
    
    $params = [];

    // 🔥 التغيير الجوهري هنا: البحث في الاسم (name) أو الموقع (location) 🔥
    if (!empty($searchTerm)) {
        // لاحظ الأقواس () مهمة جداً لدمج الشرطين
        $sql .= " AND (name ILIKE :search OR location ILIKE :search)";
        $params[':search'] = "%" . $searchTerm . "%";
    }

    // التصفية حسب الفئة
    if (!empty($category)) {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    $attractions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($attractions);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>