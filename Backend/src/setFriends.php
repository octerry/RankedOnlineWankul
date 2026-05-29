<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$mySecretID = $_GET["myId"];
$theirID = $_GET["theirId"];

try {
    require "connection.php";

    $result = $pdo->prepare("SELECT `friends` FROM account WHERE id = :id");
    $result->execute([
        "id" => $theirID,
    ]);
    $theirInfo = json_decode($result->fetchColumn());
    
    $result = $pdo->prepare("SELECT id FROM login WHERE secret_id = :id");
    $result->execute([
        "id" => $mySecretID,
    ]);
    $myID = $result->fetch(PDO::FETCH_NUM)[0];

    $result = $pdo->prepare("SELECT `friends` FROM account WHERE id = :id");
    $result->execute([
        "id" => $myID,
    ]);
    $myInfo = json_decode($result->fetchColumn());

    if (!in_array($myID, $theirInfo)) {
        array_push($theirInfo, (int)$myID);

        $stmt = $pdo->prepare("UPDATE account SET friends = :value WHERE id = :id");
        $stmt->execute([
            "id" => (int)$theirID,
            "value" => json_encode($theirInfo)
        ]);
    }

    if (!in_array($theirID, $myInfo)) {
        array_push($myInfo, (int)$theirID);

        $stmt = $pdo->prepare("UPDATE account SET friends = :value WHERE id = :id");
        $stmt->execute([
            "id" => (int)$myID,
            "value" => json_encode($myInfo)
        ]);
    }

    echo '[1]';
} catch (Exception $e) {
    echo json_encode([0,$e->getMessage()]);
}

?>