<?php

try {
    require "connection.php";

    $result = $pdo->query("SELECT name FROM login");

    echo json_encode([1,$result]);
} catch (Exception $e) {
    echo json_encode([0,$e]);
}

?> 