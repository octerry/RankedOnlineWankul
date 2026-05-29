<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = $_GET["name"];
$key = $_GET["key"];
$value = json_decode($_GET["value"]);

try {
    require "connection.php";

    // Si la valeur est une liste on la convertie en string
    if (in_array($key,["boosters","cards","cards-search","friends","friend_requests"])) $value = json_encode($value);

    // On trouve la table dans laquelle est rangée la valeur
    $table = "";

    if (in_array($key,["boosters","cards","cards-search","card-fav","card-duo","fav-list"])) {
        $table = "content";
    }
    else if (in_array($key,["pseudo","description","friends","friend_requests"])) {
        $table = "account";
    }
    else if ($key == "name") {
        $table = "login";
    } else {
        error_log("clé inconnue");
    }

    $result = $pdo->prepare("SELECT COUNT(*) FROM login WHERE name = :name");
    $result->execute([
        "name" => $name,
    ]);
    $count = $result->fetch(PDO::FETCH_NUM);
    
    // On vérifie si on a bien un compte avec ce nom
    if ($count[0] >= 0 && !empty($name)) {
        $result = $pdo->prepare("SELECT id FROM login WHERE name = :name");
        $result->execute([
            "name" => $name
        ]);
        $id = $result->fetch(PDO::FETCH_NUM);

        // Si oui, on change la valeur
        $stmt = $pdo->prepare("UPDATE " . $table . " SET " . $key . " = :value WHERE id = :id");
        $stmt->execute([
            "id" => $id[0],
            "value" => $value
        ]);

        echo json_encode([1,""]);
    } else {
        echo json_encode([0,"Le nom " . $name . " n'existe pas"]);
    }
} catch (Exception $e) {
    echo json_encode([0,$e]);
}

?>