changeWidth

function changeWidth() {
    var scroll = window.pageYOffset / 5 +1 ;
    var width = 80 - scroll;
    var opacity = 100 - (scroll*10)
    if (opacity < 0){ 
        opacity = 0
    }

    if (width >= 40) {
        document.getElementById('resizable_title_div').style.width = width + 'vw';
        document.getElementById('title_h2').style.opacity = opacity + '%'
    }
}

window.addEventListener('scroll', function(){
    this.requestAnimationFrame(changeWidth);
})