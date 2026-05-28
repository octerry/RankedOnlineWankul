<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = trim($_GET["name"]);
$password = trim($_GET["password"]);

try {
    require "connection.php";

    $stmt = $pdo->prepare("SELECT * FROM login WHERE name = :name");
    $stmt->execute([
        "name" => $name
    ]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (password_verify($password, $result[0]["password"])){
        echo json_encode([1,$result[0]["secret_id"]]);
    } else {
        echo json_encode([0,"Nom ou mot de passe incorrect"]);
    }
} catch (PDOException $e) {
    echo json_encode([0,"Erreur lors de la connexion"]);
}

?>