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

let forgottenPW = document.getElementById("forgotten_pw")

form.addEventListener('submit', event => {
    event.preventDefault();
    
    let messageError = document.querySelector('.message-error')
    messageError.style.display = 'none'
    messageError.innerHTML = ''
    let verified = 0

    if(name.value == '' || name.value.length < 4) {
        // name error
        name.classList.add('error')
        name.classList.remove('success')
        let li = document.createElement("li");
        li.innerHTML = "Nom trop court"
        messageError.appendChild(li)
        messageError.style.display = "block"
    } else {
        // name success
        name.classList.add('success')
        name.classList.remove('error')
        localStorage.setItem('name', name.value)
        verified++
    }

    if(verified == 1) {
        fetch("https://www.terrysegaunes.com/row-backend/src/login.php?name=" + name.value + "&password=" + password.value)
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
                li.innerHTML = "Erreur lors de la connexion"
                messageError.appendChild(li)
                messageError.style.display = "block"
                console.error(e)
            })
    }
})

forgottenPW.addEventListener('click', ()=>{
    alert("Dommage pour toi ça marche pas")
})