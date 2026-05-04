<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = trim($_POST["name"]);
$password = trim($_POST["password"]);

try {
    require "connection.php";

    session_start();
    if ($_SESSION["id"] != "") session_destroy();
    header("Location: ../../connexion/");

} catch (PDOException $e) {
    echo "<script type='text/javascript'>alert('Une erreur est arrivé :/')</script>";
    header("Location: ../../connexion/");
}

?>