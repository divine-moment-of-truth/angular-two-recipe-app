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

$recipe_ingredients_arr = $data->ingredients_to_update->s_ingredientDetails;

$recipe_id = $data->ingredients_to_update->recipe_id;

foreach($recipe_ingredients_arr as $recipeIngredient){
    $ingredient_id = $recipeIngredient->ingredient_id;
    $ingredient_quantity = $recipeIngredient->ingredient_quantity;
    $ingredient_comment = $recipeIngredient->ingredient_comment;
    $recipe->updateRecipeIngredients($recipe_id, $ingredient_id, $ingredient_quantity, $ingredient_comment);
}

echo json_encode(
    array("message" => "Recipe ingredients successfully updated.")
);

?>
