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

$recipe_id = $data->recipe_id;
$totalNumOfItems = $data->totalNumOfItems - 2;

$ingredient_name = "";
$ingredient = "";
$quantity = "";
$comment = "";
$isNew = "";

$insertArr = array();

for ($x = 0; $x <= $totalNumOfItems; $x++) {
    $ingredient_name = $data->ingredient_name[$x];
    $ingredient_id = $data->ingredient_id[$x];
    $quantity = $data->ingredient_qty[$x];
    $comment = $data->ingredient_cmt[$x];
    $isNew = $data->new_ingredient[$x];

    $resultTest = "";

    if($isNew == "true"){

        if($recipe->createRecipeIngredients($recipe_id, $ingredient_id, $quantity, $comment)){
            $insertArr[$x] = "[" . $x . "] Ingredient - " . $ingredient_name . " successfully added to recipe."; 
        }
        else{
            $insertArr[$x] = "[" . $x . "] Ingredient - " . $ingredient_name . " failed to be added to recipe.";
        }
    }else{
        if($recipe->updateRecipeIngredients($recipe_id, $ingredient_id, $quantity, $comment)){
            $insertArr[$x] = "[" . $x . "] Ingredient - " . $ingredient_name . " successfully updated."; 
        }
        else{
            $insertArr[$x] = "[" . $x . "] Ingredient - " . $ingredient_name . " failed to be updated.";
        }
    }

} 
echo json_encode($insertArr); 

?>