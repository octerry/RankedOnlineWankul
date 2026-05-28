<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    require "connection.php";

    $result = $pdo->query("SELECT * FROM account");
    $infos = $result->fetch(PDO::FETCH_ASSOC);

    echo json_encode([1,$infos]);
} catch (PDOException $e) {
    echo json_encode([0,$e]);
}


?>