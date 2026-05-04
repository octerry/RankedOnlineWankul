<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = trim($_POST["name"]);
$password = trim($_POST["password"]);

try {
    require "connection.php";

    $stmt = $pdo->prepare("SELECT * FROM login WHERE name = :name");
    $stmt->execute([
        "name" => $name
    ]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (password_verify($password, $result[0]["password"])){
        session_start();
        $_SESSION["username"] = $name;
        $_SESSION["id"] = $result[0]["id"];
        header("Location: ../../home.php");
    } else {
        header("Location: ../../connexion/");
    }
} catch (PDOException $e) {
    header("Location: ../../connexion/");
}

?>