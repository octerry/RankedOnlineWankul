<?php

try {
    require "connection.php";

    $result = $pdo->query("SELECT * FROM login");

    foreach ($result as $row) {
        echo $row["id"]. ". " . $row["name"] . " -> " . $row["password"];
    }
} catch (Exception $e) {
    echo "Erreur : ". $e->getMessage() ."";
}

?> 