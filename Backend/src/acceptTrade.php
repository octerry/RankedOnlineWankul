<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$mySecretID = $_GET["id"];
$offerMessage = json_decode($_GET["offer"]);

$theirID = $offerMessage[0];
$theirCardID = $offerMessage[1][0];
$myCardID = $offerMessage[1][1];

try {
    require "connection.php";

    $result = $pdo->prepare("SELECT `id` FROM login WHERE secret_id = :id");
    $result->execute([
        "id" => $mySecretID,
    ]);
    $myId = $result->fetch(PDO::FETCH_NUM)[0];

    $result = $pdo->prepare("SELECT cards FROM content WHERE id = :id");
    $result->execute([
        "id" => $theirID,
    ]);
    $theirCards = $result->fetch(PDO::FETCH_ASSOC);

    $result->execute([
        "id" => $myId,
    ]);
    $myCards = $result->fetch(PDO::FETCH_ASSOC);

    if ($theirCards && $myCards) {
        $theirCardsList = json_decode($theirCards["cards"]);
        $myCardsList = json_decode($myCards["cards"]);

        $index = array_search($theirCardID, $theirCardsList);
        array_splice($theirCardsList, $index, 1);

        if (!in_array($myCardID, $theirCardsList)) {
            array_push($theirCardsList, $myCardID);
        }

        $index = array_search($myCardID, $myCardsList);
        array_splice($myCardsList, $index, 1);

        if (!in_array($theirCardID, $myCardsList)) {
            array_push($myCardsList, $theirCardID);
        }

        $stmt = $pdo->prepare("UPDATE content SET cards = :value WHERE id = :id");
        $stmt->execute([
            "id" => $theirID,
            "value" => json_encode($theirCardsList)
        ]);

        $stmt = $pdo->prepare("UPDATE content SET cards = :value WHERE id = :id");
        $stmt->execute([
            "id" => $myID,
            "value" => json_encode($myCardsList)
        ]);

        echo json_encode([1,$theirCards]);
    } else {
        echo json_encode([0,"Parametres invalides"]);
    }
} catch (Exception $e) {
    echo json_encode([0,$e->getMessage()]);
}

?>