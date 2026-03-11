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

for (const booster of boosters) {
    booster.style.transform = "scale(.8)"
}

window.addEventListener('onload', updateBoosters)
boosterOpening.addEventListener('scroll', updateBoosters)

function updateBoosters () {
    console.log(boosterOpening.scrollTop/window.innerHeight)
    if ((boosterOpening.scrollTop/window.innerHeight) < .4) {
        seasonTitle.innerHTML = "Saison Aléatoire"
        boosters[0].style.transform = ""
        boosters[1].style.transform = "scale(.8)"
        boosterBackground.style.backgroundColor = 'currentColor'
    } else {
        if ((boosterOpening.scrollTop/window.innerHeight) < .9) {
            boosters[0].style.transform = "scale(.8)"    
            boosters[1].style.transform = ""  
            boosters[2].style.transform = "scale(.8)"    
            seasonTitle.innerHTML = "Saison 1 ORIGINS"
            boosterBackground.style.backgroundColor = '#183272'
        } else {
            if ((boosterOpening.scrollTop/window.innerHeight) < 1.4) {
                boosters[1].style.transform = "scale(.8)"    
                boosters[2].style.transform = ""  
                boosters[3].style.transform = "scale(.8)"    
                seasonTitle.innerHTML = "Saison 2 CAMPUS"
                boosterBackground.style.backgroundColor = '#2e6428ff'
            } else {
                if ((boosterOpening.scrollTop/window.innerHeight) < 1.8) {
                    boosters[2].style.transform = "scale(.8)"    
                    boosters[3].style.transform = ""  
                    boosters[4].style.transform = "scale(.8)"    
                    seasonTitle.innerHTML = "Saison 3 BATTLE"
                    boosterBackground.style.backgroundColor = '#791e1e'
                } else {
                    boosters[3].style.transform = "scale(.8)"    
                    boosters[4].style.transform = ""  
                    seasonTitle.innerHTML = "Saison 4 STELLAR"
                    boosterBackground.style.backgroundColor = '#4c2579ff'
                }
            }
        }
    }
}