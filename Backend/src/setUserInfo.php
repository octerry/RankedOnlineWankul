<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = $_GET["name"];
$key = $_GET["key"];
$value = json_decode($_GET["value"]);

try {
    require "connection.php";

    $table = "";
    if (in_array($key,["boosters","cards","cards-search","card-fav","card-duo"])) {
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
        $result = $pdo->prepare("SELECT COUNT(*) FROM :table WHERE login.name = :name JOIN login ON :table.id = login.id");
        $result->execute([
            "name" => $name,
            "table" => $table
        ]);
        $count = $result->fetch(PDO::FETCH_NUM);

        // On vérifie si cet utilisateur est déjà dans la table
        if ($count >= 0) {
            // Si oui, on change la valeur
            $stmt = $pdo->prepare("UPDATE :table SET :key = :value WHERE login.name = :name JOIN login ON :table.id = login.id");
            $stmt->execute([
                "key" => $key,
                "value" => json_encode($value),
                "table" => $table
            ]);
        } else {
            // Sinon, on ajoute la valeur
            $stmt = $pdo->prepare("INSERT INTO :table (id, :key) VALUES (login.id, :value) JOIN login ON :table.id = login.id WHERE login.name = :name");
            $stmt->execute([
                "key" => $key,
                "value" => json_encode($value),
                "table" => $table,
                "name" => $name
            ]);
        }

        echo json_encode([1,""]);
    } else {
        echo json_encode([0,"Le nom " . $name . " n'existe pas"]);
    }
} catch (Exception $e) {
    echo json_encode([0,$e]);
}

?>