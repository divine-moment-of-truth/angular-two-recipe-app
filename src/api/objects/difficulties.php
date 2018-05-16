<?php
    class Difficulties{
        private $conn;
        private $tableName = "difficulties";

        public function __construct($db){
            $this->conn = $db;       
        }

        public function readAll(){
            $query = "SELECT difficulty_id, difficulty_descr FROM " . $this->tableName . " order by `difficulty_id`";

            $stmt = $this->conn->prepare($query);

            $stmt->execute();

            return $stmt;
        }

    }

?>