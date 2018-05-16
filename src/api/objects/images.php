<?php
        class Images{

        // database connection and table name
        private $conn;
        private $table_name = "recipeimages";

        // object properties
        public $id;
        public $name;

        public function __construct($db){
            $this->conn=$db;
        }

        public function readAll(){
            
            $query="SELECT image_id, image_name_path FROM " .$this->table_name . " ORDER BY image_id";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt; 
        }

        public function getLastCreatedImageId(){
            
            $query="SELECT image_id FROM `recipeimages` ORDER BY image_id DESC LIMIT 1";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // get retrieved row
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                // set values to object properties
                $this->id = $row['image_id'];

                return true;

            }else{
                return false;
            }

        }
    }
?>