//On récupère tous les elements de la page
let col = document.querySelectorAll('*')

console.log(col)

for (const element of col) {
    element.classList.add("light")
}