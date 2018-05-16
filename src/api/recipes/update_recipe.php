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

$recipe->recipe_id = $data->recipe_id;
$recipe->recipe_name = $data->recipe_name;
$recipe->category_id = $data->category_id;
$recipe->instruction_one = $data->instruction_one;
$recipe->instruction_two = $data->instruction_two;
$recipe->instruction_three = $data->instruction_three;
$recipe->instruction_four = $data->instruction_four;
$recipe->instruction_five = $data->instruction_five;
$recipe->instruction_six = $data->instruction_six;
$recipe->prep_time = $data->preperation;
$recipe->difficulty_id = $data->difficulty_id;
$recipe->healthy = $data->isHealthy;
$recipe->recipe_description = $data->recipe_description;
$recipe->image_id = $data->image_id;

if(isset($data->vegetarian)){
    $recipe->vegetarian = 'yes';
}
else{
    $recipe->vegetarian = 'no';
}

if($recipe->updateRecipe()){
    echo '{';
        echo '"message" : "Recipe updated successfully"';
    echo '}';
}else{
    echo '{';
        echo '"message" : "Unable to update recipe!"';
    echo '}';
}

?>