<?php
    class Categories{
        // database connection and table name
        private $conn;
        private $table_name = "categories";

        // object properties
        public $id;
        public $category_name;

        public function __construct($db){
            $this->conn = $db;
        }

        public function readAll(){
            $query = "SELECT category_id, name FROM "  . $this->table_name . " ORDER BY name";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        }

        public function read(){
            $query = "SELECT category_id, name FROM "  . $this->table_name . " ORDER BY name";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        }

    }

?> 