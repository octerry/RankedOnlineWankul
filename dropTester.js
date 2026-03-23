function rarityChoser() {
    let final = [];
    let sorting = [];

    for (let i=0; i<9; i++) {
        let chosen = Math.floor(Math.random() *9000)

        if (chosen >= 4500) {
            final.push("Commune")
            sorting.push(0)
        } else if (chosen >= 1500) {
            final.push("Peu Commune")
            sorting.push(1)
        } else if (chosen >= 500) {
            final.push("Rare")
            sorting.push(2)
        } else if (chosen >= 276) {
            final.push("Ultra rare holo 1")
            sorting.push(3)
        } else if (chosen >= 116) {
            final.push("Ultra rare holo 2")
            sorting.push(4)
        } else if (chosen >= 36) {
            final.push("Légendaire Bronze")
            sorting.push(5)
        } else if (chosen >= 8) {
            final.push("Légendaire Argent")
            sorting.push(6)
        } else {
            final.push("Légendaire Or")
            sorting.push(7)
        }
    }

    const result = sorting // Tri de final selon sorting
        .map((sorting, i) => [sorting, final[i]])
        .sort((a, b) => a[0] - b[0])
        .map(pair => pair[1]);
    
        return result;
}

let occurences = 1000;
let stats = [0,0,0,0,0,0,0]

for (let i=0; i<occurences; i++) {
    let truc = rarityChoser();

    for (const element of truc) {
        if (element === "Commune") {
            truc[0]++;
        } else if (element === "Peu Commune") {
            truc[1]++;
        } else if (element === "Rare") {
            truc[2]++;
        } else if (element === "Ultra rare holo 1") {
            truc[3]++;
        } else if (element === "Ultra rare holo 2") {
            truc[4]++;
        } else if (element === "Ultra rare holo 1") {
            truc[3]++;
        } else if (element === "Ultra rare holo 1") {
            truc[3]++;
        } else (element === "Ultra rare holo 1") {
            truc[3]++;
        }
    }
}