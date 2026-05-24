<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

$id = $_GET["id"];

try {
    require "connection.php";

    $result = $pdo->prepare("SELECT * FROM login WHERE id = :id");
    $result->execute([
        "id" => $id
    ]);
    $infos = $result->fetch(PDO::FETCH_ASSOC);

    echo json_encode($infos);
} catch (PDOException $e) {
    echo $e->getMessage();
}


?>