//On récupère tous les elements de la page
let col = document.querySelectorAll('*')
let darkmodeButton = document.getElementById('darkmodeButton')
let isDarkmodeActivate = true

// for (const element of col) {
//     element.classList.add("light")
// }

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