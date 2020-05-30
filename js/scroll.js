var html = document.getElementsByTagName("HTML")[0];
var opacity = 0;

function scroll() {
    opacity = 1;

    ymid = (window.innerHeight-70)/2;
    ypos = window.pageYOffset;

    if (ymid > ypos)
        opacity = 0

    html.style.setProperty('--opacity',opacity);
}

scroll();
window.onscroll = function(){scroll()};
