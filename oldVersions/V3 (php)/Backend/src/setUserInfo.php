<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = $_GET["name"];
$key = $_GET["key"];
$value = json_decode($_GET["value"]);
// $name = readline('Nom: ');
// $password = readline('Mot de passe: ');
$users = file_get_contents('../data/users.json');
$users = json_decode($users, true); 

if (array_key_exists($name, $users)) {
    $user = $users[$name];
    $user[$key] = $value;

    $users[$name] = $user;
    $users = json_encode($users);
    file_put_contents('../data/users.json', $users);
    echo 1;
} else {
    echo 0;
}

?>