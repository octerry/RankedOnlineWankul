<?php

try {
    require "connection.php";

    $stmt = $pdo->query("SELECT name FROM login");
    $result = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([1,$result]);
} catch (Exception $e) {
    echo json_encode([0,$e]);
}

?> 