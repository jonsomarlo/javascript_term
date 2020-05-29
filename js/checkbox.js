var myLink = document.getElementById('checkBox');

myLink.onclick = function() {
    var body = document.getElementsByTagName("BODY")[0];
    var checkBox = document.getElementById("checkBox");
    var term = document.getElementById("terminal");
    var site = document.getElementById("website");
    if (checkBox.checked == true){
        term.style.left = "0";
        body.style.overflow = "hidden";
        body.style.setProperty('--main-hd-color', "GhostWhite");
        // body.style.setProperty('--second-hd-color', "LightGray");
        body.style.setProperty('--main-tit-color', "#151515");
        // body.style.setProperty('--second-tit-color', "LightGray");
    } else {
        term.style.left = "-100%";
        body.style.overflow = "visible";
        body.style.setProperty('--main-hd-color', "#151515");
        // body.style.setProperty('--second-hd-color', "LightGray");
        body.style.setProperty('--main-tit-color', "GhostWhite");
        body.style.setProperty('--second-tit-color', "LightGray");
    }
}
