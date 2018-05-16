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

$recipes = new Recipes($db);

$stmt = $recipes->read(); 
$num = $stmt->rowCount();

if($num>0){
    $recipes_arr = array();
    $recipes_arr["records"] = array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $recipe_item=array(
            "Recipe_Id" => $Recipe_Id,
            "Recipe_Name" => $Recipe_Name,
            "Category" => $Category,
            "Preparation_Time" => $Preparation_Time,
            "Vegetarian" => $Vegetarian,
            "Difficulty_Descr" => $Difficulty_Descr,
            "Healthy" => $Healthy,
            "Image_Path" => $Image_Path,
            "Recipe_Description" => $Recipe_Description
        );

        array_push($recipes_arr["records"],$recipe_item);
    }
    echo json_encode($recipes_arr);
}
else{ 
    echo json_encode(
        array("message" => "No recipes found.")
    );
}
?>