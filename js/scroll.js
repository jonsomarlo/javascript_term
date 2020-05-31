var html = document.getElementsByTagName("HTML")[0];
var boxes = document.getElementsByClassName("element");
var titles = document.getElementsByClassName("header");
var opacity = 0;

function scroll() {
    opacity = 1;

    ymid = (window.innerHeight-70)/2;
    ypos = window.pageYOffset;

    if (ymid > ypos)
        opacity = 0

    html.style.setProperty('--opacity',opacity);

    for(x=0;x<boxes.length;x++){
        let position = boxes[x].getBoundingClientRect();
        if ( position.top < (window.innerHeight - 100) ) {
            boxes[x].style.opacity = "1";
        }
    }

    for(x=0;x<titles.length;x++){
        let position = titles[x].getBoundingClientRect();
        if ( position.top < (window.innerHeight - 100) ) {
            titles[x].style.opacity = "1";
        }
    }

}

scroll();
window.onscroll = function(){scroll()};
window.addEventListener("resize", scroll);

var intro = document.getElementById("intro")
intro.getElementsByClassName('title')[0].style.opacity = "1";
intro.getElementsByClassName('subtitle')[0].style.opacity = "1";

var arrows = intro.getElementsByClassName('arrows')[0];
var arrow = arrows.getElementsByClassName('arrow')[0];
arrows.getElementsByClassName('arrow')[0].onclick = function() { window.scrollTo(0,window.innerHeight-60) };

setInterval(function(){arrows.style.opacity = "1"},2000);
