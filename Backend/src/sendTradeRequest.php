<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$mySecretID = $_GET["myid"];
$myOffer = isset($_GET["mycard"]) ? trim($_GET["mycard"]) : -1;

$theirID = $_GET["theirid"];
$theirOffer = isset($_GET["theircard"]) ? trim($_GET["theircard"]) : -1;

try {
    require "connection.php";

    $result = $pdo->prepare("SELECT `id` FROM login WHERE secret_id = :id");
    $result->execute([
        "id" => $mySecretID,
    ]);
    $myId = $result->fetch(PDO::FETCH_NUM)[0];

    $result = $pdo->prepare("SELECT `trade_requests` FROM account WHERE id = :id");
    $result->execute([
        "id" => $theirID,
    ]);
    $theirTrade = $result->fetch(PDO::FETCH_ASSOC);
    $theirTradeList = json_decode($theirTrade["trade_requests"]);

    $combine = [$myId, [(int)$myOffer, (int)$theirOffer]];

    // Pour éviter les spam
    if (!in_array($combine, $theirTradeList)) {
        array_push($theirTradeList, $combine);

        $stmt = $pdo->prepare("UPDATE account SET trade_requests = :value WHERE id = :id");
        $stmt->execute([
            "id" => $theirID,
            "value" => json_encode($theirTradeList)
        ]);

        echo json_encode([1,$theirTradeList]);
    } else {
        echo json_encode([0,"Demande déjà envoyé"]);
    }
} catch (Exception $e) {
    echo json_encode([0,$e->getMessage()]);
}

?>