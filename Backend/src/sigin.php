<?php

try {
    require "connection.php";

    $name = $_POST["name"];
    $password = $_POST["password"];
    $password = password_hash($password, PASSWORD_DEFAULT);

    $result = $pdo->query("SELECT name FROM login");
    $names = $result->fetch(PDO::FETCH_ASSOC);

    if ( ( empty($names["name"]) || $name != $names["name"] || !in_array($name, $names["name"]) ) && !empty($name) && !empty($password)) {
        $stmt = $pdo->prepare("INSERT INTO login (name, password) VALUES (:name, :password)");
        $stmt->execute([
            "name" => $name,
            "password"=> $password
        ]);

        echo "Bien enregistré :)";
    } else {
        echo "Un compte porte déjà ce nom :/";
    }
} catch (Exception $e) {
    echo "Erreur : ". $e->getMessage() ."";
}

?>