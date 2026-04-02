<?php
require '../vendor/autoload.php';

$client = new GuzzleHttp\Client();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Gérer les requêtes preflight (important)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $response = $client->request('GET', 'https://wankul.fr/apps/proxy/api/wankuldex/cards');
    $data = json_decode($response->getBody(), true);

    echo json_encode($data);
} catch(Exception $e) {
    echo "Erreur : " . $e->getMessage();
}

?> 