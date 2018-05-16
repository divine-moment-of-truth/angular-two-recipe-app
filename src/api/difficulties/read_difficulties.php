<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    include_once '../config/database.php';
    include_once '../objects/difficulties.php';

    $database = new Database();

    $db = $database->getConnection();

    $difficulties = new Difficulties($db);

    $stmt =  $difficulties->readAll();

    $num = $stmt->rowCount();

    if($num > 0){

        $difficulties_arr = array();
        $difficulties_arr['records'] = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $difficulties_item=array(
                "difficulty_id" => $difficulty_id,
                "difficulty_descr" => $difficulty_descr
            );
            array_push($difficulties_arr['records'], $difficulties_item);

        }
        echo json_encode($difficulties_arr);
    }
    else{
        echo json_encode(
            array("message" => "No difficulty levels found.")
        ); 
    }

?>