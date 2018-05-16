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

$recipe->recipe_name = $data->name;
$recipe->recipe_description = $data->description;
$recipe->category_id = $data->category_id;
$recipe->instruction_one = $data->instruction_one;
$recipe->instruction_two = $data->instruction_two;
$recipe->instruction_three = $data->instruction_three;
$recipe->instruction_four = $data->instruction_four;
$recipe->instruction_five = $data->instruction_five;
$recipe->instruction_six = $data->instruction_six;
$recipe->difficulty_id = $data->difficulty_id;
$recipe->healthy = $data->healthy;
$recipe->vegetarian = $data->vegetarian;
$recipe->prep_time = $data->preperation;
$recipe->image_id = $data->image_id;

//Works out if the healthy check box was checked or not
/* if(count($data->healthy) > 1)
{
    $recipe->healthy = 'yes';
}
else
{
    $recipe->healthy = 'no';
}

//Works out if the vegetarian check box was checked or not
if(count($data->vegetarian) > 1)
{
    $recipe->vegetarian = 'yes';
}
else{
   $recipe->vegetarian = 'no';
} */



if($recipe->createRecipe()){
    $recipe->id;

    $arr = array();

    $arr[0] = $recipe->id;
    $arr[1] = "Recipe created successfully.";

    echo json_encode($arr); 
}
else{
    echo "{";
        echo '"message": "Unable to create recipe."';
    echo "}";
}

?>