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

    if (!namechecked) {
        nameInput.classList.add("error")
    }
    if (!passwordchecked) {
        passwordInput.classList.add("error")
    }
    if (namechecked && passwordchecked) {
        localStorage.setItem('userID', JSON.stringify(0));
        location.href = "../index.html"
    }
})

nameInput.addEventListener("input", ()=>{
    nameInput.classList.remove("error")
})

passwordInput.addEventListener("input", ()=>{
    passwordInput.classList.remove("error")
})

createButton.addEventListener("click", ()=>{
    alert("Pour l'instant il n'y a pas de systeme de compte, cliquez juste sur le bouton Se Connecter")
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