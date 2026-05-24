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

        echo json_encode([1,$id[0]]);
    } else {
        echo json_encode([0,"Ce nom existe déjà"]);
    }
} catch (Exception $e) {
    echo json_encode([0,"Erreur lors de la connexion"]);
}

?>