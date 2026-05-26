// Coucou toi qui regarde dans le code
// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

if (!localStorage.getItem("id")) {
    window.location.href = "./connexion/"
} else {
    if (!localStorage.getItem("id") == "-1") {
        fetch("https://terrysegaunes.com/row-backend/src/checkID.php?id=" + localStorage.getItem("id"))
            .then(res=>{
                return res.json();
            })
            .then(message=>{
                if (message != 1) {
                    window.location.href = "./connexion/"
                }
            })
            .catch(e=>{
                window.location.href = "./connexion/"
            })
    }
}