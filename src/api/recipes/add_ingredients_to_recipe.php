<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$ingredientId = "";
$ingredientQty = "";
$ingredientCmt = "";

// get database connection
include_once '../config/database.php';

// instantiate recipe object
include_once '../objects/recipes.php';

$database = new Database();

$db = $database->getConnection();

$recipe = new Recipes($db);

$data = json_decode(file_get_contents("php://input"));

$recipeId = $data->id;

$IngredientsToAdd = $data->ingredients_to_add;

$totalNumIngredientsToAddnum = sizeof($IngredientsToAdd);

foreach ($IngredientsToAdd as $ingredient) {
    $ingredient_id = $ingredient->ingredient_id;
    $recipe->addIngredientToRecipe($recipeId, $ingredient_id, "", "");
    echo "Ingredient $ingredient_id added to recipe";
}

echo json_encode(
    array("message" => "Ingredients successfully added to recipe..")
);

?>