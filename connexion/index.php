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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../sources/banana_fruit_food_icon.ico">
    <title>Connectez vous</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="script.js"></script>
</head>
<body>
    <?php 
    
    if ($_SESSION["id"] != "") header("Location: ../home.php")

    ?>
    <main>
        <img src="../sources/Logo.svg" id="row_logo" alt="logo">
        <h1>Ranked Online Wankul</h1>
        <form action="../Backend/src/login.php" method="POST">
            <input type="name" name="name" placeholder="Nom" id="name_input">
            <input type="password" name="password" placeholder="Mot de passe" id="pw_input">
            <button style="submit" id="login">
                <h2>Se connecter</h2>
            </button>
        </form>
        <h2 id="forgotten_pw">j'ai oublié mon mot de passe</h2>
        <h1>ou</h1>
        <div id="google_button">
            <img src="../sources/googleLogo.svg" id="google_logo" alt="logoGoogle">
            <h3>Se connecter avec Google</h3> 
        </div>
        <a href="create-account-page.php" style="text-decoration:none;">
            <h2 id="create_account">Créer un compte</h2>
        </a>
    </main>
    <footer>
        <p>Tous les droits reviennent à <a href="https://wankul.fr" class="underline">wankul.fr</a> et <a href="https://www.youtube.com/channel/UCYGjxo5ifuhnmvhPvCc3DJQ" class="underline">wankilstudio</a></p>
        <p>Projet étudiant non-lucratif créé et codé par Terry Segaunes</p>
        <p><a href="https://github.com/octerry" class="underline">github</a> - <a href="https://terrysegaunes.fr" class="underline">site internet</a> - <a href="mailto:segaunesterry@gmail.com" class="underline">email</a></p>
    </footer>
</body>
</html>