<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$page = trim($_GET["page"]);


$ch = curl_init("https://wankul.fr/apps/wankul/api/wankuldex/cards?page=" . $page . "&limit=20");

curl_exec($ch);

?>