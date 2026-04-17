<?php

$pdo = new PDO('mysql:host=vps.terrysegaunes.fr;dbname=users','admin','@dm1n');

$result = $pdo->query('SELECT * FROM users WHERE 1');

?>