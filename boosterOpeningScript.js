// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS
//DEFINITION DES VARIABLES AUQUEL ON AURA BESOIN
const seasons = ['Aleatoire','1 ORIGINS','2 CAMPUS','3 BATTLE','4 STELLAR']
let cursor = 0
let boosters = document.getElementsByClassName('booster_img')

for (i=0; i<boosters.length; i++) {
    boosters[i].addEventListener('mouseover',function () {
        console.log(seasons[5-i])
        console.log(boosters[i])
    })
}