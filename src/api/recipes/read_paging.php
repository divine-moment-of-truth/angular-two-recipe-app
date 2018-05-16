<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/recipes.php';
 
// utilities
$utilities = new Utilities();
 
// instantiate database and recipe object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$recipe = new Recipes($db);
 
// query recipes
$stmt = $recipe->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // recipe array
    $recipes_arr=array();
    $recipes_arr["records"]=array();
    $recipes_arr["paging"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $recipe_item=array(
            "Recipe_Id" => $recipe_id,
            "Recipe_Name" => $recipe_name,
            "Category" => $category,
            "Preparation_Time" => $prep_time,
            "Vegetarian" => $vegetarian,
            "Difficulty" => $difficulty,
            "Healthy" => $healthy,
            "Image_Path" => $image_path,
            "recipe_description" => $recipe_description
        );
        array_push($recipes_arr["records"], $recipe_item);
    }

    // include paging
    $total_rows=$recipe->count();
    $page_url="{$home_url}api/recipes/read_paging.php?";
    $paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $recipes_arr["paging"]=$paging;
 
    echo json_encode($recipes_arr);

}
else{
    echo json_encode(
        array("message" => "No recipes found.")
    );
}
?>