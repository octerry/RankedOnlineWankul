<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$name = $_GET["name"];
$password = $_GET["password"];
// $name = readline('Nom: ');
// $password = readline('Mot de passe: ');

$cipher_algo = 'AES-256-CBC';
$key = "d5b2e2e30d6e470f3183a524b95ac560c001cd4ed163a32108458b0aec06e687";
$iv_length = openssl_cipher_iv_length($cipher_algo);
$iv = openssl_random_pseudo_bytes($iv_length);
$options = 0;

$cipherText = openssl_encrypt($password, $cipher_algo, $key, $options, $iv);

$users = file_get_contents('../data/users.json');
$users = json_decode($users, true);

if (!array_key_exists($name, $users)) {
    try {
        $toStore = [
            'name' => $name,
            'password' => $cipherText,
            'iv' => base64_encode($iv),
            'cards' => [],
            'boosters' => [5,5,5,5],
            'id' => sizeof($users),
        ];
        if ($users) {
            $users[$name] = $toStore;
        } else {
            $users = [
                $name => $toStore,
            ];
        }

        $users = json_encode($users);
        file_put_contents(__DIR__ . '/../data/users.json', $users);
        echo 1;
    } catch (Exception $e) {
        echo $e;
    }
} else {
    echo 0;
}

?>