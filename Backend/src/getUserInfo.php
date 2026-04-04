<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = $_GET["name"];
// $name = readline('Nom: ');
$users = file_get_contents('../data/users.json');
$users = json_decode($users, true); 

// Decrypter le mdp
if (array_key_exists($name, $users)) {
    $toSend = [
        'cards' => $users[$name]['cards'],
        'boosters' => $users[$name]['boosters'],
        'id' => $users[$name]['id'],
    ];
    echo json_encode($toSend);
} else {
    echo 0;
}

?>