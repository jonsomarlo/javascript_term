var myLink = document.getElementById('checkBox');
var body = document.getElementsByTagName("BODY")[0];
var intro = document.getElementById("net-nav");

myLink.onclick = function() {
    var checkBox = document.getElementById("checkBox");
    var logo = document.getElementById("logo");
    var term = document.getElementById("terminal");
    var site = document.getElementById("website");
    if (checkBox.checked == true){
        term.style.left = "0";
        body.style.overflow = "hidden";
        html.style.setProperty('--opacity',1);
        html.style.setProperty('--main-hd-color', "rgba(248, 248, 255,var(--opacity))");
        html.style.setProperty('--main-tit-color', "rgba(21, 21, 21,var(--opacity))");
        html.style.setProperty('--main-hd-color-aw', "rgba(248, 248, 255, 1);");
        html.style.setProperty('--main-tit-color-aw', "rgba(21, 21, 21, 1);");
        html.style.setProperty('--main-hd-color-aw', "rgba(21, 21, 21, 1);");
    } else {
        term.style.left = "-100%";
        body.style.overflow = "visible";
        html.style.setProperty('--opacity',opacity);
        html.style.setProperty('--main-hd-color', "rgba(21, 21, 21,var(--opacity))");
        html.style.setProperty('--main-tit-color', "rgba(248, 248, 255,var(--opacity))");
        html.style.setProperty('--main-hd-color-aw', "rgba(21, 21, 21, 1);");
        html.style.setProperty('--main-tit-color-aw', "rgba(248, 248, 255, 1);");
    }
}
