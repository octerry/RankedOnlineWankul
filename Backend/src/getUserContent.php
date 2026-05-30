<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$id = $_GET["id"];

try {
    require "connection.php";

    $content = $pdo->prepare("SELECT * FROM content WHERE `id` = :id");
    $content->execute([
        "id" => $id
    ]);
    $result = $content->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([1,$result]);
} catch (PDOException $e) {
    echo json_encode([0,$e]);
}




?>