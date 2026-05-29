<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$pseudo = trim($_GET["pseudo"]);
$id = $_GET["id"];

try {
    require "connection.php";

    $result = $pdo->prepare("SELECT `id`, `friend_requests`, `friends` FROM account WHERE pseudo = :pseudo");
    $result->execute([
        "pseudo" => $pseudo,
    ]);
    $receiver = $result->fetch(PDO::FETCH_ASSOC);
    
    $result = $pdo->prepare("SELECT id FROM login WHERE secret_id = :id");
    $result->execute([
        "id" => $id,
    ]);
    $senderID = $result->fetch(PDO::FETCH_NUM)[0];

    // On vérifie si l'ID n'est pas déjà dans friend_requests
    if ($receiver["id"] && $senderID) {
        if (!in_array((int)$senderID,json_decode($receiver["friend_requests"]))) {
            // Et si ils sont pas déjà amis
            if (!in_array((int)$senderID,json_decode($receiver["friends"]))) {
                
                $requests = json_decode($receiver["friend_requests"]);
                array_push($requests, (int)$senderID);
            
                $stmt = $pdo->prepare("UPDATE account SET friend_requests = :value WHERE id = :id");
                $stmt->execute([
                    "id" => (int)$receiver["id"],
                    "value" => json_encode($requests)
                ]);

                echo json_encode([1,$requests]);
                }
        } else {
            echo json_encode([2,"Une demande a déjà été envoyé"]);
        }
    } else {
        echo json_encode([0,"Le nom " . $name . " n'existe pas"]);
    }
} catch (Exception $e) {
    echo json_encode([0,$e->getMessage()]);
}

?>