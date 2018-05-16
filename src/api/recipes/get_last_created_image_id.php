<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate recipe object
include_once '../objects/images.php';

$database = new Database();
$db = $database->getConnection();

$image = new images($db);

$image->getLastCreatedImageId();

$lastCreatedIageId = $image->id;

$arr = array();

$arr[0] = $lastCreatedIageId;
$arr[1] = "Last Created Image ID.";

echo json_encode($arr); 

?>