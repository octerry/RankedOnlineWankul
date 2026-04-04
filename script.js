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

//On récupère l'API en local pour pas avoir de problème
let displayAllButton = document.getElementById('tout');
let displayMineButton = document.getElementById('vos_cartes');
let onlyDisplayMine = true

let userID = null;
if (localStorage.getItem('userID')) {
    userID = JSON.parse(localStorage.getItem('userID'))
} else {
    location.href.replace("index.html", "connexion");
}

fetch("https://vps.terrysegaunes.fr/row-backend/src/getAPI.php") // Adresse de mon VPS personnel :)
    .then(response => {
        return response.json();
    })
    .then(data => {
        showCards(data)

        displayMineButton.addEventListener('click', function(){
            onlyDisplayMine = true;
            displayMineButton.style.fontWeight = "500";
            displayAllButton.style.fontWeight = "200";
            showCards(data)
        })

        displayAllButton.addEventListener('click', function(){
            onlyDisplayMine = false;
            displayMineButton.style.fontWeight = "500";
            displayAllButton.style.fontWeight = "200";
            showCards(data)
        })
    })
    .catch((e) => console.error(e));

let myCards = new Set();
if (localStorage.getItem('myCards')) {
    myCards = JSON.parse(localStorage.getItem('myCards'))
}

//On  prends les deux wankuls
let wankuls = document.getElementsByClassName('wankul');

//On récupère tous les elements de la page et on défini les élements nécéssaires
// Pour le darkmode
let col = document.querySelectorAll('*');
let darkmodeButton = document.getElementById('darkmodeButton');
let isDarkmodeActivate = true;
if (localStorage.getItem('dark')) {isDarkmodeActivate = localStorage.getItem('dark')} // On défini le darkmode comme l'utilisateur l'avait demandé
else (isDarkmodeActivate = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) // Et si il est jamais venu on lui donne son état de navigateur

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

// Pour les cartes Wankul
let cardDisplate = document.getElementById('card_displate')

// Cheat codes
let cheatCodeInput = document.getElementById('cheat_code_input')
let cheatCodeSubmit = document.getElementById('cheat_code_submit')


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
    localStorage.setItem('dark',isDarkmodeActivate)
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

window.addEventListener('click', event => { // Si on clique en dehors du menu ça le ferme
    if(!event.target.matches('#inner_menu') && event.target.matches('#menu_popup')) {
        menuPopup.style.display = 'none';
        document.body.style.overflow = 'visible'
    }

    if(!event.target.matches('.fight_choice') && !event.target.matches('h2')) {
        if(fightChoices[0].style.animation.includes("choiceAppear")) {
            for (const element of fightChoices) {
                element.style.animation = "disappear .5s"
            }
        }
    }
})

profilButton.addEventListener('click', openProfilPopup) // En appuyant sur le profil

profilBackbutton.addEventListener('click', openProfilPopup) // En appuyant sur le bouton pour fermer le profil

function openProfilPopup () { // Ouverture de la page de profil
    profilPopup.classList.toggle('open')
}

fightButton.addEventListener('click', function(){ // Bouton "rentrer dans l'arene"
    for (const element of fightChoices) {
        element.style.animation = "choiceAppear 1s"
        element.style.animationFillMode = "forwards"
    }
    fightChoices[1].style.animationDelay = ".2s"
    fightChoices[2].style.animationDelay = ".4s"
})

function showCards(dico) {
    cardDisplate.innerHTML = "";

    if (onlyDisplayMine) {
        let cards = []
        let myCardsTab = Array.from(myCards)
        for (const element of myCardsTab) {
            cards.push(dico.cards[element])
        }

        let n = 120 // Nombres de cartes affichées
        if (cards.length < n) {n = cards.length}
        for(let i=1; i<n; i++) {
            let cardName = cards[i].title
            let cardSource = cards[i].image

            let newElement = document.createElement(`img`)
            newElement.alt = cardName
            newElement.src = cardSource

            cardDisplate.appendChild(newElement)
        }
    } else {
        let n = 120 // Nombres de cartes affichées
        for(let i=1; i<n; i++) {
            let cardName = dico.cards[i].title
            let cardSource = dico.cards[i].image

            let newElement = document.createElement(`img`)
            newElement.alt = cardName
            newElement.src = cardSource

            cardDisplate.appendChild(newElement)
        }
    }
}

// NOMBRE DE CARTES PAR SAISONS
// S1 - 180
// S2 - 155
// S3 - 180
// S4 - 180
// HS - 67

function setValue(key, value) {
    if (localStorage.getItem('username')) {
        let username = localStorage.getItem('username')
        console.log("user : " + username);
        fetch(`https://vps.terrysegaunes.fr/row-backend/src/setUserInfo.php?name=${username}&key=${key}&value=${JSON.stringify(value)}`)
            .then (res=>{return res.json()})
            .then (data=>{
                if (data == 0) {
                    console.error("Erreur lors de la modification de la base de donnée");
                }
            })
    }
}

cheatCodeSubmit.addEventListener('click', function() {
    if (cheatCodeInput.value == "ToutPourLe20") {
        let boosterPoints = [10,10,10,10];
        if(localStorage.getItem('boosterPoints')) {boosterPoints = JSON.parse(localStorage.getItem('boosterPoints'))}
        for (let i=0; i<4; i++) {
            boosterPoints[i] += 200;
        }
        localStorage.setItem('boosterPoints', JSON.stringify(boosterPoints));
        setValue("boosters",boosterPoints);

        alert("200 Boosters de chaque catégorie vous ont été ajouté !");
    } else if (cheatCodeInput.value == "MyBoosterIsKindaCardless") {
        let boosterPoints = [0,0,0,0];
        if(localStorage.getItem('boosterPoints')) {boosterPoints = JSON.parse(localStorage.getItem('boosterPoints'))}
        for (let i=0; i<4; i++) {
            boosterPoints[i] = 0;
        }
        localStorage.setItem('boosterPoints', JSON.stringify(boosterPoints));
        setValue("boosters",boosterPoints);

        alert("Tous vos boosters ont été retirés");
    } else if (cheatCodeInput.value == "SpiderManNoWayHome") {
        localStorage.removeItem('userID');
        alert("Vous avez être déconnecté de votre compte");
        location.href = "/connexion"
    }
    else {
        alert("Ce cheatcode n'exite pas :/");
    }
    cheatCodeInput.value = "";
})