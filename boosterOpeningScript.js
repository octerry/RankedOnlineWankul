// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS
//DEFINITION DES VARIABLES AUQUEL ON AURA BESOIN
let boosters = document.getElementsByClassName('booster_img')
let boosterOpening = document.getElementById('booster_opening')
let seasonTitle = document.getElementById('season_title')
let boosterBackground = document.getElementById('booster_bg')

boosterOpening.addEventListener('scroll', function () {
    console.log(boosterOpening.scrollTop/window.innerHeight)
    if ((boosterOpening.scrollTop/window.innerHeight) < .4) {
        seasonTitle.innerHTML = "Saison Aléatoire"
        boosterBackground.style.backgroundColor = 'currentColor'
    } else {
        if ((boosterOpening.scrollTop/window.innerHeight) < .9) {
            seasonTitle.innerHTML = "Saison 1 ORIGINS"
            boosterBackground.style.backgroundColor = '#183272'
        } else {
            if ((boosterOpening.scrollTop/window.innerHeight) < 1.4) {
                seasonTitle.innerHTML = "Saison 2 CAMPUS"
                boosterBackground.style.backgroundColor = '#2e6428ff'
            } else {
                if ((boosterOpening.scrollTop/window.innerHeight) < 1.8) {
                    seasonTitle.innerHTML = "Saison 3 BATTLE"
                    boosterBackground.style.backgroundColor = '#791e1e'
                } else {
                    seasonTitle.innerHTML = "Saison 4 STELLAR"
                    boosterBackground.style.backgroundColor = '#4c2579ff'
                }
            }
        }
    }
})