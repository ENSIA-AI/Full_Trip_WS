<?php

// ✅ Debug: Log all incoming requests
error_log("Received " . $_SERVER['REQUEST_METHOD'] . " request to users endpoint");
error_log("Request body: " . file_get_contents('php://input'));

require_once __DIR__ . '/../db.php';

$method = $_SERVER['REQUEST_METHOD'];

$db = connectDB();

switch ($method) {
  case 'GET':
    $stmt = $db->query('select * from users order by created_at desc');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    break;

  case 'POST':
    $data = json_decode(file_get_contents('php://input'));
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

    $stmt = $db->prepare('
    insert into users 
    (first_name, last_name, email, country, state, currency, phone_num, password) 
    values 
    (:first_name, :last_name, :email, :country, :state, :currency, :phone_num, :password)
    ');
    $success = $stmt->execute([
      ':first_name' => $data->first_name,
      ':last_name' => $data->last_name,
      ':email' => $data->email,
      ':country' => $data->country,
      ':state' => $data->state,
      ':currency' => $data->currency,
      ':phone_num' => $data->phone_num,
      ':password' => $hashedPassword
    ]);
    if ($success) {
      echo json_encode($success);
    }
    break;

  case 'PUT':
    $data = json_decode(file_get_contents('php://input'));
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
    $stmt = $db->prepare('update users set first_name = :first_name ,last_name=:last_name ,email=:email,country=:country,state=:state,currency=:currency,phone_num =:phone_num ,password =:password where user_id =:user_id returning *');
    $stmt->execute([
      ':user_id' => $data->user_id,
      ':first_name' => $data->first_name,
      ':last_name' => $data->last_name,
      ':email' => $data->email,
      ':country' => $data->country,
      ':state' => $data->state,
      ':currency' => $data->currency,
      ':phone_num' => $data->phone_num,
      ':password' => $hashedPassword
    ]);
    break;

  case 'DELETE':
    $data = json_decode(file_get_contents('php://input'));
    $stmt = $db->prepare('delete from users where user_id =:user_id');
    $stmt->execute([
      'user_id' => $data->user_id
    ]);
    break;

  default:
    echo json_encode(["error" => "There is a fault in users.php"]);
}
