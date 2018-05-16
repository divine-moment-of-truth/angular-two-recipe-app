<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// get database connection
include_once '../config/database.php';

// instantiate recipe object
include_once '../objects/images.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare recipe object
$images = new Images($db);

//$recipe->id = isset($_GET['id']) ? $_GET['id'] : die();

$images->readAll();
 
$stmt = $images->readAll();
$num = $stmt->rowCount();

if($num > 0){
    $image_arr = array();
    $image_arr['records'] = array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $image_item=array(
            "image_id" => $image_id,
            "image_name_path" => $image_name_path,
        );

        array_push($image_arr['records'],$image_item);
    }

    echo json_encode($image_arr);
}
else{ 
    echo json_encode(
        array("message" => "No recipes found.")
    );
}
 
?>