<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = $_GET["name"];
$password = $_GET["password"];
// $name = readline('Nom: ');
// $password = readline('Mot de passe: ');
$users = file_get_contents('../data/users.json');
$users = json_decode($users, true); 

// Decrypter le mdp
if (array_key_exists($name, $users)) {
    $cipherText = $users[$name]['password'];
    $cipher_algo = 'AES-256-CBC';
    $options = 0;   
    $key = "d5b2e2e30d6e470f3183a524b95ac560c001cd4ed163a32108458b0aec06e687";
    $iv = base64_decode($users[$name]['iv']);

    $decrypted = openssl_decrypt($cipherText, $cipher_algo, $key, $options, $iv);

    if ($decrypted === $password) {
        echo 1;
    } else {
        echo 0;
    }
} else {
    echo 0;
}

?>