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

$recipeId = $data->id;

$ingredientsToDeleteIds = $data->ingredients_to_delete_ids;

$num = sizeof($ingredientsToDeleteIds);

//If there are no ingredients then do not try to delete anything from DB
If($num != 0){

    foreach ($ingredientsToDeleteIds as $id) {
        $recipe->deleteOneRecipeIngredient($recipeId, $id);
        echo "Ingredient $id deleted from recipe";
    }

    echo json_encode(
        array("message" => "Ingredients successfully deleted from recipe..")
    );
}
else{
    echo json_encode(
        array("message" => "No ingredients selected for deletion.")
    );
}

?>