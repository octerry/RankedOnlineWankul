<?php

try {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $name = isset($_GET["name"]) ? trim($_GET["name"]) : '';
    $password = isset($_GET["password"]) ? trim($_GET["password"]) : '';

    if ($name === '' || $password === '') {
        echo json_encode([0, "Paramètres manquants ou invalides"]);
        exit;
    }

    require "connection.php";

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $pdo->prepare("SELECT COUNT(*) FROM login WHERE name = :name");
    $result->execute([
        "name" => $name,
    ]);
    $count = $result->fetch(PDO::FETCH_NUM);
 
    if ($count[0] <= 0 && !empty($name) && !empty($password)) {
        $stmt = $pdo->prepare("
            INSERT INTO login (`name`, `password`)
            VALUES (:name, :password)
        ");
        $stmt->execute([
            ':name' => $name,
            ':password' => $password
        ]);

        $result = $pdo->prepare("SELECT id FROM login WHERE name = :name");
        $result->execute([
            "name" => $name,
        ]);
        $id = $result->fetch(PDO::FETCH_NUM);

        $stmt = $pdo->prepare("
            INSERT INTO content
            (`id`, `boosters`, `cards`, `cards-search`, `card-fav`, `card-duo`)
            VALUES
            (:id, :boosters, :cards, :cardssearch, :cardfav, 0)
        ");
        $stmt->execute([
            ':id' => $id[0],
            ':boosters' => json_encode([10,10,10,10]),
            ':cards' => json_encode([]),
            ':cardssearch' => json_encode([]),
            ':cardfav' => 0
        ]);

        $stmt = $pdo->prepare("
            INSERT INTO account
            (`id`, `pseudo`, `description`, `friends`, `friend_requests`)
            VALUES
            (:id, :pseudo, :description, :friends, :friendrequests)
        ");
        $stmt->execute([
            ':id' => $id[0],
            ':pseudo' => $name,
            ':description' => "Salut, je suis nouveau !",
            ':friends' => json_encode([]),
            ':friendrequests' => json_encode([])
        ]);

        echo json_encode([1,$id[0]]);
    } else {
        echo json_encode([0,"Ce nom existe déjà"]);
    }
} catch (Exception $e) {
    echo json_encode([0, "Erreur lors de la connexion", $e->getMessage()]);
}

?>