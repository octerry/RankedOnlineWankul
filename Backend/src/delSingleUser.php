<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

try {
    require "connection.php";

    $id = $_GET["id"];
    
    if (!empty($id)) {
        $result = $pdo->prepare("DELETE FROM login WHERE id = :id");
        $result->execute([
            "id" => $id
        ]);
    }

    echo "Bien supprimé !";
} catch (PDOException $e) {
    echo $e->getMessage();
}


?>