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

$database = new Database();
$db = $database->getConnection();

$recipe = new Recipes($db);
$recipe->id = isset($_GET['id']) ? $_GET['id'] : die();

$stmt = $recipe->readRecipeIngredients();
$num = $stmt->rowCount();

$ingredients_arr=array();
$ingredients_arr["records"]=array();

if($num>0){
    // ingredients array
    //$ingredients_arr=array();
    //$ingredients_arr["records"]=array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $ingredient_item=array(
            "recipe_id" => $recipe_id,
            "ingredient_id" => $ingredient_id,
            "ingredient" => $ingredient,
            "quantity" => $quantity,
            "comments" => $comments
        );

        array_push($ingredients_arr["records"],$ingredient_item);
    }
    echo json_encode($ingredients_arr);
}
else{
    $ingredient_item=array(
        "recipe_id" => $recipe->id,
        "ingredient_id" => "",
        "ingredient" => "",
        "quantity" => "",
        "comments" => ""
    );

    array_push($ingredients_arr["records"],$ingredient_item);

    echo json_encode($ingredients_arr);

    //echo json_encode(
    //    array("message" => "No ingredients found.")
    //);
}

?>