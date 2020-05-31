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
