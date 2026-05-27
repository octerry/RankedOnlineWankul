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
    if (localStorage.getItem("id") != "-1") {
        console.log("ouais ?")
        fetch("https://terrysegaunes.com/row-backend/src/checkID.php?id=" + localStorage.getItem("id"))
            .then(res=>{
                return res.json();
            })
            .then(message=>{
                if (message != 1) {
                    window.location.href = "./connexion/"
                } else {
                    setAllDataToLocal();
                }
            })
            .catch(e=>{
                window.location.href = "./connexion/"
            })
    }
}

function setAllDataToLocal() {
    fetch("https://terrysegaunes.com/row-backend/src/getUserInfo.php?id=" + localStorage.getItem("id"))
        .then(res=>{return res.json()})
        .then(message=>{
            if (message[0]) console.log(message[1]);
            else {
                console.log("UserInfo : " , message[1])
            }
        })
        .catch(e=>{console.log(e)})
}