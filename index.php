<!-- Coucou toi qui regarde dans le code
/‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
| |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
| | | | | |        |  |    |  ___] |     / |     / |  _/
| |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
\_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
MADE ON EARTH BY HUMANS
-->
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php 
    
        session_start();
        if ($_SESSION["id"] == "") header("Location: ./connexion/");
        else {
            $id = $_SESSION["id"];
            header("Location: home.php");
        }

    ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="Ranked Online Wankul">
    <meta property="og:description" content="Collection et combat de cartes Wankul en ligne multijoueur">
    
    <link rel="icon" type="image/x-icon" href="sources/banana_fruit_food_icon.ico">
    <title>ROW : Wankul en ligne</title>
</head>
<body>
    <h1>Vous allez être redirigé vers la page de connexion</h1>
</body>
</html>