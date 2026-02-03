<?php
header('Content-Type: application/json');

// PostgreSQL connection via PDO
$host = 'localhost';
$db   = 'your_database';
$user = 'your_user';
$pass = 'your_password';
$dsn  = "pgsql:host=$host;dbname=$db";

try {
    $conn = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'errors' => ['db' => $e->getMessage()]]);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'errors' => ['method' => 'Only POST requests allowed']]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'));

// Input defaults
$place    = trim($data->place ?? '');
$adults   = $data->adults ?? 1;
$children = $data->children ?? 0;
$pets     = $data->pets ?? 0;
$budget   = $data->budget ?? 0;
$errors   = [];
$hotels   = [];

// Validation
if (strlen($place) < 3) $errors['place'] = "Please enter a valid city or hotel name.";
if (!is_numeric($adults) || $adults < 1) $errors['adults'] = "At least 1 adult is required.";
if ($children < 0) $errors['children'] = "Children cannot be negative.";
if ($pets < 0) $errors['pets'] = "Pets cannot be negative.";
if ($budget < 0) $errors['budget'] = "Budget cannot be negative.";

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// PostgreSQL query using PDO
try {
    $sql = "SELECT * FROM public.hotels 
            WHERE h_location ILIKE :place
            AND price <= :budget";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':place'  => "%$place%",
        ':budget' => $budget
    ]);

    $hotels = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $hotels]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'errors' => ['server' => $e->getMessage()]]);
}
?>
