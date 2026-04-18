<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = trim($_POST["name"]);
$password = trim($_POST["password"]);

try {
    require "connection.php";

    $stmt = $pdo->prepare("SELECT password FROM login WHERE name = :name");
    $stmt->execute([
        "name" => $name
    ]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (password_verify($password, $result[0]["password"])){
        echo 1;
    } else {
        echo 0;
    }
} catch (PDOException $e) {
    echo 0;
}

?>