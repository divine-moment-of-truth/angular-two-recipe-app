<?php
    class Ingredients{

        // database connection and table name
        private $conn;
        private $table_name = "ingredients";

        // object properties
        public $id;
        public $name;

        public function __construct($db){
            $this->conn=$db;
        }

        public function readAll(){
            
            $query="SELECT ingredient_id, name, checked FROM " .$this->table_name . " ORDER BY name";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt; 
        }

        public function read(){
            
            $query="SELECT ingredient_id, name, checked FROM " .$this->table_name . " ORDER BY name";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt; 
        }
    }

?>