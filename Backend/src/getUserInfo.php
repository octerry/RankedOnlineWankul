<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$id = $_GET["id"];

try {
    require "connection.php";

    $stmt = $pdo->prepare("SELECT `id`, `name` FROM login WHERE `secret_id` = :id");
    $stmt->execute([
        "id" => (int) $id
    ]);
    $infos = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($infos) {
        $content = $pdo->prepare("SELECT * FROM content WHERE `id` = :id");
        $content->execute([
            "id" => $infos["id"]
        ]);
        $result = $content->fetch(PDO::FETCH_ASSOC);

        $infos = array_merge($infos, $result);

        $account = $pdo->prepare("SELECT * FROM account WHERE `id` = :id");
        $account->execute([
            "id" => (int) $infos["id"]
        ]);
        $infos = array_merge($infos, $account->fetch(PDO::FETCH_ASSOC));

        echo json_encode([1,$infos]);
    } else {
        echo '[0,"id inconnue"]';
    }
} catch (PDOException $e) {
    echo json_encode([0,$e]);
}


?>