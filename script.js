// Coucou toi qui regarde dans le code
// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

// L'API de Wankul -> https://wankul.fr/apps/proxy/api/wankuldex/cards

let loadingScreen = document.getElementById("loading_screen")
let loadingLineInner = document.getElementById("loading_line_inner")
let loadingPercentage = document.getElementById("loading_percentage")

let allAPI = {}

//On récupère l'API en local pour pas avoir de problème
async function fetchAllAPI(n = 1) {
    loadingScreen.style.opacity = "1"
    loadingScreen.style.pointerEvents = "all"
    try {
        // Récupérer la page actuelle de l'API
        const res = await fetch("https://www.terrysegaunes.com/row-backend/src/getAPIpage.php?page=" + n)
        const data = await res.json()
        let percentage = Math.floor(n / data.meta.totalPages * 100) + "%"
        loadingPercentage.innerText = percentage
        loadingLineInner.style.width = percentage

        // Ne renvoyer que la page actuelle si c'est la dernière
        if (n >= data.meta.totalPages) {
            return data.data
        }

        // Prendre la prochaine page
        const next = await fetchAllAPI(n+1)

        // Lancer tout l'API sur le site
        if (n == 1) {
            startAfterFetch([...data.data, ...next])
            loadingScreen.style.opacity = 0
            loadingScreen.style.pointerEvents = "none"
        }

        // Mettre l'API dans le localstorage pour éviter d'aller le chercher à chaque fois
        localStorage.setItem("all-cards",JSON.stringify([...data.data, ...next]))

        console.log([...data.data, ...next])

        return [...data.data, ...next]
    }catch (e) {
        console.error(e)
    } 
}

function startAfterFetch(data) {
    showCards(data)

    displayMineButton.addEventListener('click', function(){
        onlyDisplayMine = true;
        displayMineButton.classList.add("selected");
        displayAllButton.classList.remove("selected");
        showCards(data)
    })

    displayAllButton.addEventListener('click', function(){
        onlyDisplayMine = false;
        displayAllButton.classList.add("selected");
        displayMineButton.classList.remove("selected");
        showCards(data)
    })
}

function getImageUrl(url) {
    let splitUrl = url.split("/");
    return "./sources/card_images/" + splitUrl[splitUrl.length - 1]
}

let myCards = new Set();
if (localStorage.getItem('myCards')) {
    myCards = JSON.parse(localStorage.getItem('myCards'))
}

// On récupère tous les elements de la page et on défini les élements nécéssaires
// On  prends les deux wankuls
let wankuls = document.getElementsByClassName('wankul');

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

let notificationModal = document.getElementById('notification_modal')
let notificationButton1 = document.getElementById('notification_icon')
let notificationButton2 = document.getElementById('bell_icon')
let notificationCloseButton = document.getElementById('notification_cross')

let singleNotifEmpty = document.getElementById('notification_empty')
let singleNotifRef = document.getElementById('single_notif_ref')
let notificationList = [];

let tradeButton = document.getElementById("trade_button");
let tradeModal = document.getElementById("trade_modal");

let profilPopup = document.getElementById('profil');
let profilButton = document.getElementById('profil_icon');
let profilBackbutton = document.getElementById('backarrow');

let fightButton = document.getElementById('fight_button');
let fightChoices = document.getElementsByClassName('fight_choice')

// Pour les cartes Wankul
let displayAllButton = document.getElementById('tout');
let displayMineButton = document.getElementById('vos_cartes');
let onlyDisplayMine = false

let cardDisplate = document.getElementById('card_displate')
const singleCardRef = document.getElementById('card_ref')
let maxShowedCard = 20;
let cardSearchbar = document.getElementById('card_search')
let cardSortInput = document.getElementById('sort_selection')
let cardSortMethod = "";

// Cheat codes
let cheatCodeInput = document.getElementById('cheat_code_input')
let cheatCodeSubmit = document.getElementById('cheat_code_submit')

// Bouton de déconnexion
let logoutButton = document.getElementById("logout_button")

// Profil
let profilUsername = document.getElementById("username_profil")
let profilTeam = document.getElementById("profil_team")
let profilDescription = document.getElementById("profil_description");
let deckSizeText = document.getElementById("deck_size");
let deckPictures = document.getElementById("deck_pictures");
let searchSizeText = document.getElementById("search_size");
let searchPictures = document.getElementById("search_pictures");

if (localStorage.getItem("all-cards")) {
    allAPI = JSON.parse(localStorage.getItem("all-cards"))
    startAfterFetch(allAPI)
}
else {
    allAPI = fetchAllAPI()
}






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

// Changements sur la page de profil
if (localStorage.getItem('pseudo')) {
    let username = localStorage.getItem('pseudo')
    profilUsername.innerText = username
}

if (localStorage.getItem('team')) {
    let team = localStorage.getItem('team')
    profilTeam.innerText = "[" + team + "]"
}

if (localStorage.getItem('description')) {
    let description = localStorage.getItem('description')
    profilDescription.innerText = description
}

if (localStorage.getItem('myCards')) {
    let myCards = JSON.parse(localStorage.getItem('myCards'))
    deckSizeText.innerText = myCards.length + " cartes"

    myCards.forEach(card => {
        let cardInfo = allAPI[card]
        let cardImageUrl = getImageUrl(cardInfo.imageUrl)
        let cardImageElement = document.createElement("img")

        cardImageElement.src = cardImageUrl;
        deckPictures.append(cardImageElement);
    });
}

if (localStorage.getItem('cards-search')) {
    let cardsSearch = JSON.parse(localStorage.getItem('cards-search'))
    searchSizeText.innerText = cardsSearch.length + " cartes"

    cardsSearch.forEach(card => {
        let cardInfo = allAPI[card]
        let cardImageUrl = getImageUrl(cardInfo.imageUrl)
        let cardImageElement = document.createElement("img")

        cardImageElement.src = cardImageUrl;
        searchPictures.append(cardImageElement);
    });
}

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

// Pour les menus popups
amburgerButton1.addEventListener('click', function () {
    menuPopup.style.display = 'block';
    document.body.style.overflow = 'hidden'
})

amburgerButton2.addEventListener('click', function () {
    menuPopup.style.display = 'none';
    document.body.style.overflow = 'visible';
})

notificationButton1.addEventListener('click', ()=>{
    notificationModal.classList.add("open");
})

notificationButton2.addEventListener('click', ()=>{
    notificationModal.classList.add("open");
})

notificationCloseButton.addEventListener('click', ()=>{
    notificationModal.classList.remove("open");
})

tradeButton.addEventListener('click', ()=>{
    tradeModal.classList.toggle('open');
})

window.addEventListener('click', event => { // Si on clique en dehors du menu ça le ferme
    if(!event.target.matches('#inner_menu') && event.target.matches('#menu_popup')) {
        menuPopup.style.display = 'none';
        document.body.style.overflow = 'visible'
    }

    event.target
    if(!notificationModal.contains(event.target) && !notificationButton1.contains(event.target) && !notificationButton2.contains(event.target)) {
        notificationModal.classList.remove('open');
    }

    if(!tradeModal.contains(event.target) && !tradeButton.contains(event.target)) {
        tradeModal.classList.remove('open');
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

function newNotification(n,accountName,team) {
    // On cache le message de notifications vides
    singleNotifEmpty.style.display = "none";

    // On créé un clone de singleNotif
    const singleNotifClone = singleNotifRef.cloneNode(true);

    // On le rends visible
    singleNotifClone.style.display = "flex"

    // On lui mets les bons parametres
    if (n == 0) {
        singleNotifClone.classList.add("friend")
        singleNotifClone.getElementsByClassName("single-notif-message")[0].innerText = "vous a envoyé une demande d'ami"
    }
    if (n == 1) {
        singleNotifClone.classList.add("trade")
        singleNotifClone.getElementsByClassName("single-notif-message")[0].innerText = "vous a envoyé une demande d'échange"
    }
    if (n == 2) {
        singleNotifClone.classList.add("system")
        singleNotifClone.getElementsByClassName("single-notif-message")[0].innerText = "cliquer ici pour tout mettre à jour"
    }
    
    // On change les textes
    singleNotifClone.getElementsByClassName("single-notif-name")[0].innerText = accountName;
    singleNotifClone.getElementsByClassName("single-notif-team")[0].innerText = "[" + team + "]";

    // On l'accroche au modal
    notificationModal.appendChild(singleNotifClone);
}

function appendNotification() {
    for (let i=0; i<notificationList.length; i++) {
        let notifChoice = notificationList[i].choice;
        let notifName = notificationList[i].name;
        let notifTeam = notificationList[i].team;
        newNotification(notifChoice, notifName , notifTeam)
    }
}

function sortApi(dico, method) {
    const toSort = allAPI;
    switch (method) {
        case "numericOrder": 
            toSort.sort((x, y) => x.id - y.id);
            return toSort;
        case "antiNumericOrder": 
            toSort.sort((x, y) => y.id - x.id);
            return toSort;
        case "mostRare": 
            toSort.sort((x, y) => y.rarity.id - x.rarity.id);
            return toSort;
        case "leastRare": 
            toSort.sort((x, y) => x.rarity.id - y.rarity.id);
            return toSort;
        case "mostRecent": 
            toSort.sort((x, y) => y.set.id - x.set.id);
            return toSort;
        case "leastRecent": 
            toSort.sort((x, y) => x.set.id - y.set.id);
            return toSort;
        case "alphabeticOrder": 
            // Je l'ai piqué à MDN
            toSort.sort((a, b) => {
                const nameA = a.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); // ignorer les majuscules/minuscules
                const nameB = b.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); // ignorer les majuscules/minuscules
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                // les noms sont égaux
                return 0;
            });
            return toSort;
        case "antiAlphabeticOrder": 
            // Je l'ai piqué à MDN
            toSort.sort((a, b) => {
                const nameA = a.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); // ignorer les majuscules/minuscules
                const nameB = b.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); // ignorer les majuscules/minuscules
                if (nameA < nameB) return 1;
                if (nameA > nameB) return -1;
                // les noms sont égaux
                return 0;
            });
            return toSort;
        default: 
            toSort.sort((x, y) => x.id - y.id);
            return toSort;
    }
}

function showCards(dico) {
    cardDisplate.innerHTML = '';
    newDico = sortApi(dico, cardSortMethod);

    if (onlyDisplayMine) {
        let cards = []
        let myCardsTab = Array.from(myCards)
        for (const element of myCardsTab) {
            cards.push(newDico[element])
        }

        let n = maxShowedCard // Nombres de cartes affichées
        if (cards.length < n) {n = cards.length}
        for(let i=1; i<n; i++) {
            let cardName = cards[i].name
            let cardSource = getImageUrl(cards[i].imageUrl)

            // On clone la ref
            const cardClone = singleCardRef.cloneNode(true);
            cardClone.classList.add("showed-card")
            cardClone.getElementsByClassName("image-ref")[0].src = cardSource;
            cardClone.getElementsByClassName("image-ref")[0].alt = cardName
            cardClone.id = "";

            cardDisplate.appendChild(cardClone)
        }
    } else {
        let n = maxShowedCard // Nombres de cartes affichées
        for(let i=1; i<n; i++) {
            let cardName = newDico[i].name
            let cardSource = getImageUrl(newDico[i].imageUrl)

            let newElement = document.createElement(`img`)
            newElement.alt = cardName
            newElement.src = cardSource

            cardDisplate.appendChild(newElement)
        }
    }
}

cardSearchbar.addEventListener("input",()=>{ // Quand quelqu'un recherche une carte
    search = cardSearchbar.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
    if (search == '') {
        showCards(allAPI)
    } else {
        dico = sortApi(allAPI);
        cardDisplate.innerHTML = "";

        if (onlyDisplayMine) {
            let cards = []
            let myCardsTab = Array.from(myCards)
            for (const element of myCardsTab) {
                if (dico[element].normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase().includes(search.toUpperCase())) {
                    cards.push(dico[element])
                }
            }

            let n = maxShowedCard // Nombres de cartes affichées
            if (cards.length < n) {n = cards.length}
            for(let i=1; i<n; i++) {
                let cardName = cards[i].name
                let cardSource = getImageUrl(cards[i].imageUrl)

                let newElement = document.createElement(`img`)
                newElement.alt = cardName
                newElement.src = cardSource

                cardDisplate.appendChild(newElement)
            }
        } else {
            let count = 0
            let n = maxShowedCard // Nombres de cartes affichées
            for(let i=1; i<dico.length; i++) {
                let cardName = dico[i].name
                let cardNameUppercase = cardName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase()

                if (cardNameUppercase.includes(search.toUpperCase())) {
                    let cardSource = getImageUrl(dico[i].imageUrl)

                    let newElement = document.createElement(`img`)
                    newElement.alt = cardName
                    newElement.src = cardSource

                    cardDisplate.appendChild(newElement)
                    count++;
                }

                if (count >= n) break;
            }
        }
    }
})

cardSortInput.addEventListener("input",()=>{
    cardSortMethod = cardSortInput.value;
    showCards(allAPI);
})

logoutButton.addEventListener("click",()=>{
    localStorage.clear()
    window.location.href = "./connexion/"
})

// NOMBRE DE CARTES PAR SAISONS
// S1 - 180
// S2 - 155
// S3 - 180
// S4 - 180
// HS - 67

function setValue(key, value) {
    if (localStorage.getItem('name')) {
        let username = localStorage.getItem('name')
        profilUsername.innerText = username
        fetch(`https://www.terrysegaunes.com/row-backend/src/setUserInfo.php?name=${username}&key=${key}&value=${JSON.stringify(value)}`)
            .then (res=>{return res.json()})
            .then (data=>{
                if (data == 0) {
                    console.error("Erreur lors de la modification de la base de donnée");
                }
            })
    }
}

function getAllUser() {
    if (localStorage.getItem('accounts')) {
        
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
        location.href += "connexion";
    }
    else {
        alert("Ce cheatcode n'exite pas :/");
    }
    cheatCodeInput.value = "";
})