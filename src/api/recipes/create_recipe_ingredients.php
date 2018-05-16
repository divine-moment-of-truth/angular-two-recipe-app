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

$lastCreatedId = $data->recipe_id;

//$totalNumIngredients = $data->total_num_ingredients - 2;
/*if($data->total_num_ingredients == 1){
    $totalNumIngredients = $data->total_num_ingredients;
}
elseif($data->total_num_ingredients > 1){
    $totalNumIngredients = $data->total_num_ingredients - 1;
}*/

$totalNumIngredients = $data->total_num_ingredients - 1;

$insertArr = array();
$comment = "";

for ($x = 0; $x <= $totalNumIngredients; $x++) {
    if($totalNumIngredients == 0){
        //$ingredient = $data->ingredient_id;
        //$quantity = $data->ingredient_qty;
        //$comment = $data->ingredient_cmt;
        $ingredient_name = $data->s_ingredientDetails[$x]->ingredient_name;
        $ingredient_id = $data->s_ingredientDetails[$x]->ingredient_id;
        $quantity = $data->s_ingredientDetails[$x]->ingredient_quantity;
        $comment = $data->s_ingredientDetails[$x]->ingredient_comment;
    }
    else{
        $ingredient_name = $data->s_ingredientDetails[$x]->ingredient_name;
        $ingredient_id = $data->s_ingredientDetails[$x]->ingredient_id;
        $quantity = $data->s_ingredientDetails[$x]->ingredient_quantity;
        $comment = $data->s_ingredientDetails[$x]->ingredient_comment;
    }

    $resultTest = "";

    //if($recipe->createRecipeIngredients($lastCreatedId, $ingredient, $quantity, $comment)){
    if($recipe->createRecipeIngredients($lastCreatedId, $ingredient_id, $quantity, $comment)){
        //$resultTest = "Item " . $x . " created successfully."; 
        $insertArr[$x] = "Item " . $x . " created successfully."; 
    }
    else{
        //$resultTest = "Item " . $x . " failed to create."; 
        $insertArr[$x] = "Item " . $x . " failed to create."; 
    }

} 
echo json_encode($insertArr); 

?>