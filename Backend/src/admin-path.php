<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin path</title>
</head>
<body>
    <h2>Créer un compte</h2>
    <form action="sigin.php" method="POST">
        <input type="text" name="name" required>
        <input type="password" name="password" required>
        <button type="submit">Enregistrer</button>
    </form>
    <h2>Se connecter</h2>
    <form action="login.php" method="POST">
        <input type="text" name="name" required>
        <input type="password" name="password" required>
        <button type="submit">Se connecter</button>
    </form>
    <h2>Comptes dans la base de donnée</h2>
    <?php
    
    try {
        require "connection.php";

        $result = $pdo->query("SELECT * FROM login");

        foreach ($result as $row) {
            $id = $row["id"];
            echo $row["id"]. ". " . $row["name"] . " -> " . $row["password"] . " <a href='delSingleUser.php?id=$id'>Supprimer</a><br>";
        }

        if ($result->rowCount() <= 0) echo "La base de donnée est vide";
    } catch (Exception $e) {
        echo "Erreur : ". $e->getMessage() ."";
    }
    
    ?>
</body>
</html>