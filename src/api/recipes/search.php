<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


include_once '../objects/recipes.php';

include_once '../config/database.php';


$database = new Database();

$db = $database->getConnection();

$recipe = new recipes($db);

// get keyword
$keyword=isset($_GET["s"]) ? $_GET["s"] : "";

$stmt = $recipe->search($keyword);

$num = $stmt->rowCount();

if($num > 0){
    // query recipes
    $stmt = $recipe->search($keyword);
    $num = $stmt->rowCount();
    
    // check if more than 0 record found
    if($num>0){
    
        // recipes array
        $recipes_arr=array();
        $recipes_arr["records"]=array();
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
    
            $recipes_item=array(
                "Recipe_Id" => $recipe_id,
                "Recipe_Name" => $recipe_name,
                "Category" => html_entity_decode($category),
                "Preparation_Time" => $prep_time,
                "Vegetarian" => $vegetarian,
                "difficulty" => $difficulty,
                "healthy" => $healthy,
                "recipe_description" => $recipe_description
            );
    
            array_push($recipes_arr["records"], $recipes_item);
        }
    
        echo json_encode($recipes_arr);
    }
    
    else{
        echo json_encode(
            array("message" => "No recipes found.")
        );
    }
}

?>