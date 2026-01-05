//On récupère tous les elements de la page et on défini les élements nécéssaires
// Pour le darkmode
let col = document.querySelectorAll('*')
let darkmodeButton = document.getElementById('darkmodeButton')
let isDarkmodeActivate = true

// Pour les tabs
let homeButton = document.getElementById('home_button')
let deckButton = document.getElementById('deck_button')
let friendsButton = document.getElementById('friends_button')

let homeSection = document.getElementById('section_home')
let deckSection = document.getElementById('section_carte')
let friendsSection = document.getElementById('section_friends')

// Pour le menu popup
let menuPopup = document.getElementById('menu_popup')
let amburgerButton1 = document.getElementById('amburger1')
let amburgerButton2 = document.getElementById('amburger2')


//DEBUT DU CODE
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
    homeSection.style.display = 'block'
    deckSection.style.display = 'none'
    friendsSection.style.display = 'none'
})

deckButton.addEventListener('click', function () {
    homeSection.style.display = 'none'
    deckSection.style.display = 'flex'
    friendsSection.style.display = 'none'
})

friendsButton.addEventListener('click', function () {
    homeSection.style.display = 'none'
    deckSection.style.display = 'none'
    friendsSection.style.display = 'block'
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
}