// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

const nameInput = document.getElementById("name_input");
const passwordInput = document.getElementById("pw_input");

const loginButton = document.getElementById("login");
const forgotButton = document.getElementById("forgotten_pw");
const googleButton = document.getElementById("google_button");
const createButton = document.getElementById("create_account");


loginButton.addEventListener("click", ()=>{
    let namechecked = nameCheck(nameInput.value);
    let passwordchecked = passwordCheck(passwordInput.value);
    let globalVerification = 0;
    fetch(`https://vps.terrysegaunes.fr/row-backend/src/connexion.php?name=${nameInput.value}&password=${passwordInput.value}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            globalVerification = data;
            if (!namechecked || globalVerification == 0) {
                nameInput.classList.add("error")
            }
            if (!passwordchecked || globalVerification == 0) {
                passwordInput.classList.add("error")
            }
            if (namechecked && passwordchecked && globalVerification == 1) {
                fetch(`https://vps.terrysegaunes.fr/row-backend/src/getUserInfo.php?name=${nameInput.value}`)
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('userID', data.id);
                        localStorage.setItem('username', nameInput.value);
                        if (data.cards == undefined) {
                            localStorage.setItem('myCards', JSON.stringify([]));
                        } else {
                            localStorage.setItem('myCards', JSON.stringify(data.cards));
                        }
                        localStorage.setItem('boosterPoints', JSON.stringify(data.boosters));
                        location.href = "../index.html"
                    });
            }
        })
})

nameInput.addEventListener("input", ()=>{
    nameInput.classList.remove("error")
})

passwordInput.addEventListener("input", ()=>{
    passwordInput.classList.remove("error")
})

function nameCheck(name) {
    if (name == "") {
        return false
    }
    return true;
}

function passwordCheck(password) {
    if (password == "") {
        return false
    }
    return true;
}