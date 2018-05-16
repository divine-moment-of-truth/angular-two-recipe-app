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

//if(isset($_FILES["file"]["type"]))
if(isset($_FILES["selectFile"]["type"]))
{
    $validextensions = array("jpeg", "jpg", "png");
    $temporary = explode(".", $_FILES["selectFile"]["name"]);
    $file_extension = end($temporary);
    $recipe->image_name_path = "./assets/images/" . $_FILES["selectFile"]["name"];
    //$recipe->image_name_path = "/recipe_app/api/images/" . $_FILES["file"]["name"];

    if ((($_FILES["selectFile"]["type"] == "image/png") || ($_FILES["selectFile"]["type"] == "image/jpg") || ($_FILES["selectFile"]["type"] == "image/jpeg")
    ) && ($_FILES["selectFile"]["size"] < 100000)//Approx. 100kb files can be uploaded.
    && in_array($file_extension, $validextensions)) {
        if ($_FILES["selectFile"]["error"] > 0)
        {
            echo '{';
                echo '"Return Code": $_FILES["selectFile"]["error"]';
            echo '}';
            //echo "Return Code: " . $_FILES["selectFile"]["error"] . "<br/><br/>";
        }
        else
        {
            if (file_exists("../../assets/images/" . $_FILES["selectFile"]["name"])) {
                //echo $_FILES["selectFile"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
                echo '{';
                    echo '"message": "A file with this file name already exists. Rename file and try again!"';
                echo '}';
            }
            else
            {
                $sourcePath = $_FILES['selectFile']['tmp_name']; // Storing source path of the file in a variable
                $targetPath = "../../assets/images/".$_FILES['selectFile']['name']; // Target path where file is to be stored
                //move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
                if(move_uploaded_file($sourcePath,$targetPath) ){
                    if($recipe->Create_Image()){
                        //$recipe->image_id;
                        ob_end_clean(); // Clears all echoed data 

                        $arr = array();
    
                        $arr[0] = $recipe->image_id;
                        $arr[1] = "message: Image successfully uploaded.";
    
                        echo json_encode($arr); 

                    }
                    else{
                        echo '{';
                            echo '"message": "Image upload unsuccessful."';
                        echo '}';
                    }
                }
                else{
                    echo '{';
                        echo '"message": "Image upload unsuccessful."';
                    echo '}';
                }

                /*
                echo "<span id='success'>Image Uploaded Successfully...!!</span><br/>";
                echo "<br/><b>File Name:</b> " . $_FILES["selectFile"]["name"] . "<br>";
                echo "<b>Type:</b> " . $_FILES["selectFile"]["type"] . "<br>";
                echo "<b>Size:</b> " . ($_FILES["selectFile"]["size"] / 1024) . " kB<br>";
                echo "<b>Temp file:</b> " . $_FILES["selectFile"]["tmp_name"] . "<br>";

             
                if($recipe->Create_Image()){
                    //$recipe->image_id;
                    ob_end_clean(); // Clears all echoed data 

                    $arr = array();

                    $arr[0] = $recipe->image_id;
                    $arr[1] = "message: Image successfully uploaded.";

                    echo json_encode($arr); 
                }
                else{
                    echo "{";
                        echo "message: Image upload unsuccessful";
                    echo "}";
                }
                */
                
            }
        }
    }
    else
    {
        echo "<span id='invalid'>***Invalid file Size or Type***<span>";
    }
}



?>