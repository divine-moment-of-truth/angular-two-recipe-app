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
include_once '../objects/recipes.php';

$database = new Database();

$db = $database->getConnection();

$recipe = new Recipes($db);

$data = json_decode(file_get_contents("php://input"));

$recipe->id = $data->id;

if($recipe->getRecipeData()){

    $recipe_arr=array(
        "recipe_id" => $recipe->recipe_id,
        "recipe_name" => $recipe->recipe_name,
        "category_id" => $recipe->category_id,
        "category_name" => $recipe->category_name,
        "instruction_1" => $recipe->instruction_1,
        "instruction_2" => $recipe->instruction_2,
        "instruction_3" => $recipe->instruction_3,
        "instruction_4" => $recipe->instruction_4,
        "instruction_5" => $recipe->instruction_5,
        "instruction_6" => $recipe->instruction_6,
        "preperation_time" => $recipe->preperation_time,
        "vegetarian" => $recipe->vegetarian,
        "difficulty" => $recipe->difficulty,
        "healthy" => $recipe->healthy
    );
    // make it json format
    echo json_encode($recipe_arr);
}
else{
    echo json_encode(
        array("message" => "No recipe found.")
    );
}

?>