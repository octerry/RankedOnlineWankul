changeWidth

function changeWidth() {
    var ratio = window.innerWidth / window.innerHeight *10 //Ratio de la fenetre
    var scroll = window.pageYOffset;
    
    if (ratio <= 10) { // SUR MOBILE
        var width = 70 - (scroll/2);
        var opacity = 100 - (scroll*5)

        if (opacity < 0){
            opacity = 0
        }

        if (width > 40) {
            document.getElementById('resizable_title_div').style.width = width + 'vw';
            document.getElementById('title_h2').style.fontSize = width/17 + 'vw'
            document.getElementById('title_h2').style.opacity = opacity + '%'
        }
        else {
            document.getElementById('resizable_title_div').style.width = '40vw';
            document.getElementById('title_h2').style.opacity = '0%'
            document.getElementById('title_h2').style.fontSize = width/17 + 'vw'
        }
    }
    else {
            document.getElementById('title_div').style.position = 'relative';
            document.getElementById('title_div').style.top = '0';
            document.getElementById('title_div').style.zIndex = '0';
            document.getElementById('resizable_title_div').style.width = '50vw';
    }

    // -------ANCIENNE VERSION CASSEE SUR PC-------
    //
    //var ratio = window.innerWidth / window.innerHeight *10 //Ratio de la fenetre
    //var scroll = window.pageYOffset;
    //
    //if (ratio >= 10) { // SUR PC
    //    var width = 50 - (scroll/3);
    //}
    //else {
    //    var width = 70 - (scroll/2);
    //}
    //
    //var opacity = 100 - (scroll*5)
    //
    //f (opacity < 0){ // SUR MOBILE
    //    opacity = 0
    //}
    //
    //if (ratio >= 10) { // SUR PC
    //    if (width > 20) {
    //        document.getElementById('resizable_title_div').style.width = width + 'vw';
    //        document.getElementById('title_h2').style.opacity = opacity + '%'
    //        document.getElementById('title_h2').style.fontSize = width/17 + 'vw'
    //    }
    //    else {
    //        document.getElementById('resizable_title_div').style.width = '20vw';
    //        document.getElementById('title_h2').style.opacity = '0%'
    //        document.getElementById('title_h2').style.fontSize = width/17 + 'vw'
    //    }
    //}
    //else { // SUR MOBILE
    //    if (width > 40) {
    //        document.getElementById('resizable_title_div').style.width = width + 'vw';
    //        document.getElementById('title_h2').style.fontSize = width/17 + 'vw'
    //        document.getElementById('title_h2').style.opacity = opacity + '%'
    //    }
    //    else {
    //        document.getElementById('resizable_title_div').style.width = '40vw';
    //        document.getElementById('title_h2').style.opacity = '0%'
    //        document.getElementById('title_h2').style.fontSize = width/17 + 'vw'
    //    }
    //}
}

window.addEventListener('load', function(){
    this.requestAnimationFrame(changeWidth);
})

window.addEventListener('scroll', function(){
    this.requestAnimationFrame(changeWidth);
})