<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    // get database connection
    include_once '../config/database.php';

    // instantiate recipe object
    include_once '../objects/categories.php';

    $database = new Database();

    $db = $database->getConnection();

    $categories = new Categories($db);

    $stmt = $categories->readAll();

    $num = $stmt->rowCount();

    if($num>0){
        $categories_arr = array();
        $categories_arr['records'] = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $categories_item = array(
                "category_id" => $category_id,
                "category_name" => $name
            );

            array_push($categories_arr['records'], $categories_item);
        }
        echo json_encode($categories_arr);
    }
    else{ 
        echo json_encode(
            array("message" => "No categories found.")
        );
    }
?>