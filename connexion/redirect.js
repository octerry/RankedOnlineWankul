// Coucou toi qui regarde dans le code
// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

if (localStorage.getItem("id")) {
    if (localStorage.getItem("id") == "-1") window.location.href = "../home.html"
    else {
        fetch("https://terrysegaunes.com/row-backend/src/checkID.php?id=" + localStorage.getItem("id"))
            .then(res=>{
                return res.json();
            })
            .then(message=>{
                if (message == 1) window.location.href = "../home.html"
            })
            .catch(e=>{
                console.log(e)
            })
    }
}