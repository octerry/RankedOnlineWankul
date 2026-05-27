<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin path :3</title>

    <style>
        body {
            background-color: #333;
            color: #fff;
        }

        input {
            background-color: #444;
            color: #fff;
            border: #fff 1px solid;

            &::placeholder {
                color: #fff;
            }
        }

        a {
            color: #a86262;
        }
    </style>
</head>
<body>
    <h2>Créer un compte</h2>
    <form action="signin.php" method="GET">
        <input type="text" name="name" required>
        <input type="password" name="password" required>
        <button type="submit">Enregistrer</button>
    </form>
    <h2>Se connecter</h2>
    <form action="login.php" method="GET">
        <input type="text" name="name" required>
        <input type="password" name="password" required>
        <button type="submit">Se connecter</button>
    </form>
    <h2>Comptes dans la base de donnée</h2>
    <?php
    
    try {
        require "connection.php";

        $login = $pdo->query("SELECT * FROM login");
        $contentPrepare = $pdo->prepare("SELECT * FROM content WHERE id = :id");
        $accountPrepare = $pdo->prepare("SELECT * FROM account WHERE id = :id");

        foreach ($login as $row) {
            $id = $row["id"];

            $contentPrepare->execute([
                "id" => $id
            ]);
            $content = $contentPrepare->fetch(PDO::FETCH_ASSOC);

            $accountPrepare->execute([
                "id" => $id
            ]);
            $account = $accountPrepare->fetch(PDO::FETCH_ASSOC);

            $cardDuo = "true";
            if ($content["card-duo"] == "0") $cardDuo = "false";

            echo $row["id"]. ". " . $row["name"] . " (" . $account["pseudo"] . ") <a href='delSingleUser.php?id=$id'>Supprimer</a><br>";
            echo "Amis : " . $account["friends"] . " (demandes d'amis : " . $account["friend_requests"] . " )<br>";
            echo "Cartes possédées : " . $content["cards"] . " (cartes recherchées : " . $account["cards-search"] . " )<br>";
            echo "Carte favorite : " . $content["card-fav"] . " (duo : " . $cardDuo . " )<br>";
            echo "Boosters restants : " . $content["boosters"];
        }

        if ($login->rowCount() <= 0) echo "La base de donnée est vide";
    } catch (Exception $e) {
        echo "Erreur : ". $e->getMessage() ."";
    }
    
    ?>
</body>
</html>