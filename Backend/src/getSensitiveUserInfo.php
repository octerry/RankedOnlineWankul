<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$id = $_GET["id"];
$password = $_GET["password"];

try {
    require "connection.php";

    $result = $pdo->prepare("SELECT * FROM login WHERE id = :id");
    $result->execute([
        "id" => $id
    ]);
    $infos = $result->fetch(PDO::FETCH_ASSOC);

    echo $infos["password"];

    $content = $pdo->prepare("SELECT * FROM content WHERE id = :id");
    $content->execute([
        "id" => $id
    ]);
    $infos = array_merge($infos, $content->fetch(PDO::FETCH_ASSOC));

    $account = $pdo->prepare("SELECT * FROM account WHERE id = :id");
    $account->execute([
        "id" => $id
    ]);
    $infos = array_merge($infos, $account->fetch(PDO::FETCH_ASSOC));

    echo json_encode([1,$infos]);
} catch (PDOException $e) {
    echo json_encode([0,$e]);
}


?>