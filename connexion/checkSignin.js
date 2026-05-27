// Coucou toi qui regarde dans le code
// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

let form = document.querySelector('form')
let name = document.getElementById('name_input')
let password = document.getElementById('pw_input')
let password2 = document.getElementById('pw_input2')

let messageError = document.getElementById("message-error")

form.addEventListener('submit', event => {
    event.preventDefault();
    
    let verified = 0;
    let messageError = document.querySelector('.message-error')
    messageError.style.display = 'none'
    messageError.innerHTML = ''

    let passCheck = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
    )

    if(name.value == '' || name.value.length < 4 || name.value.length > 30) {
        // name error
        name.classList.add('error')
        name.classList.remove('success')
        let li = document.createElement("li");
        li.innerHTML = "Longueur du nom invalide"
        messageError.appendChild(li)
        messageError.style.display = "block"
    } else {
        // name success
        name.classList.add('success')
        name.classList.remove('error')
        localStorage.setItem('name', name.value)
        verified++
    }

    if(password.value.length < 8) {
        // password length error
        password.classList.add('error')
        password.classList.remove('success')
        let li = document.createElement("li");
        li.innerHTML = "Mot de passe trop court"
        messageError.appendChild(li)
        messageError.style.display = "block"
    } else if (passCheck.test(password.value) == false) {
        // password error
        password.classList.add('error')
        password.classList.remove('success')
        let li = document.createElement("li");
        li.innerHTML = "Votre mot de passe doit contenir une lettre majuscule, une lettre minuscule et un chiffre"
        messageError.appendChild(li)
        messageError.style.display = "block"
    } else {
        // password success
        password.classList.add('success')
        password.classList.remove('error')
        verified++
    }

    if(password2.value.length == 0 || password.value != password2.value) {
        // password2 error
        password2.classList.add('error')
        password2.classList.remove('success')
        let li = document.createElement("li");
        li.innerHTML = "Le second mot de passe ne correspond pas au premier"
        messageError.appendChild(li)
        messageError.style.display = "block"
    } else {
        // password2 success
        password2.classList.add('success')
        password2.classList.remove('error')
        verified++
    }

    if(verified == 3) {
        try {
            fetch("https://www.terrysegaunes.com/row-backend/src/signinCheck.php?name=" + name.value + "&password=" + password.value)
                .then(res=>{
                    return res.json();
                })
                .then(message=>{
                    if (message[0] == 1) {
                        localStorage.setItem("id",message[1]);
                        window.location.href = "../home.html";
                    } else {
                        let li = document.createElement("li");
                        li.innerHTML = message[1];
                        messageError.appendChild(li)
                        messageError.style.display = "block"
                    }
                })
                .catch(e=>{
                    let li = document.createElement("li");
                    li.innerHTML = "Erreur côté serveur";
                    messageError.appendChild(li)
                    messageError.style.display = "block"
                    console.log(e)
                })
        }
        catch(e) {
            let li = document.createElement("li");
            li.innerHTML = "Erreur côté serveur :/";
            messageError.appendChild(li)
            messageError.style.display = "block"
            console.log(e)
        }
    }
})