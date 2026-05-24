<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$id = $_GET["id"];

try {
    require "connection.php";

    $stmt = $pdo->prepare("SELECT * FROM login WHERE id = :id");
    $stmt->execute([
        "id" => $id
    ]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) > 0){
        echo json_encode(1);
    } else {
        echo json_encode(0);
    }
} catch (PDOException $e) {
    echo json_encode($e);
}

?>