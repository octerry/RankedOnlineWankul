<?php

// Eviter le CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    require "connection.php"; // pour avoir le PDO

    // On récupère les trucs dans le lien
    $name = trim($_GET["name"]);
    $password = trim($_GET["password"]);

    // On vérifie si il existe déjà un compte avec ce nom
    $result = $pdo->prepare("SELECT COUNT(*) FROM login WHERE name = :name");
    $result->execute([
        "name" => $name,
    ]);
    $count = $result->fetch(PDO::FETCH_NUM);
 
    // Si c'est pas le cas et que les paramètres sont pas vides
    if ($count[0] <= 0 && !empty($name) && !empty($password)) {
        $secretID = random_int(1000,65535);

        // On vérifie qu'il a pas été pris
        $stmt = $pdo->prepare("
            SELECT COUNT(*) FROM login WHERE secret_id = :secret_id
        ");
        $stmt->execute([
            ':secret_id' => $secretID
        ]);
        if ($stmt->fetch(PDO::FETCH_NUM)>0) {
            $secretID = random_int(1024,65535);
        }

        // On ajoute le compte dans les tableaux
        $stmt = $pdo->prepare("
            INSERT INTO login (`name`, `password`, `secret_id`)
            VALUES (:name, :password, :secret_id)
        ");
        $stmt->execute([
            ':name' => $name,
            ':password' => password_hash($password, PASSWORD_DEFAULT),
            ':secret_id' => $secretID
        ]);

        $result = $pdo->prepare("SELECT id,secret_id FROM login WHERE name = :name");
        $result->execute([
            "name" => $name,
        ]);
        $id = $result->fetch(PDO::FETCH_ASSOC);

        $stmt = $pdo->prepare("
            INSERT INTO content
            (`id`, `boosters`, `cards`, `cards-search`, `card-fav`, `card-duo`, `fav-list`)
            VALUES
            (:id, :boosters, :cards, :cardssearch, :cardfav, 0, :favlist)
        ");
        $stmt->execute([
            ':id' => $id["id"],
            ':boosters' => json_encode([10,10,10,10]),
            ':cards' => json_encode([]),
            ':cardssearch' => json_encode([]),
            ':cardfav' => 0,
            ':favlist' => json_encode([])
        ]);

        $stmt = $pdo->prepare("
            INSERT INTO account
            (`id`, `pseudo`, `team`, `description`, `friends`, `friend_requests`)
            VALUES
            (:id, :pseudo, :team ,:description, :friends, :friendrequests)
        ");
        $stmt->execute([
            ':id' => $id["id"],
            ':pseudo' => $name,
            ':team' => "0000",
            ':description' => "Salut, je suis nouveau !",
            ':friends' => json_encode([]),
            ':friendrequests' => json_encode([])
        ]);

        echo json_encode([1,$id["secret_id"]]);
    } else {
        echo json_encode([0,"Ce nom existe déjà"]);
    }
} catch (Exception $e) {
    echo json_encode([0, "Erreur lors de la connexion", $e->getMessage()]);
}

?>