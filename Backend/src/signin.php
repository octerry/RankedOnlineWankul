<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = trim($_GET["name"]);
$password = trim($_GET["password"]);

try {
    require "connection.php";

    $result = $pdo->prepare("SELECT COUNT(*) FROM login WHERE name = :name");
    $result->execute([
        "name" => $name,
    ]);
    $count = $result->fetch(PDO::FETCH_NUM);
 
    if ($count[0] <= 0 && !empty($name) && !empty($password)) {
        $stmt = $pdo->prepare("INSERT INTO login (name, password) VALUES (:name, :password)");
        $stmt->execute([
            "name" => $name,
            "password"=> password_hash($password, PASSWORD_DEFAULT)
        ]);

        $result = $pdo->prepare("SELECT id FROM login WHERE name = :name");
        $result->execute([
            "name" => $name,
        ]);
        $id = $result->fetch(PDO::FETCH_NUM);

        $stmt = $pdo->prepare("INSERT INTO content (id, boosters, cards, cards-search, card-fav, card-duo) VALUES (:id, :boosters, :cards, :cards-search, :card-fav, :card-duo)");
        $stmt->execute([
            "id" => $id,
            "boosters" => json_encode([10,10,10,10]),
            "cards" => json_encode([]),
            "cards-search" => json_encode([]),
            "card-fav" => 1,
            "card-duo" => false
        ]);

        $stmt = $pdo->prepare("INSERT INTO content (id, pseudo, description, friends, friend_requests) VALUES (:id, :pseudo, :description, :friends, :friend_requests)");
        $stmt->execute([
            "id" => $id,
            "pseudo" => $name,
            "description" => "Je suis nouveau !",
            "friends" => json_encode([]),
            "firend_request" => json_encode([])
        ]);

        echo json_encode([1,$id[0]]);
    } else {
        echo json_encode([0,"Ce nom existe déjà"]);
    }
} catch (Exception $e) {
    echo json_encode([0,"Erreur lors de la connexion"]);
}

?>