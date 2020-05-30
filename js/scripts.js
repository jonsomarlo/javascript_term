var myLink = document.getElementById('checkBox');
var body = document.getElementsByTagName("BODY")[0];
var intro = document.getElementById("net-nav");

window.onload = function(){scroll()};
window.onscroll = function(){scroll()};

var opacity = 0;

myLink.onclick = function() {
    var checkBox = document.getElementById("checkBox");
    var logo = document.getElementById("logo");
    var term = document.getElementById("terminal");
    var site = document.getElementById("website");
    if (checkBox.checked == true){
        term.style.left = "0";
        body.style.overflow = "hidden";
        body.style.setProperty('--opacity',1);
        body.style.setProperty('--main-hd-color', "rgba(248, 248, 255,var(--opacity))");
        body.style.setProperty('--main-tit-color', "rgba(21, 21, 21,var(--opacity))");
        body.style.setProperty('--main-hd-color-aw', "rgba(248, 248, 255, 1);");
        body.style.setProperty('--main-tit-color-aw', "rgba(21, 21, 21, 1);");
        body.style.setProperty('--main-hd-color-aw', "rgba(21, 21, 21, 1);");
    } else {
        term.style.left = "-100%";
        body.style.overflow = "visible";
        body.style.setProperty('--opacity',opacity);
        body.style.setProperty('--main-hd-color', "rgba(21, 21, 21,var(--opacity))");
        body.style.setProperty('--main-tit-color', "rgba(248, 248, 255,var(--opacity))");
        body.style.setProperty('--main-hd-color-aw', "rgba(21, 21, 21, 1);");
        body.style.setProperty('--main-tit-color-aw', "rgba(248, 248, 255, 1);");
        head.style.setProperty('-webkit-transition', ".0s;");
        head.style.setProperty('transition', ".0s;");
    }
}


function scroll() {
    opacity = 0;
    ymid = (window.innerHeight-70)/2;
    ypos = window.pageYOffset;

    if (ymid > ypos)
        opacity = 1
    else if (ymid-ypos/2 > 0)
        opacity = (ymid-ypos/2)/ymid;

    opacity = 1-opacity;
    body.style.setProperty('--opacity',opacity);
}
