// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ |‾| /‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     | | |/ /
// | | | | | |        |  |    |  ___] |     / |     / |  _/
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \  | |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\ |_|
// MADE ON EARTH BY HUMANS

document.addEventListener("DOMContentLoaded", (event) => { // Quand la librairie GSAP a chargée
    gsap.registerPlugin(ScrollTrigger)
    let root = document.documentElement
    let seasonTitle = document.getElementById('season_title')
    let boosterBackground = document.getElementById('booster_bg')
    let openButton = document.getElementById('open_button')
    let backButton = document.getElementById('back_button')
    let boosterPointsOutputs = document.getElementById('booster_points').children
    let boosterPoints = [10,10,10,10]
    let chosenCards = Array()
    if (localStorage.getItem('boosterPoints')) {
        boosterPoints = JSON.parse(localStorage.getItem('boosterPoints'))
        console.log(boosterPoints)
        for (let i=0; i<4; i++) {
            boosterPointsOutputs[i].innerHTML = boosterPoints[i];
        }
    };
    let selected = 0
    let myCards = []
    if (localStorage.getItem('myCards')) {
        myCards = Array.from ( JSON.parse(localStorage.getItem('myCards')) )
    }

    gsap.registerPlugin(ScrollTrigger, Draggable);

    let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

    // set initial state of items
    gsap.set('.cards li', {xPercent: 400, opacity: 0, scale: 0});

    const spacing = 0.1, // spacing of the cards (stagger)
        snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop
        cards = gsap.utils.toArray('.cards li'),
        // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
        animateFunc = element => {
            const tl = gsap.timeline();
            tl.fromTo(element, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false})
            .fromTo(element, {xPercent: 400}, {xPercent: -400, duration: 1, ease: "none", immediateRender: false}, 0);
            return tl;
        },
        seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
        playhead = {offset: 0}, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
        wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
        scrub = gsap.to(playhead, { // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
            offset: 0,
            onUpdate() {
                seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
            },
            duration: .6,
            ease: "power3",
            paused: true
        }),
        trigger = ScrollTrigger.create({
            start: 0,
            onUpdate(self) {
                let scroll = self.scroll();
                if (scroll > self.end - 1) {
                    wrap(1, 2);
                } else if (scroll < 1 && self.direction < 0) {
                    wrap(-1, self.end - 2);
                } else {
                    scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
                    scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
                }

                changeBg(scroll)
            },
            end: "+=3000",
            pin: ".gallery"
        }),
        // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
        // (pour résumé le texte au dessus) c'est ici qui s'occupe de faire un truc continue au lieu d'avoir une limite
        progressToScroll = progress => gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end),
        wrap = (iterationDelta, scrollTo) => { 
            iteration += iterationDelta;
            trigger.scroll(scrollTo);
            trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
        };

    // when the user stops scrolling, snap to the closest item.
    ScrollTrigger.addEventListener("scrollEnd", () => scrollToOffset(scrub.vars.offset));


    // feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
    function scrollToOffset(offset) { // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
        
        let snappedTime = snapTime(offset),
            progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration(),
            scroll = progressToScroll(progress);
        if (progress >= 1 || progress < 0) {
            return wrap(Math.floor(progress), scroll);
        }
        trigger.scroll(scroll);
    }

    document.querySelector(".next").addEventListener("click", () => scrollToOffset(scrub.vars.offset + spacing));
    document.querySelector(".prev").addEventListener("click", () => scrollToOffset(scrub.vars.offset - spacing));


    // below is the dragging functionality (mobile-friendly too)...
    Draggable.create(".drag-proxy", {
    type: "x",
    trigger: ".cards",
    onPress() {
        this.startOffset = scrub.vars.offset;
    },
    onDrag() {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
    },
    onDragEnd() {
        scrollToOffset(scrub.vars.offset);
    }
    });

    function changeBg(scroll) {
        // CHANGEMENT DES FONDS SELON LA CARTE AU MILIEU DE L'ECRAN
        newScroll = parseInt(String(scroll).slice(-3))
        if(newScroll<200) {
            boosterBackground.style.backgroundColor = 'currentColor'
            seasonTitle.innerHTML = "Saison Aleatoire"
            openButton.innerHTML = "Ouvrir un booster aléatoire"
            for (const element of boosterPointsOutputs) {
                element.style.display = "block";
            }
            selected = 0
        }
        if(newScroll === 200) {
            seasonTitle.innerHTML = "Saison 1 ORIGINS"
            boosterBackground.style.backgroundColor = '#183272'
            openButton.innerHTML = "Ouvrir un booster saison 1"
            for (const element of boosterPointsOutputs) {
                element.style.display = "none";
            }
            boosterPointsOutputs[0].style.display = "block";
            selected = 1
        }
        if(newScroll === 400) {
            seasonTitle.innerHTML = "Saison 2 CAMPUS"
            boosterBackground.style.backgroundColor = '#2e6428ff'
            openButton.innerHTML = "Ouvrir un booster saison 2"
            for (const element of boosterPointsOutputs) {
                element.style.display = "none";
            }
            boosterPointsOutputs[1].style.display = "block";
            selected = 2
        }
        if(newScroll === 600) {
            seasonTitle.innerHTML = "Saison 3 BATTLE"
            boosterBackground.style.backgroundColor = '#791e1e'
            openButton.innerHTML = "Ouvrir un booster saison 3"
            for (const element of boosterPointsOutputs) {
                element.style.display = "none";
            }
            boosterPointsOutputs[2].style.display = "block";
            selected = 3
        }
        if(newScroll === 800) {
            seasonTitle.innerHTML = "Saison 4 STELLAR"
            boosterBackground.style.backgroundColor = '#4c2579ff'
            openButton.innerHTML = "Ouvrir un booster saison 4"
            for (const element of boosterPointsOutputs) {
                element.style.display = "none";
            }
            boosterPointsOutputs[3].style.display = "block";
            selected = 4
        }
    }

    function buildSeamlessLoop(items, spacing, animateFunc) {
        let overlap = Math.ceil(1 / spacing), // number of EXTRA animations on either side of the start/end to accommodate the seamless looping
            startTime = items.length * spacing + 0.5, // the time on the rawSequence at which we'll start the seamless loop
            loopTime = (items.length + overlap) * spacing + 1, // the spot at the end where we loop back to the startTime
            rawSequence = gsap.timeline({paused: true}), // this is where all the "real" animations live
            seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
                paused: true,
                repeat: -1, // to accommodate infinite scrolling/looping
                onRepeat() { // works around a super rare edge case bug that's fixed GSAP 3.6.1
                    this._time === this._dur && (this._tTime += this._dur - 0.01);
                }
            }),
            l = items.length + overlap * 2,
            time, i, index;

        // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
        for (i = 0; i < l; i++) {
            index = i % items.length;
            time = i * spacing;
            rawSequence.add(animateFunc(items[index]), time);
            i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go.
        }

        // here's where we set up the scrubbing of the playhead to make it appear seamless.
        rawSequence.time(startTime);
        seamlessLoop.to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none"
        }).fromTo(rawSequence, {time: overlap * spacing + 1}, {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none"
        });
        return seamlessLoop;
    }

    openButton.addEventListener("click", function(){
        let boosterOpening = document.querySelector('#booster_opening')
        let boosterAnimation = document.getElementById('booster_animation')
        let booster = document.querySelector('.booster')
        let quickOpeningButton = document.getElementById('quick_opening_button')
        let swiperSwaper = document.querySelector('.swiper-wrapper')
        let cardReveal = document.getElementById('card_reveal')
        let skipButton = document.getElementById('skip_button')
        let clicked = false;
        let tempSelect = 0
        canvasParticles()
        backButton.style.animation = "opacityAppear .5s forwards"
        backButton.style.pointerEvents = "all";
        swiper.slideTo(0);

        if(boosterPoints[0] > 0 || boosterPoints[1] > 0 || boosterPoints[2] > 0 || boosterPoints[3] > 0) {
            if(selected === 0) {
                let n = 300;
                for (let i=0; i<n; i++) {
                    tempSelect = Math.floor(Math.random() * 4) + 1

                    if(boosterPoints[tempSelect-1] > 0) {
                        n = 0;
                    }
                }
            } else {
                tempSelect = selected
            }
            
            if (boosterPoints[tempSelect-1] > 0) {
                if(tempSelect === 1) {booster.src = "sources/BoosterS1 ORIGINS.png"}
                if(tempSelect === 2) {booster.src = "sources/BoosterS2 CAMPUS.png"}
                if(tempSelect === 3) {booster.src = "sources/BoosterS3 BATTLE.png"}
                if(tempSelect === 4) {booster.src = "sources/BoosterS4 STELLAR.png"}

                boosterOpening.style.transform = "rotateX(0)"
                booster.style.animation = "appear 1.5s forwards"
                booster.style.animationDelay = ".8s"
                            
                for (const element of swiperSwaper.children) {
                    element.style.animation = "none";
                }
                
                fetch("https://vps.terrysegaunes.fr/row-backend/src/index.php") // Adresse de mon VPS personnel :)
                    .then((res) => res.json())
                    .then((cardDico) => {
                        chosenCards = cardsChoice(tempSelect,cardDico)
                        swiperSwaper = document.querySelector('.swiper-wrapper');
                        swiperSlide = document.querySelectorAll('.swiper-slide');
                        
                        for(let i=0; i<swiperSwaper.children.length; i++) {
                            swiperSlide[i].style.background = `url(${chosenCards[i].image})`
                            swiperSlide[i].style.backgroundSize = 'cover';
                        }

                        quickOpeningButton.addEventListener('click', function(){
                            booster.style.animation = "boosterOpening 2s"
                            cardReveal.style.animation = "cardReveal 2s forwards"
                            backButton.style.animation = "opacityDisappear .5s forwards"
                            backButton.style.pointerEvents = "none";
                            skipButton.style.animation = "opacityAppear .5s forwards";
                            skipButton.style.pointerEvents = "all";
                            if(!clicked) {
                                boosterPoints[selected-1] -= 1;
                                boosterPointsOutputs[selected-1].innerHTML = boosterPoints[selected-1]
                                localStorage.setItem('boosterPoints', JSON.stringify(boosterPoints))
                                saveCards(chosenCards, cardDico)
                                clicked = true;
                            }

                            let temp = 5
                            for (const element of swiperSwaper.children) {
                                temp += 1
                                element.style.opacity = "0"
                                element.style.animation = "opacityAppear .3s"
                                element.style.animationDelay = temp/10 + "s"
                                element.style.animationFillMode = "forwards"
                                boosterAnimation.style.backgroundColor = "#000000B0"
                            }
                        })

                        skipButton.addEventListener('click', function() {
                            cardReveal.style.animation = "cardDisappear 1s forwards"
                            boosterOpening.style.transform = "rotateX(.25turn)"
                        })
                    })
                    .catch((e) => console.error(e));
            }
            else {
                alert(`Vous n'avez pas assez de points de saison ${selected} pour ouvrir un booster`)
            }
        } else {
            alert("Vous n'avez aucun booster à ouvrir");
        }
    })

    backButton.addEventListener("click", function(){ // Bouton pour annuler le booster opening
        let boosterOpening = document.querySelector('#booster_opening')
        let booster = document.querySelector('.booster')
        let cardReveal = document.getElementById('card_reveal')

        boosterOpening.style.transform = "rotateX(.25turn)"
        booster.style.animation = "disappear 1s"

        cardReveal.style.animation = "none"
        cardReveal.style.transform = "scale(0)"
        cardReveal.style.animationDelay = ""
    })

    function canvasParticles() {
        const c = document.querySelector("canvas");
        const ctx = c.getContext("2d");
        let cw = (c.width = window.innerWidth);
        let ch = (c.height = window.innerHeight);
        let radius = Math.max(cw,ch);
        const particles = Array(99);

        for (let i = 0; i < particles.length; i++) {
        particles[i] = {
            x: 0,
            y: 0,
            scale: 0, 
            rotate: 0,
            img: new Image()
        }  
        particles[i].img.src = "sources/wankul"+(2+i%17)+".png";
        }

        const tl = gsap.timeline({onUpdate:draw})
        .fromTo(particles, {
            x:(i)=> {
            const angle = (i/particles.length * Math.PI *2)- Math.PI/2
            return Math.cos(angle*10) * radius// * i/particles.length
            },
            y:(i)=> {
            const angle = (i/particles.length * Math.PI *2)- Math.PI/2
            return Math.sin(angle*10) * radius// * i/particles.length
            },
            scale: 0.8,
            rotate: 0
        },{
            duration: 5,
            ease: "sine",
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
            stagger:{each:-0.05, repeat:-1}
        }, 0)
        .seek(99)

        function draw(){  
        particles.sort( (a,b) => a.scale - b.scale ) // sort by scale to set z-indexing  
        ctx.clearRect(0, 0, cw, ch);
        particles.forEach((p, i) => {
            ctx.translate(cw / 2, ch / 2);
            ctx.rotate( p.rotate );
            ctx.drawImage(
            p.img,
            p.x,
            p.y,
            p.img.width * p.scale,
            p.img.height * p.scale
            );
            ctx.resetTransform();
        });
        }

        window.addEventListener("resize", () => {
        cw = c.width = innerWidth;
        ch = c.height = innerHeight;
        radius = Math.max(cw,ch);
        tl.invalidate();
        });

        c.addEventListener('pointerup', ()=>{ 
        gsap.to(tl, { 
            timeScale: tl.isActive() ? 0 : 1 // use timeScale to toggle play / pause
        })
        })
    }

    function saveCards(cards, cardDico) {
        let myCardsTab = Array.from(myCards)

        for (const element of cards) {
            if (!myCards.includes(cardDico.cards.indexOf(element))) {
                myCards.push(cardDico.cards.indexOf(element));
                myCards.sort();
            }
        }
        localStorage.setItem('myCards', JSON.stringify(myCards));
        console.log('bien enregistré !')
        console.log(localStorage.getItem('myCards'));
    }

    function cardsChoice(season, cardDico) { // Choix aléatoire des 10 cartes dans un booster
        let final = Array()
        console.log(cardDico)

        if (cardDico) {
            let rarityNumbers = rarityChoser();
            console.log(rarityNumbers)
            for (let i=0; i<10; i++) {
                if (i === 0) {
                    actualCard = randomCard(season, cardDico, "Terrain");
                } else {
                    let n = 300
                    for (let u=0; u<n; u++) {
                        actualCard = randomCard(season, cardDico, rarityNumbers[i-1]);
                        if (final.some(item => item.title === actualCard.title)) {
                            actualCard = randomCard(season, cardDico, rarityNumbers[i-1]);
                        } else {
                            n=0;
                        }
                    }
                }
                final.push(actualCard)
            }
        }

        return final
    }

    function rarityChoser() {
        let final = [];
        let sorting = [];

        for (let i=0; i<9; i++) {
            let chosen = Math.floor(Math.random() *9000)
            // let chosen = 1;

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

    function randomCard(season, cardDico, rarity) {
        let sortedTab = cardDico.cards.filter(element => element.rarity.name === rarity);

        let chosen = Math.floor(Math.random() * sortedTab.length)
        let card = sortedTab[chosen]
        let refChar = `S0${season}`
        if (season == 1) {refChar = "SO1"}
        //"SO1"
        //"S02"

        if (card.season.number === refChar) {
            
            return card
        } else {
            return randomCard(season, cardDico, rarity)
        }
    }

    const canvaC = document.getElementById('c');
    canvaC.style.opacity = "0";

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 100);
    camera.position.z = 5;

    let renderer = new THREE.WebGLRenderer({ canvas: c, alpha: true });
    renderer.setSize(innerWidth, innerHeight);

    let triangles = [];

    let particlesNumber = 300;
    let particuleLength = 0;
    let colors = [0xbfbfbf, 0x0ffffff, 0x878686];

    function createTriangle() {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            0, 0.1, 0,
            -0.1, -0.1, 0,
            0.1, -0.1, 0
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });

        const mesh = new THREE.Mesh(geometry, material);

        resetTriangle(mesh);

        scene.add(mesh);
        triangles.push(mesh);
    }

    // reset = respawn au centre avec valeurs random
    function resetTriangle(t) {
        t.position.set(0, 0, 0);
        t.material.color.set(colors[Math.floor(Math.random() * colors.length)]);

        t.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
        );

        // rotations random 🔥
        t.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
            z: (Math.random() - 0.5) * 0.2
        };

        t.material.opacity = 1;
    }

    // créer plein de particules
    for (let i = 0; i < particlesNumber; i++) {
        setTimeout( function(){
            createTriangle();
        }, i*10);
    }

    function setColor(colors) {
        triangles.forEach(t => {
            t.material.color.set(colors[Math.floor(Math.random() * colors.length)]);
        });
    }

    function setParticles(n) {
        if (triangles.length > n) {
            removeParticles(triangles.length - n);
        } else {
            addParticles(n - triangles.length);
        }
    }

    function addParticles(n) {
        for (let i = 0; i < n; i++) {
            createTriangle();
        }
    }

    function removeParticles(n) {
        for (let i = 0; i < n; i++) {
            setTimeout( function(){ 
                const t = triangles.pop();
                scene.remove(t);
            }, i*10);
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        triangles.forEach(t => {
            t.position.add(t.userData.velocity);

            // rotation aléatoire différente pour chaque triangle
            t.rotation.x += t.userData.rotationSpeed.x;
            t.rotation.y += t.userData.rotationSpeed.y;
            t.rotation.z += t.userData.rotationSpeed.z;

            // fade out
            t.material.opacity -= 0.01;

            // distance ou invisible → reset
            if (t.material.opacity <= 0 || t.position.length() > particuleLength) {
                resetTriangle(t);
            }
        });

        renderer.render(scene, camera);
    }

    animate();

    var swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        on: {
            slideChange: function () {
                console.log(chosenCards[swiper.activeIndex].rarity)
                if (chosenCards[swiper.activeIndex].rarity.name == "Légendaire Or") {
                    console.log("OR")
                    particlesNumber = 300;
                    particuleLength = 6;
                    colors = [0xdbbf8a, 0x0ffffff, 0xa88c58];
                    canvaC.style.animation = 'goToGold 2s forwards';
                    canvaC.style.opacity = "1";
                }
                else if (chosenCards[swiper.activeIndex].rarity.name == "Légendaire Argent") {
                    console.log("ARGENT")
                    particlesNumber = 300;
                    particuleLength = 5;
                    colors = [0xbfbfbf, 0x0ffffff, 0x878686];
                    canvaC.style.animation = 'goToSilver 2s forwards';
                    canvaC.style.opacity = "1";
                } else if (chosenCards[swiper.activeIndex].rarity.name == "Légendaire Bronze") {
                    console.log("BRONZE")
                    particlesNumber = 300;
                    particuleLength = 4;
                    colors = [0x453631, 0x9e573f, 0x8c4022];
                    canvaC.style.animation = 'goToBronze 2s forwards';
                    canvaC.style.opacity = "1";
                } else {
                    particlesNumber = 0;
                    canvaC.style.animation = 'none';
                    canvaC.style.opacity = "0";
                }

                setColor(colors);
                setParticles(particlesNumber);
            },
        },
    });
});