// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

const nameInput = document.getElementById("name_input");
const passwordInput = document.getElementById("pw_input");
const passwordInput2 = document.getElementById("pw_input2");

const createButton = document.getElementById("create");
const googleButton = document.getElementById("google_button");


createButton.addEventListener("click", ()=>{
    let namechecked = nameCheck(nameInput.value);
    let passwordchecked = passwordCheck(passwordInput.value);
    let passwordchecked2 = passwordCheck2(passwordInput.value, passwordInput2.value);
    if (!namechecked) {
        nameInput.classList.add("error")
    }
    if (!passwordchecked) {
        passwordInput.classList.add("error")
    }
    if (!passwordchecked2) {
        passwordInput2.classList.add("error")
    }
    if (namechecked && passwordchecked && passwordchecked2) {
        fetch(`https://vps.terrysegaunes.fr/row-backend/src/createAccount.php?name=${nameInput.value}&password=${passwordInput.value}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data == 0) {
                    nameInput.classList.add("error")
                }
                if (data == 1) {
                    fetch(`https://vps.terrysegaunes.fr/row-backend/src/getUserInfo.php?name=${nameInput.value}`)
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
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
    }
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

function passwordCheck2(pw1, pw2) {
    return pw2 && pw1==pw2;
}