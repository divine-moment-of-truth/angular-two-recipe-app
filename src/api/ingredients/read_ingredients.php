<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    include_once '../config/database.php';
    include_once '../objects/ingredients.php';

    $database = new Database();

    $db = $database->getConnection();

    $ingredients = new Ingredients($db);

    $stmt = $ingredients->readAll();

    $num = $stmt->rowCount();

    if($num>0){
        $ingredients_arr = array();
        $ingredients_arr['records'] = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $ingredients_item=array(
                "ingredient_id" => $ingredient_id,
                "ingredient_name" => $name,
                "ingredient_checked" => $checked
            );
            array_push($ingredients_arr['records'], $ingredients_item);
        }
        echo json_encode($ingredients_arr);
    }
    else{
        echo json_encode(
            array("message" => "No ingredients found.")
        );
    }

?>