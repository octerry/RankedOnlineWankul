<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $url = $_GET["url"];

    $imageData = file_get_contents("https://wankul.fr" . $url);
    $base64 = base64_encode($imageData);

    echo '<img src="data:image/jpeg;base64,<?= $base64; ?>" />'
?>
