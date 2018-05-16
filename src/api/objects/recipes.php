<?php
    class Recipes{ 
        // database connection and table name
        private $conn;
        private $table_name = "recipes";

        // object properties
        public $id;
        public $recipe_name;
        public $ingredient_name;
        public $category_id;
        public $category_name;
        public $instruction_one;
        public $instruction_two;
        public $instruction_three;
        public $instruction_four;
        public $instruction_five;
        public $instruction_six;
        public $prep_time;
        public $vegetarian;
        public $numOfIngredients;
        public $recipe_id;
        public $ingredient_id;
        public $ingredient_quantity;
        public $ingredient_comment;
        public $image_path;
        public $image_name;
        public $difficulty_name;
        public $difficulty_id;
        public $healthy;
        public $recipe_description;
        public $image_id;
        public $image_name_path;

        public function __construct($db){
            $this->conn = $db;
        }

/*
        $query = "SELECT r.recipe_id, r.name as recipe_name, c.name as category, r.prep_time, r.vegetarian, d.difficulty_descr as difficulty, r.healthy,
        i.image_name_path as image_path, r.description as recipe_description
        FROM (((recipes r
        JOIN categories c ON r.category_id=c.category_id)
        JOIN recipeimages i ON r.image_id=i.image_id)
        JOIN difficulties d ON r.difficulty_id=d.difficulty_id)
        LIMIT ?, ?";
*/

        public function read(){

            $query="SELECT recipes.recipe_id as Recipe_Id, recipes.name as Recipe_Name, categories.name as Category, 
            prep_time as Preparation_Time,  vegetarian as Vegetarian, difficulties.difficulty_descr as Difficulty_Descr, healthy as Healthy,
            recipeimages.image_name_path as Image_Path, recipes.description as Recipe_Description
            FROM (((recipes
            JOIN categories ON recipes.category_id=categories.category_id)
            JOIN recipeimages ON recipes.image_id=recipeimages.image_id)
            JOIN difficulties ON recipes.difficulty_id=difficulties.difficulty_id)
            ORDER BY Recipe_Name";

            $stmt=$this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        }

        public function readAll(){
           
            $query="SELECT recipes.name, categories.name as Category, instruction_one as instruction_one,  instruction_two as instruction_two,  
            instruction_three as instruction_three, instruction_four as instruction_four, instruction_five as instruction_five, instruction_six as instruction_six
            FROM " . $this->table_name . " JOIN categories 
            ON recipes.category_id=categories.category_id
            ORDER BY name";

            $stmt=$this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        }


        function readOneRecipe(){

            // query to read single record
           /* $query="SELECT r.name as Recipe_Name, r.instruction_one as instruction_one, r.instruction_two as instruction_two, r.instruction_three as instruction_three,
            r.instruction_four as instruction_four, r.instruction_five as instruction_five, r.instruction_six as instruction_six, r.prep_time as prep_time,
            r.vegetarian as vegetarian, d.difficulty_name as difficulty, r.healthy as healthy,
            ri.image_name_path as image_name_path, r.description as recipe_description, c.categories as category_name
            FROM (((recipes r 
            JOIN categories c ON r.category_id=c.category_id)
            JOIN recipeimages ri ON r.image_id=ri.image_id)
            JOIN difficulties d ON r.difficulty_id=d.difficulty_id)
            WHERE r.recipe_id = ?";*/

            $query="SELECT r.recipe_id as recipe_id, r.name as Recipe_Name, r.instruction_one as instruction_one, r.instruction_two as instruction_two, r.instruction_three as instruction_three,
            r.instruction_four as instruction_four, r.instruction_five as instruction_five, r.instruction_six as instruction_six, r.prep_time as prep_time,
            r.vegetarian as vegetarian, d.difficulty_descr as difficulty_name, r.healthy as healthy,
            ri.image_name_path as image_name_path, r.description as recipe_description, c.name as category_name
            FROM (((recipes r 
            JOIN categories c ON r.category_id=c.category_id)
            JOIN recipeimages ri ON r.image_id=ri.image_id)
            JOIN difficulties d ON r.difficulty_id=d.difficulty_id)
            WHERE r.recipe_id = ?";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // bind id of product to be updated
            $stmt->bindParam(1, $this->id);

            // execute query
            $stmt->execute();

            // get retrieved row
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
            // set values to object properties
            $this->recipe_name = $row['Recipe_Name'];
            $this->recipe_id = $row['recipe_id'];
            $this->instruction_one = $row['instruction_one'];
            $this->instruction_two = $row['instruction_two'];
            $this->instruction_three = $row['instruction_three'];
            $this->instruction_four = $row['instruction_four'];
            $this->instruction_five = $row['instruction_five'];
            $this->instruction_six = $row['instruction_six'];
            $this->difficulty_name = $row['difficulty_name'];
            $this->healthy = $row['healthy'];
            $this->prep_time = $row['prep_time'];
            $this->vegetarian = $row['vegetarian'];
            $this->recipe_description = $row['recipe_description'];
            $this->image_name_path = $row['image_name_path'];
            $this->category_name = $row['category_name'];
            $this->conn = null;

        }

        function readOneRecipeForUpdate(){

            $query="SELECT r.recipe_id as recipe_id, r.name as Recipe_Name, r.instruction_one as instruction_one, r.instruction_two as instruction_two, r.instruction_three as instruction_three,
            r.instruction_four as instruction_four, r.instruction_five as instruction_five, r.instruction_six as instruction_six, r.prep_time as prep_time,
            r.vegetarian as vegetarian, r.difficulty_id as difficulty_id, r.healthy as healthy,
            r.image_id as image_id, r.description as recipe_description, r.category_id as category_id
            FROM recipes r 
            WHERE r.recipe_id = ?";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // bind id of product to be updated
            $stmt->bindParam(1, $this->id);

            // execute query
            $stmt->execute();

            // get retrieved row
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
            // set values to object properties
            $this->recipe_name = $row['Recipe_Name'];
            $this->recipe_id = $row['recipe_id'];
            $this->instruction_one = $row['instruction_one'];
            $this->instruction_two = $row['instruction_two'];
            $this->instruction_three = $row['instruction_three'];
            $this->instruction_four = $row['instruction_four'];
            $this->instruction_five = $row['instruction_five'];
            $this->instruction_six = $row['instruction_six'];
            $this->difficulty_id = $row['difficulty_id'];
            $this->healthy = $row['healthy'];
            $this->prep_time = $row['prep_time'];
            $this->vegetarian = $row['vegetarian'];
            $this->recipe_description = $row['recipe_description'];
            $this->image_id = $row['image_id'];
            $this->category_id = $row['category_id'];
            $this->conn = null;

        }

        function readRecipeIngredients(){

            // query to read single record
            $query="SELECT recipeingredients.recipe_id as recipe_id, recipeingredients.ingredient_id as ingredient_id, ingredients.name as ingredient, recipeingredients.quantity as quantity, 
            recipeingredients.comments as comments
            FROM ((recipeingredients
            JOIN recipes ON recipeingredients.recipe_id=recipes.recipe_id)
            JOIN ingredients ON recipeingredients.ingredient_id=ingredients.ingredient_id)
            WHERE recipeingredients.recipe_id = ?";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // bind id of product to be updated
            $stmt->bindParam(1, $this->id);

            // execute query
            $stmt->execute();

            $this->conn = null;

            return $stmt;       
        }

        function createRecipe(){

            // query to insert record       
            $query = "INSERT INTO recipes 
                SET 
                    `name`=:recipe_name, category_id=:category_id, instruction_one=:instruction_one, instruction_two=:instruction_two, 
                    instruction_three=:instruction_three, instruction_four=:instruction_four, 
                    instruction_five=:instruction_five, instruction_six=:instruction_six,
                    difficulty_id=:difficulty_id, healthy=:healthy, prep_time=:prep_time, vegetarian=:vegetarian, `description`=:recipe_description, image_id=:image_id";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->recipe_name=htmlspecialchars(strip_tags($this->recipe_name));
            $this->category_id=htmlspecialchars(strip_tags($this->category_id));
            $this->instruction_one=htmlspecialchars(strip_tags($this->instruction_one));
            $this->instruction_two=htmlspecialchars(strip_tags($this->instruction_two));
            $this->instruction_three=htmlspecialchars(strip_tags($this->instruction_three));
            $this->instruction_four=htmlspecialchars(strip_tags($this->instruction_four));
            $this->instruction_five=htmlspecialchars(strip_tags($this->instruction_five));
            $this->instruction_six=htmlspecialchars(strip_tags($this->instruction_six));
            $this->difficulty_id=htmlspecialchars(strip_tags($this->difficulty_id));
            $this->healthy=htmlspecialchars(strip_tags($this->healthy));
            $this->prep_time=htmlspecialchars(strip_tags($this->prep_time));
            $this->vegetarian=htmlspecialchars(strip_tags($this->vegetarian));
            $this->recipe_description=htmlspecialchars(strip_tags($this->recipe_description));
            $this->image_id=htmlspecialchars(strip_tags($this->image_id));

            // execute query
            $stmt->bindParam(":recipe_name", $this->recipe_name);
            $stmt->bindParam(":category_id", $this->category_id);
            $stmt->bindParam(":instruction_one", $this->instruction_one);
            $stmt->bindParam(":instruction_two", $this->instruction_two);
            $stmt->bindParam(":instruction_three", $this->instruction_three);
            $stmt->bindParam(":instruction_four", $this->instruction_four);
            $stmt->bindParam(":instruction_five", $this->instruction_five);
            $stmt->bindParam(":instruction_six", $this->instruction_six);
            $stmt->bindParam(":difficulty_id", $this->difficulty_id);
            $stmt->bindParam(":healthy", $this->healthy);
            $stmt->bindParam(":prep_time", $this->prep_time);
            $stmt->bindParam(":vegetarian", $this->vegetarian);
            $stmt->bindParam(":recipe_description", $this->recipe_description);
            $stmt->bindParam(":image_id", $this->image_id);

            // execute query
             if($stmt->execute()){
                $this->id = $this->conn->lastInsertId();
                return true;
            }else{
                return false;
            }
        }

        //function updateRecipeIngredients($recipe_ingredient_id, $recipe_id, $ingredient, $quantity, $comment){
        function updateRecipeIngredients($recipe_id, $ingredient_id, $quantity, $comment){
            $query = "UPDATE recipeingredients
                SET
                    quantity = :quantity,
                    comments = :comments
                WHERE
                    recipe_id = :recipe_id
                AND 
                    ingredient_id = :ingredient_id"; 
                    

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->ingredient_quantity = htmlspecialchars(strip_tags($quantity));
            $this->ingredient_comment = htmlspecialchars(strip_tags($comment));
            $this->ingredient_id = htmlspecialchars(strip_tags($ingredient_id));
            $this->recipe_id = htmlspecialchars(strip_tags($recipe_id));

            // bind new values     
            $stmt->bindParam(":quantity", $this->ingredient_quantity);
            $stmt->bindParam(":comments", $this->ingredient_comment);
            $stmt->bindParam(":recipe_id", $this->recipe_id);
            $stmt->bindParam(":ingredient_id", $this->ingredient_id);  
            //$stmt->bindParam(1, $this->recipe_id);
            //$stmt->bindParam(2, $this->ingredient_id);

            // execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

        }
        
        function createRecipeIngredients($lastCreatedId, $ingredientId, $quantity, $comment){
            
            // query to insert record       
            $query = "INSERT INTO recipeIngredients
                SET 
                    `recipe_id`=:recipe_id, `ingredient_id`=:ingredient_id, `quantity`=:ingredient_quantity, `comments`=:comments";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->recipe_id=htmlspecialchars(strip_tags($lastCreatedId));
            $this->ingredient_id=htmlspecialchars(strip_tags($ingredientId));
            $this->ingredient_quantity=htmlspecialchars(strip_tags($quantity));
            $this->ingredient_comment=htmlspecialchars(strip_tags($comment));

            // execute query
            $stmt->bindParam(":recipe_id", $this->recipe_id);
            $stmt->bindParam(":ingredient_id", $this->ingredient_id);
            $stmt->bindParam(":ingredient_quantity", $this->ingredient_quantity);
            $stmt->bindParam(":comments", $this->ingredient_comment);

            // execute query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
    
        }

        function addIngredientToRecipe($recipe_id, $ingredientId, $quantity, $comment){
            
            // query to insert record       
            $query = "INSERT INTO recipeIngredients
                SET 
                    `recipe_id`=:recipe_id, `ingredient_id`=:ingredient_id, `quantity`=:ingredient_quantity, `comments`=:comments";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->recipe_id=htmlspecialchars(strip_tags($recipe_id));
            $this->ingredient_id=htmlspecialchars(strip_tags($ingredientId));
            $this->ingredient_quantity=htmlspecialchars(strip_tags($quantity));
            $this->ingredient_comment=htmlspecialchars(strip_tags($comment));

            // execute query
            $stmt->bindParam(":recipe_id", $this->recipe_id);
            $stmt->bindParam(":ingredient_id", $this->ingredient_id);
            $stmt->bindParam(":ingredient_quantity", $this->ingredient_quantity);
            $stmt->bindParam(":comments", $this->ingredient_comment);

            // execute query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
    
        }

        function deleteOneRecipeIngredient($recipeId, $ingredientId){
            $query = "DELETE FROM `recipeingredients` WHERE `recipe_id` = ? AND `ingredient_id` = ?";

            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->recipe_id=htmlspecialchars(strip_tags($recipeId));
            $this->ingredient_id=htmlspecialchars(strip_tags($ingredientId));

            $stmt->bindParam(1, $this->recipe_id);
            $stmt->bindParam(2, $this->ingredient_id);

            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

        }

        function deleteOne(){
            $query = "DELETE FROM `recipes` WHERE `recipe_id` = ?";
            //$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->id=htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(1, $this->id);

            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

        }

        function search($keyword){
            
            /*$query = "SELECT p.recipe_id, c.name as category, p.instruction_one, p.instruction_two, p.instruction_three, p.instruction_four, p.prep_time, p.vegetarian
                    FROM recipes r
                    JOIN categories c ON r.category_id=c.category_id
                    WHERE r.name LIKE ?";
            */

            $query = "SELECT r.recipe_id, r.name as recipe_name, c.name as category, r.prep_time, r.vegetarian, r.difficulty, 
                    r.healthy, r.description as recipe_description
                    FROM recipes r
                    JOIN categories c ON r.category_id=c.category_id
                    WHERE r.name LIKE ?";

            // prepare query statement
            $stmt = $this->conn->prepare($query);
            // sanitize
            $keyword=htmlspecialchars(strip_tags($keyword));
            $keyword = "%{$keyword}%";

            // bind
            $stmt->bindParam(1, $keyword);

            // execute query
            $stmt->execute();

            return $stmt;
        }

        // read recipes with pagination
        public function readPaging($from_record_num, $records_per_page){
      
            // select query
            $query = "SELECT r.recipe_id, r.name as recipe_name, c.name as category, r.prep_time, r.vegetarian, d.difficulty_descr as difficulty, r.healthy,
            i.image_name_path as image_path, r.description as recipe_description
            FROM (((recipes r
            JOIN categories c ON r.category_id=c.category_id)
            JOIN recipeimages i ON r.image_id=i.image_id)
            JOIN difficulties d ON r.difficulty_id=d.difficulty_id)
            LIMIT ?, ?";

            // prepare query statement
            $stmt = $this->conn->prepare( $query );
        
            // bind variable values
            $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
            $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
        
            // execute query
            //$stmt->execute();
            if($stmt->execute()){
                return $stmt;
            }
            else{
                return false;
            }

        }

        // used for paging products
        public function count(){
            $query = "SELECT COUNT(*) as total_rows FROM recipes";
        
            $stmt = $this->conn->prepare( $query );
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
            return $row['total_rows'];
        }
        
        function getRecipeData(){
            $query = "SELECT r.recipe_id, r.name as recipe_name, c.name as category_name, c.category_id, r.instruction_one as instruction_1,
            r.instruction_two as instruction_2, r.instruction_three as instruction_3, 
            r.instruction_four as instruction_4, r.instruction_five as instruction_5, r.instruction_six as instruction_6, 
            r.prep_time as preperation_time, r.vegetarian, d.difficulty_descr as difficulty, r.healthy, r.description as recipe_description
            FROM ((`recipes` r 
            JOIN categories c ON r.category_id=c.category_id)
            JOIN difficulties d ON r.difficulty_id=d.difficulty_id)
            WHERE r.recipe_id = ?";

            $stmt = $this->conn->prepare( $query );

            $stmt->bindParam(1, $this->id);
                        
            // execute query
            //$stmt->execute();

            $this->conn = null;

            // execute query
            if($stmt->execute()){
                // get retrieved row
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                // set values to object properties
                $this->recipe_id = $row['recipe_id'];
                $this->recipe_name = $row['recipe_name'];
                $this->category_name = $row['category_name'];
                $this->category_id = $row['category_id'];
                $this->instruction_1 = $row['instruction_1'];
                $this->instruction_2 = $row['instruction_2'];
                $this->instruction_3 = $row['instruction_3'];
                $this->instruction_4 = $row['instruction_4'];
                $this->instruction_5 = $row['instruction_5'];
                $this->instruction_6 = $row['instruction_6'];
                $this->difficulty_name = $row['difficulty'];
                $this->healthy = $row['healthy'];
                $this->preperation_time = $row['preperation_time'];
                $this->vegetarian = $row['vegetarian'];
                $this->recipe_description = $row['recipe_description'];

                return true;

            }else{
                return false;
            }

            //return $stmt;  
        }

        function updateRecipe(){
            
            $query="UPDATE recipes
                SET
                    `name` = :recipe_name,
                    category_id = :category_id,
                    instruction_one = :instruction_one,
                    instruction_two = :instruction_two,
                    instruction_three = :instruction_three,
                    instruction_four = :instruction_four,
                    instruction_five = :instruction_five,
                    instruction_six = :instruction_six,
                    prep_time = :prep_time,
                    vegetarian = :vegetarian,
                    difficulty_id = :difficulty_id,
                    healthy = :healthy,
                    `description` = :recipe_description,
                    image_id = :image_id
                WHERE
                    recipe_id = :recipe_id"; 
                
            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->recipe_name = htmlspecialchars(strip_tags($this->recipe_name));
            $this->recipe_name = htmlspecialchars_decode($this->recipe_name);
            $this->category_id = htmlspecialchars(strip_tags($this->category_id));
            $this->instruction_one = htmlspecialchars(strip_tags($this->instruction_one));
            $this->instruction_two = htmlspecialchars(strip_tags($this->instruction_two));    
            $this->instruction_three = htmlspecialchars(strip_tags($this->instruction_three));
            $this->instruction_four = htmlspecialchars(strip_tags($this->instruction_four));
            $this->instruction_five = htmlspecialchars(strip_tags($this->instruction_five));
            $this->instruction_six = htmlspecialchars(strip_tags($this->instruction_six));
            $this->prep_time = htmlspecialchars(strip_tags($this->prep_time));
            $this->vegetarian = htmlspecialchars(strip_tags($this->vegetarian));
            $this->difficulty_id = htmlspecialchars(strip_tags($this->difficulty_id));
            $this->healthy = htmlspecialchars(strip_tags($this->healthy));
            $this->recipe_id = htmlspecialchars(strip_tags($this->recipe_id));
            $this->recipe_description = htmlspecialchars(strip_tags($this->recipe_description));
            $this->image_id = htmlspecialchars(strip_tags($this->image_id));

            // bind new values  
            $stmt->bindParam(":recipe_name", $this->recipe_name);     
            $stmt->bindParam(":category_id", $this->category_id);
            $stmt->bindParam(":instruction_one", $this->instruction_one);
            $stmt->bindParam(":instruction_two", $this->instruction_two);
            $stmt->bindParam(":instruction_three", $this->instruction_three);
            $stmt->bindParam(":instruction_four", $this->instruction_four);
            $stmt->bindParam(":instruction_five", $this->instruction_five);
            $stmt->bindParam(":instruction_six", $this->instruction_six);
            $stmt->bindParam(":prep_time", $this->prep_time);
            $stmt->bindParam(":vegetarian", $this->vegetarian);
            $stmt->bindParam(":difficulty_id", $this->difficulty_id);
            $stmt->bindParam(":healthy", $this->healthy);
            $stmt->bindParam(":recipe_id", $this->recipe_id);
            $stmt->bindParam(":recipe_description", $this->recipe_description);
            $stmt->bindParam(":image_id", $this->image_id);

            // execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        function updateRecipes(){

            $query="UPDATE `recipes` 
                SET
                     `name` = :recipe_name,
                     category_id = :category_id,
                     instruction_one = :instruction_one,
                     instruction_two = :instruction_two,
                     instruction_three = :instruction_three,
                     instruction_four = :instruction_four,
                     instruction_five = :instruction_five,
                     instruction_six = :instruction_six,
                     prep_time = :prep_time,
                     vegetarian = :vegetarian
                     difficulty = :difficulty,
                     healthy = :healthy,
                     recipe_description = :recipe_description

                WHERE
                    recipe_id = :recipe_id";              

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->recipe_name = htmlspecialchars(strip_tags($this->recipe_name));
            $this->category_id = htmlspecialchars(strip_tags($this->category_id));
            $this->instruction_one = htmlspecialchars(strip_tags($this->instruction_one));
            $this->instruction_two = htmlspecialchars(strip_tags($this->instruction_two));
            $this->instruction_three = htmlspecialchars(strip_tags($this->instruction_three));
            $this->instruction_four = htmlspecialchars(strip_tags($this->instruction_four));
            $this->instruction_five = htmlspecialchars(strip_tags($this->instruction_five));
            $this->instruction_six = htmlspecialchars(strip_tags($this->instruction_six));
            $this->prep_time = htmlspecialchars(strip_tags($this->prep_time));
            $this->difficulty_name = htmlspecialchars(strip_tags($this->difficulty_name));
            $this->healthy = htmlspecialchars(strip_tags($this->healthy));
            $this->vegetarian = htmlspecialchars(strip_tags($this->vegetarian));
            $this->recipe_id = htmlspecialchars(strip_tags($this->recipe_id));
            $this->recipe_description = htmlspecialchars(strip_tags($this->recipe_description));

            // bind new values       
            $stmt->bindParam(":recipe_name", $this->recipe_name);
            $stmt->bindParam(":category_id", $this->category_id);
            $stmt->bindParam(":instruction_one", $this->instruction_one);
            $stmt->bindParam(":instruction_two", $this->instruction_two);
            $stmt->bindParam(":instruction_three", $this->instruction_three);
            $stmt->bindParam(":instruction_four", $this->recipe_instruction_four);
            $stmt->bindParam(":instruction_five", $this->instruction_five);
            $stmt->bindParam(":instruction_six", $this->instruction_six);
            $stmt->bindParam(":prep_time", $this->prep_time);
            $stmt->bindParam(":vegetarian", $this->vegetarian);
            $stmt->bindParam(":difficulty", $this->difficulty_name);
            $stmt->bindParam(":healthy", $this->healthy);            
            $stmt->bindParam(":recipe_id", $this->recipe_id);
            $stmt->bindParam(":recipe_description", $this->recipe_description);
            
            // execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

        }

        function read_difficulties(){
            $query = "SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=`recipes` AND COLUMN_NAME = `difficulty`";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $enumList = explode(",", str_replace("'", "", substr($row['COLUMN_TYPE'], 5, (strlen($row['COLUMN_TYPE'])-6))));

            return $enumList;

        }

        function Create_Image(){

            // query to insert record       
            $query = "INSERT INTO `recipeimages`
                SET 
                    `image_name_path`=:image_name_path";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->image_name_path=htmlspecialchars(strip_tags($this->image_name_path));

            // execute query
            $stmt->bindParam(":image_name_path", $this->image_name_path);

            // execute query
            if($stmt->execute()){
                $this->image_id = $this->conn->lastInsertId();
                return true;
            }else{
                return false;
            }
    
        }
    }
?>