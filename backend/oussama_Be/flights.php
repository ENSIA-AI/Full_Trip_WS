<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit(0);
}

$db = connectDB();
if (!$db) exit;

// GET - Search flights
if ($method === 'GET') {
    $from = isset($_GET['from']) ? trim($_GET['from']) : '';
    $to = isset($_GET['to']) ? trim($_GET['to']) : '';
    $departureDate = isset($_GET['departure_date']) ? trim($_GET['departure_date']) : '';
    $returnDate = isset($_GET['return_date']) ? trim($_GET['return_date']) : '';
    $passengers = isset($_GET['passengers']) ? (int)$_GET['passengers'] : 1;
    $class = isset($_GET['class']) ? trim($_GET['class']) : 'Economy';

    $errors = [];

    if (strlen($from) < 2) {
        $errors['from'] = 'Departure location is required';
    }
    if (strlen($to) < 2) {
        $errors['to'] = 'Destination is required';
    }
    if ($departureDate === '') {
        $errors['departure_date'] = 'Departure date is required';
    }
    if ($passengers < 1 || $passengers > 9) {
        $errors['passengers'] = 'Passengers must be between 1 and 9';
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }

    try {
        $returnFlights = [];
        $depDate = $departureDate . ' 00:00:00';
        $sql = "SELECT * FROM flights 
                WHERE (departure_city ILIKE :from OR departure_airport ILIKE :from2)
                AND (arrival_city ILIKE :to OR arrival_airport ILIKE :to2)
                AND DATE(departure_time) >= DATE(:dep_date)
                AND class ILIKE :class
                AND status = 'Active'
                ORDER BY price ASC, departure_time ASC
                LIMIT 50";
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':from' => "%$from%",
            ':from2' => "%$from%",
            ':to' => "%$to%",
            ':to2' => "%$to%",
            ':dep_date' => $depDate,
            ':class' => "%$class%"
        ]);
        $flights = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($returnDate !== '') {
            $retDate = $returnDate . ' 00:00:00';
            $sqlReturn = "SELECT * FROM flights 
                          WHERE (departure_city ILIKE :to OR departure_airport ILIKE :to2)
                          AND (arrival_city ILIKE :from OR arrival_airport ILIKE :from2)
                          AND DATE(departure_time) >= DATE(:ret_date)
                          AND class ILIKE :class
                          AND status = 'Active'
                          ORDER BY price ASC, departure_time ASC
                          LIMIT 50";
            $stmtReturn = $db->prepare($sqlReturn);
            $stmtReturn->execute([
                ':from' => "%$from%",
                ':from2' => "%$from%",
                ':to' => "%$to%",
                ':to2' => "%$to%",
                ':ret_date' => $retDate,
                ':class' => "%$class%"
            ]);
            $returnFlights = $stmtReturn->fetchAll(PDO::FETCH_ASSOC);
        }

        $response = [
            'success' => true,
            'data' => [
                'outbound' => $flights,
                'return' => $returnFlights
            ]
        ];
        echo json_encode($response);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

// POST - Book/Reserve flight
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true) ?? [];
    $flightId = isset($data['flight_id']) ? (int)$data['flight_id'] : 0;
    $userEmail = isset($data['user_email']) ? trim($data['user_email']) : '';
    $passengers = isset($data['passengers']) ? (int)$data['passengers'] : 1;

    $errors = [];

    if ($flightId < 1) {
        $errors['flight_id'] = 'Valid flight ID is required';
    }
    if ($passengers < 1 || $passengers > 9) {
        $errors['passengers'] = 'Passengers must be between 1 and 9';
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }

    try {
        $stmt = $db->prepare(
            "INSERT INTO flight_bookings (flight_id, user_email, passengers) VALUES (:flight_id, :user_email, :passengers)"
        );
        $stmt->execute([
            ':flight_id' => $flightId,
            ':user_email' => $userEmail,
            ':passengers' => $passengers
        ]);
        echo json_encode([
            'success' => true,
            'message' => 'Flight reserved successfully!',
            'booking_id' => (int)$db->lastInsertId()
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Booking failed: ' . $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>
