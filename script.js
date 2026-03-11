// Coucou toi qui regarde dans le code
// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

// L'API de Wankul -> https://wankul.fr/apps/proxy/api/wankuldex/cards
//
//fetch("https://wankul.fr/apps/proxy/api/wankuldex/cards")
//   .then(response => console.log(response))
//   .catch(error => console.error(error))
//
// console renvoie : CORS

//On  prends les deux wankuls
let wankuls = document.getElementsByClassName('wankul');

//On récupère tous les elements de la page et on défini les élements nécéssaires
// Pour le darkmode
let col = document.querySelectorAll('*');
let darkmodeButton = document.getElementById('darkmodeButton');
let isDarkmodeActivate = true;

// Pour les tabs
let homeButton = document.getElementById('home_button');
let deckButton = document.getElementById('deck_button');
let friendsButton = document.getElementById('friends_button');

let indexMenu = document.getElementById('index_main');

let homeSection = document.getElementById('section_home');
let deckSection = document.getElementById('section_carte');
let friendsSection = document.getElementById('section_friends');

// Pour les menu popup
let menuPopup = document.getElementById('menu_popup');
let amburgerButton1 = document.getElementById('amburger1');
let amburgerButton2 = document.getElementById('amburger2');

let profilPopup = document.getElementById('profil');
let profilButton = document.getElementById('profil_icon');
let profilBackbutton = document.getElementById('backarrow');

let fightButton = document.getElementById('fight_button');
let fightChoices = document.getElementsByClassName('fight_choice')

//DEBUT DU CODE
// Pour les wankuls aleatoires
let chosen = Math.floor(Math.random() * 21) + 1
wankuls[0].src = "sources/wankul" + chosen + ".png" 
let chosen2 = Math.floor(Math.random() * 21) + 1
if (chosen === chosen2) {
    if(chosen2 === 21) {chosen2--}
    else {chosen2++}
}
wankuls[1].src = "sources/wankul" + chosen2 + ".png"

// Pour le darkmode
darkmodeButton.addEventListener('click', function () {
    if (isDarkmodeActivate) {
        for (const element of col) {
            element.classList.add("light")
            isDarkmodeActivate = false
        }
    } else {
        for (const element of col) {
            element.classList.remove("light")
            isDarkmodeActivate = true
        }
    }
})

// Pour les tabs
homeButton.addEventListener('click', function () {
    if (indexMenu) {
        indexMenu.scrollTo({
            left: 0,
            behavior: "smooth",
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
})

deckButton.addEventListener('click', function () {
    if (indexMenu) {
        indexMenu.scrollTo({
            left: window.innerWidth,
            behavior: "smooth",
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
})

friendsButton.addEventListener('click', function () {
    if (indexMenu) {
        indexMenu.scrollTo({
            left: window.innerWidth*2,
            behavior: "smooth",
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
})

// Pour le menu popup
amburgerButton1.addEventListener('click', function () {
    menuPopup.style.display = 'block';
    document.body.style.overflow = 'hidden'
})

amburgerButton2.addEventListener('click', function () {
    menuPopup.style.display = 'none';
    document.body.style.overflow = 'visible';
})

window.onclick = (event) => { // Si on clique en dehors du menu ça le ferme
    if(!event.target.matches('#inner_menu') && event.target.matches('#menu_popup')) {
        menuPopup.style.display = 'none';
        document.body.style.overflow = 'visible'
    }

    if(!event.target.matches('.fight_choice') && !event.target.matches('h2')) {
        console.log(fightChoices[0].style.animation)
        if(fightChoices[0].style.animation.includes("choiceAppear")) {
            for (const element of fightChoices) {
                element.style.animation = "disappear .5s"
            }
        }
    }
}

profilButton.addEventListener('click', openProfilPopup) // En appuyant sur le profil

profilBackbutton.addEventListener('click', openProfilPopup) // En appuyant sur le bouton pour fermer le profil

function openProfilPopup () { // Ouverture de la page de profil
    profilPopup.classList.toggle('open')
    console.log(profilPopup.classList)
}

fightButton.addEventListener('click', function(){ // Bouton "rentrer dans l'arene"
    for (const element of fightChoices) {
        element.style.animation = "choiceAppear 1s"
        element.style.animationFillMode = "forwards"
    }
    fightChoices[1].style.animationDelay = ".2s"
    fightChoices[2].style.animationDelay = ".4s"
})

