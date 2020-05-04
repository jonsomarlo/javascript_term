

/* INICIALIZACION DE LINEAS EN HTML =========================================*/

var MAX_LINES = 100;
let divs = "";

for (var i=MAX_LINES; i > 0; i--)
    divs += "<div id='"+i+"'></div>\n";
$('#terminal').html(divs);
$('#input .caret').text('\xa0');


/* MENSAJE DE TIPO DE DISPOSITIVO ======================================*/
if ( detectMob() ) {
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine("  <span class=\"folder\">ERROR: 418 I'm a teapot</span>".replace(/ /g,'\xa0'));
    newLine("  We have detect you are using a mobile or a tablet.".replace(/ /g,'\xa0'));
    newLine("  For use this web page you will need a laptop or".replace(/ /g,'\xa0'));
    newLine("  computer.".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine("   ／￣￣￣￣￣￣￣￣￣￣￣￣".replace(/ /g,'\xa0'));
    newLine("   | ... At least I can make sad".replace(/ /g,'\xa0'));
    newLine("   | faces to entertain you.".replace(/ /g,'\xa0'));
    newLine("   ＼＿　 ＿＿＿＿＿＿＿＿＿＿＿".replace(/ /g,'\xa0'));
    newLine("       V ".replace(/ /g,'\xa0'));
    newLine(sadface());
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" Since you can not enjoy my website, and spend one of".replace(/ /g,'\xa0'));
    newLine(" the best times of the day, I will provide some links".replace(/ /g,'\xa0'));
    newLine(" for you to hang out, although I warn you that it is".replace(/ /g,'\xa0'));
    newLine(" not as rewarding as the use of my website, although".replace(/ /g,'\xa0'));
    newLine(" it is not bad either.".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" Links:".replace(/ /g,'\xa0'));
    newLine('\xa0\xa0\xa0- <a class="opengit" target="_blank" href="https://github.com/jonsomarlo">github: Jonso Marlo</a>');
    newLine('\xa0\xa0\xa0- <a class="openlinked" target="_blank" href="https://www.linkedin.com/in/juan-martinez-41a4261a9/">linkeding: Juan Martinez</a>');
    newLine('\xa0\xa0\xa0- <a class="open" target="_blank" href="anonymous/curriculum/curriculum_es.pdf">CV: Spanish</a>');
    newLine('\xa0\xa0\xa0- <a class="open" target="_blank" href="anonymous/curriculum/curriculum_en.pdf">CV: English</a>');
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
} else {
    newLine(" ".replace(/ /g,'\xa0'));
    newLine("  If you do not have a high knowledge of computers,".replace(/ /g,'\xa0'));
    newLine("  please call an computer expert. If this computer".replace(/ /g,'\xa0'));
    newLine("  expert for some reason does not know how to use a".replace(/ /g,'\xa0'));
    newLine("  Linux command line, I would like to introduce my-".replace(/ /g,'\xa0'));
    newLine("  self to fill the vacancy of this \"computer expert\".".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine("  If you do not have any expert available, write".replace(/ /g,'\xa0'));
    newLine("  'help' and press the 'enter' key, it will provide".replace(/ /g,'\xa0'));
    newLine("  you with information so that you can see part of".replace(/ /g,'\xa0'));
    newLine("  the information.".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine("  If you are interested in writing a message, you".replace(/ /g,'\xa0'));
    newLine("  can do it through the command \"message\".".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
}


/* CALCULO DE ANCHO DE LA VENTANA ===========================================*/
var MAX_CHARACTER = 0;
checkSize();
MAX_CHARACTER -= 2;

window.addEventListener("resize", checkSize);
function checkSize() {
    MAX_CHARACTER = -3;

    let string = "-";
    $('#aux').html(string);
    let aux_height = $('main').height();
    let new_height = aux_height;

    while ( aux_height == new_height ) {
        MAX_CHARACTER+=2;
        string += '- ';
        $('#aux').html(string);
        new_height = $('main').height();
    }
    $('#aux').html('');
}

/* PEGADO ===================================================================*/
window.addEventListener('paste', (e) => {
    if ( BOOLEAN_SUDO ) return;
    try {
        navigator.clipboard.readText().then(text => {
            $('#input .prev').text($('#input .prev').text()+text.replace(/ /g,'\xa0'));
        });
    } catch (err) {
        alert("Your browser dont allow to use clipboard.");
    }
    event.preventDefault();
});

/* COPIADO ==================================================================*/
window.addEventListener('copy', (e) => {
    navigator.clipboard.writeText(document.getSelection())
    event.preventDefault();
});


/* VARIABLES AUXILIARES =====================================================*/
var BOOLEAN_MUTE = false;
var BOOLEAN_MAN = false;
var BOOLEAN_HELP = false;
var BOOLEAN_SUDO = false;
var BOOLEAN_MESSAGE = false;
var repit = 0;

var processID = Math.floor(Math.random() * 10000);
var process = 1;

var now = new Date().getTime() - 2000;

/* COMBINACIONES DE TECLAS ==================================================*/
window.addEventListener("keydown", function (e) {
    var evtobj = window.event? event : e;
    if ( ['c','C'].includes(evtobj.key) && evtobj.ctrlKey && evtobj.shiftKey) {
        backspace();
        window.dispatchEvent(new Event('copy'));
    } else if ( ['v','V'].includes(evtobj.key) && evtobj.ctrlKey && evtobj.shiftKey) {
        backspace();
        window.dispatchEvent(new Event('paste'));
    } else if ( ['c','C'].includes(evtobj.key) && evtobj.ctrlKey) {
        backspace();
        $('#input .prev').text($('#input .prev').text()+"^C");
        BOOLEAN_MESSAGE = false;
        BOOLEAN_SUDO = false;
        enter(true,false);
    } else if ( ['z','Z'].includes(evtobj.key) && evtobj.ctrlKey) {
        backspace();
        $('#input .prev').text($('#input .prev').text()+"^Z");

        enter(true,false);
        if ( BOOLEAN_SUDO || BOOLEAN_MESSAGE ) {
            newLine(("["+process+"]  + "+(processID+process)+" suspended  "+commands[commands.length-1]).replace(/ /g,'\xa0'));
            process++;
        }

        BOOLEAN_MESSAGE = false;
        BOOLEAN_SUDO = false;
    }
});

/* TECLAS INDIVIDUALES ======================================================*/
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key){
        case "Enter":
            if ( new Date().getTime() > now + 2000 ) {
                if ( againEnter() == true ) return;
            } else return;

            tabulate = 0;
            if ( BOOLEAN_SUDO ) enter_function_sudo();
            else if ( BOOLEAN_MESSAGE ) enter_function_message();
            else if ( !BOOLEAN_MAN && !BOOLEAN_HELP ) newCommand(enter(true,true));
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case "Tab":
            if ( BOOLEAN_SUDO && BOOLEAN_MESSAGE ) return;
            tab();
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case "ArrowLeft":
            if ( BOOLEAN_SUDO ) return;
            left();
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case "ArrowUp":
            if ( BOOLEAN_SUDO && BOOLEAN_MESSAGE ) return;
            up();
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case "ArrowRight":
            if ( BOOLEAN_SUDO ) return;
            right();
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case "ArrowDown":
            if ( BOOLEAN_SUDO && BOOLEAN_MESSAGE ) return;
            down();
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case "Delete":
            tabulate = 0;
            if ( BOOLEAN_SUDO ) return;
            remove();
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case "Backspace":
            tabulate = 0;
            if ( BOOLEAN_SUDO ) return;
            backspace();
            window.scrollTo(0,document.body.scrollHeight);
            break;
        case " ":
            if ( BOOLEAN_SUDO ) return;
            $('#input .prev').text($('#input .prev').text()+'\xa0');
            window.scrollTo(0,document.body.scrollHeight);
            break;
        default:
            tabulate = 0;
            if ( event.key.length == 1  && !BOOLEAN_SUDO ) {
                if ( BOOLEAN_HELP && event.key == 'q') {
                    document.getElementById("help").style.display = "none";
                    document.getElementById("man").style.display = "block";
                    BOOLEAN_HELP = false;
                    return;
                } else if ( BOOLEAN_MAN ) {
                    if ( event.key == 'q' ) {
                        document.getElementById("command").style.display = "block";
                        document.getElementById("man").style.display = "none";
                        window.scrollTo(0,document.body.scrollHeight);
                        BOOLEAN_MAN = false;
                        return;
                    } else if ( event.key == 'h' ) {
                        document.getElementById("help").style.display = "block";
                        document.getElementById("man").style.display = "none";
                        BOOLEAN_HELP = true;
                        return;
                    }
                } else {
                    $('#input .prev').text($('#input .prev').text()+event.key);
                    window.scrollTo(0,document.body.scrollHeight);
                    return;
                }
            }
    }
    event.preventDefault();
}, true);
