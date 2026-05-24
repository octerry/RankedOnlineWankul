<!-- Coucou toi qui regarde dans le code
/‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
| |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
| | | | | |        |  |    |  ___] |     / |     / |  _/
| |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
\_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
MADE ON EARTH BY HUMANS
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../sources/banana_fruit_food_icon.ico">
    <title>Connectez vous</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="createAccount.js"></script>
</head>
<body>
    <main>
        <img src="../sources/Logo.svg" id="row_logo" alt="logo">
        <h1>Ranked Online Wankul</h1>
        <h1>Créer un compte</h1>
        <form action="../Backend/src/sigin.php" method="POST">
            <input type="name" placeholder="Nom" id="name_input" name="name">
            <input type="password" placeholder="Mot de passe" id="pw_input" name="password">
            <input type="password" placeholder="Retapez votre mot de passe" id="pw_input2" name="password2">
            <button id="create" style="submit">
                <h2>Créer un compte</h2>
            </button>
        </form>
        <h1>ou</h1>
        <div id="google_button">
            <img src="../sources/googleLogo.svg" id="google_logo" alt="logoGoogle">
            <h3>Se connecter avec Google</h3> 
        </div>
        <a href="index.php" style="text-decoration:none;">
            <h2 id="login_account">Se connecter</h2>
        </a>
    </main>
    <footer>
        <p>Tous les droits reviennent à <a href="https://wankul.fr" class="underline">wankul.fr</a> et <a href="https://www.youtube.com/channel/UCYGjxo5ifuhnmvhPvCc3DJQ" class="underline">wankilstudio</a></p>
        <p>Projet étudiant non-lucratif créé et codé par Terry Segaunes</p>
        <p><a href="https://github.com/octerry" class="underline">github</a> - <a href="https://terrysegaunes.fr" class="underline">site internet</a> - <a href="mailto:segaunesterry@gmail.com" class="underline">email</a></p>
    </footer>
</body>
</html>