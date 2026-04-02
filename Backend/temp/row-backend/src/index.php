<?php
require '../vendor/autoload.php';

$client = new GuzzleHttp\Client();

try {
    $response = $client->request('GET', 'https://wankul.fr/apps/proxy/api/wankuldex/cards');
    $data = json_decode($response->getBody(), true);

    echo json_encode($data);
} catch(Exception $e) {
    echo "Erreur : " . $e->getMessage();
}

?> 