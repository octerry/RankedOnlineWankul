<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$ch = curl_init("https://wankul.fr/apps/wankul/api/wankuldex/cards");

curl_exec($ch);

echo json_encode( curl_getinfo($ch) );

?>