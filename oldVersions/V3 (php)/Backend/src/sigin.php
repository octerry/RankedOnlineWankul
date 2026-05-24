<?php

try {
    require "connection.php";

    $name = $_POST["name"];
    $password = $_POST["password"];
    $password = password_hash($password, PASSWORD_DEFAULT);

    $result = $pdo->prepare("SELECT COUNT(*) FROM login WHERE name = :name");
    $result->execute([
        "name" => $name,
    ]);
    $count = $result->fetch(PDO::FETCH_NUM);

 
    if ( $count[0] <= 0 && !empty($name) && !empty($password)) {
        $stmt = $pdo->prepare("INSERT INTO login (name, password) VALUES (:name, :password)");
        $stmt->execute([
            "name" => $name,
            "password"=> $password
        ]);

        $count = $stmt->fetch(PDO::FETCH_NUM);
        echo $count[0];

        session_start();
        $_SESSION["name"] = $name;
        $_SESSION["id"] = $actulizeData[0]["id"];
        echo "<script type='text/javascript'>alert('Bien enregistré ! Bienvenue $name')</script>";
        header("Location: ../../home.php");
    } else {
        echo "<script type='text/javascript'>alert('Un utilisateur porte déjà le nom $name :/')</script>";
    }
} catch (Exception $e) {
    echo "Erreur : ". $e->getMessage();
}

?>