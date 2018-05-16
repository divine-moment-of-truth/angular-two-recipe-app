<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// get database connection
include_once '../config/database.php';

// instantiate recipe object
include_once '../objects/recipes.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare recipe object
$recipe = new Recipes($db);

$recipe->id = isset($_GET['id']) ? $_GET['id'] : die();

$recipe->readOneRecipe();
 
// create array
$recipe_arr = array(
    "recipe_name" => $recipe->recipe_name,
    "recipe_id" => $recipe->recipe_id,
    "category_name" => $recipe->category_name,
    "instruction_one" => $recipe->instruction_one,
    "instruction_two" => $recipe->instruction_two,
    "instruction_three" => $recipe->instruction_three,
    "instruction_four" => $recipe->instruction_four,
    "instruction_five" => $recipe->instruction_five,
    "instruction_six" => $recipe->instruction_six,
    "difficulty_name" => $recipe->difficulty_name,
    "healthy" => $recipe->healthy,
    "prep_time" => $recipe->prep_time,
    "vegetarian" => $recipe->vegetarian,
    "recipe_description" => $recipe->recipe_description,
    "image_name_path" => $recipe->image_name_path
);
 
// make it json format
print_r(json_encode($recipe_arr));

?>