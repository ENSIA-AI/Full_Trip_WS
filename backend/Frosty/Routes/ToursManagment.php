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

session_start();
$_SESSION['user_id'] = 19;

try {

    $data = array();




    $sql = "Select * from tours where user_id= {$_SESSION['user_id']}";

    $result = $db->query($sql);

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $highlights = $db->query("Select description from highlights where tour_id= {$row['tour_id']} ");
        $DepartureDates = $db->query("Select * from departure_dates where tour_id= {$row['tour_id']} ");

        $highlight_arr = array();
        $DDates_arr = array();

        while ($highlight = $highlights->fetch(PDO::FETCH_ASSOC)) {

            array_push($highlight_arr, $highlight['description']);
        }
        while ($DDate = $DepartureDates->fetch(PDO::FETCH_ASSOC)) {

            array_push($DDates_arr, $DDate);
        }

        $row['highlights'] = $highlight_arr;
        $row['departure_dates'] = $DDates_arr;

        array_push($data,$row);
    }

    echo json_encode($data);

} catch (\Throwable $th) {

    echo "Getting Data Failed: " . $th->getMessage();
}
