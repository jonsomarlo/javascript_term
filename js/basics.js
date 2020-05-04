

/* =============================================================== NEW LINE =*/
function newLine(string) {
    for (var i = MAX_LINES; i > 1; i-- )
        $('#'+i).html($('#'+(i-1)).html());

    let count = true;
    let counter = 0;
    let auxString = "";
    string = string.replace(/&nbsp;/g,'\xa0')
    for (let i = 0; i < string.length; i++ ) {

        if ( string[i] == "<" ) count = false;
        else if ( string[i] == ">" ) count = true;
        else if ( count && string[i] != ' ') counter++;

        if ( counter > 0 || string[i]!="" || !count)
            auxString += string[i];

        if ( counter >= MAX_CHARACTER ) {
            auxString += '<br>';
            counter = 0;
        }
    }
    $('#1').html(auxString);
    window.scrollTo(0,document.body.scrollHeight);
}

/* ================================================ BORRAR ELEMENTOS VACIOS =*/
function removeEmpty(list) {
    var filtered = list.filter( function (el) {
            return el != '';
        });
    return filtered;
}

/* ============================================================== TABULADOR =*/
function tabspace(string,size) {
    var tabs = size-string.length%size;
    for ( let i = 0; i < tabs; i++)
        string += '\xa0';
    return string;
}

/* ====================================================== EXPRESION REGULAR =*/
function regex_check(path,exp) {
    if ( exp.length == 0 )
        return [path.substring(0,path.length-1)];

    let paths = [];
    let first = exp.shift();
    let auxDir = openDir(path);

    if ( first == '' ) {
        if ( auxDir != null && auxDir['options']['type'].includes('folder') )
                paths = regex_check(path,exp);
    } else {
        let regex = new RegExp("^"+first.replace(/\*/g,"(.*)")+"$");

        if ( auxDir != null) {
            if ( auxDir['options']['type'].includes('folder') ) {
                let options = Object.keys(auxDir).filter(word => !WLIST_SYSNAME.includes(word));
                for ( let i = 0; i < options.length; i++ ){
                    if ( options[i].match(regex) != null && auxDir[options[i]]['options']['allow'] )
                        paths = paths.concat(regex_check(path+options[i]+"/",[...exp]));
                }
            }
        }
    }
    return paths;
}

/* ============================================================= MUTE INPUT =*/
function shutup(silence) {
    BOOLEAN_MUTE = silence;
    if ( silence ) {
        $('#input .prompt').text('');
        $('#input .path').text('');
        $('#input .dollar').text('');
        $('#input .prev').text('');
        $('#input .caret').text('');
        $('#input .next').text('');
    } else {
        $('#input .prompt').text('anonymous-PC\xa0');
        $('#input .path').text(file["options"]["path"]);
        $('#input .dollar').text('\xa0$\xa0');
        $('#input .prev').text('');
        $('#input .caret').text('\xa0');
        $('#input .next').text('');
    }
}

/* ============================================= IMPRIMIR LISTA EN COLUMNAS =*/
/* ORDENACION VERTICAL DE LOS ELEMENTOS -------------------------------------*/
function vertical(list,column) {
    let elements = list.length;
    let auxDict = {};
    let auxList = [];
    let max = column*10;
    if ( max < elements ) {
        for ( let i = max; i < elements; i++ )
            auxList.push(list[i]);
        elements = max;
    }

    for ( let i = 0; i < column; i++ )
        for ( let j = i; j < elements; j += column )
            auxDict[j] = list.shift();

    for ( let i = elements-1; i >= 0; i-- )
        auxList.push(auxDict[i]);

    return auxList;
}
/* IMPRESION DE ELEMENTOS ---------------------------------------------------*/
function list_print_in_columns(list,boolean) {
    let elements = list.length;
    let count = true;
    let max = -1;
    let index = {};
    for (let i = 0; i < list.length; i++ ) {
        var counter = 0;
        for ( let j = 0; j < list[i].length; j++) {
            if ( list[i][j] == "<" ) count = false;
            else if ( list[i][j] == ">" ) count = true;
            else if ( count && list[i][j] != ' ') {
                counter++;
            }
        }
        if ( max < counter ) max = counter;
        index[list[i]] = counter;
    }

    max += 2;
    let string = "";
    let line = 0;
    let column = 0;
    let columns = Math.floor(MAX_CHARACTER/max);

    if ( boolean ) list = vertical(list.sort(),columns);
    else list = list.reverse();

    while ( list.length > 0 ) {
        let word = list.pop();
        for (let i = index[word]; i < max; i++ ) {
            word+='\xa0'
        }
        string+=word;
        column++;
        if ( column+1 > columns ) {
            column = 0;
            newLine(string);
            string='';
            line++;
        }
        if ( line >= 10 ) {
            newLine('\xa0--\xa0(still\xa0'+(list.length)+'\xa0more)\xa0--');
            return;
        }
    }
    if ( string.length > 0 )
        newLine(string);
}

/* ========================================================== DETECT MOBILE =*/
function detectMob() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}

/* =============================================================== SAD FACE =*/
function sadface(){
    var sad = {
        0:"    ( ;-;)",         1:"    (╥﹏╥)",          2:"   ( ༎ຶ ⌑ ༎ຶ )",
        3:" ｡ﾟ･（>﹏<）･ﾟ｡",      4:" ๐·°(৹˃̵﹏˂̵৹)°·๐",      5:"    （◞‸◟）",
        6:"    (◢ д ◣)",        7:"   (・´з`・)",        8:"   (ｏ´_｀ｏ)",
        9:"    ( ≧Д≦)",       10:"   (✖╭╮✖)",        11:"   (︶︹︺)",
        12:"   ((´д｀))",       13:"   (▰˘︹˘▰)",        14:"    (Θ︹Θ)ს",
        15:"ヽ(●ﾟ´Д｀ﾟ●)ﾉﾟ",     16:"  (๑´╹‸╹`๑)",       17:"  (⌯˃̶᷄ ﹏ ˂̶᷄⌯)",
        18:"（（●´∧｀●））",     19:"   (◞‸◟；)",
    }
    return sad[Math.floor(Math.random() * 20)].replace(/ /g,'\xa0');
}

/* ===================================================== FUNCIONES DE ENTER =*/
/* SUDO ---------------------------------------------------------------------*/
function enter_function_sudo( ) {
    if ( new Date().getTime() > now + 100 ) {
        newLine($('#input').html());

        $('#input .dollar').text('');

        now = new Date().getTime();
        while ( new Date().getTime() < now + 2000 );
        $('#input .dollar').text("Sorry,\xa0try\xa0again.");
        newLine($('#input').html());

        $('#input .dollar').text('[sudo]\xa0password\xa0for\xa0anonymous:\xa0');
        now = new Date().getTime();
    }
}
/* MENSAJE ------------------------------------------------------------------*/
function enter_function_message( ) {
    BOOLEAN_MESSAGE = false;

    var command = $('#input .prev').text();
    command += $('#input .caret').text();
    command += $('#input .next').text();

    enter(true,false);
    newLine(" ".replace(/ /g,'\xa0'));

    command = removeEmpty(command.split("\xa0"))
    if ( command.length > 0 ) {
        newLine("  Thank you very much for writing a comment, like".replace(/ /g,'\xa0'));
        newLine("  the rest of the messages you write, this will be".replace(/ /g,'\xa0'));
        newLine("  stored just locally, because I take the privacy of".replace(/ /g,'\xa0'));
        newLine("  the data very seriously, this is why I do not agree".replace(/ /g,'\xa0'));
        newLine("  with sending the data outside of your own computer.".replace(/ /g,'\xa0'));
        newLine("  It is for this and for the anonymity of the messages,".replace(/ /g,'\xa0'));
        newLine("  so I cannot commit to reply all messages received.".replace(/ /g,'\xa0'));
    } else {
        newLine("  Don't you want to write anything? it's a shame.".replace(/ /g,'\xa0'));
    }
    newLine(" ".replace(/ /g,'\xa0'));
}

/* =========================================== FUNCUION RECURSIVA PARA TREE =*/
function treeRec(path,lvl) {
    var auxDir = openDir(path,'tree');
    if ( auxDir ) {
        var auxFile = Object.keys(auxDir).filter(word => !WLIST_SYSNAME.includes(word) && !word.startsWith(".")).sort();

        let i = 0;
        for ( i = 0; i < auxFile.length-1; i++ ) {
            if ( !auxDir[auxFile[i]]['options']['type'].includes('open') ) {
                newLine(lvl+'├──\xa0<span class="'+auxDir[auxFile[i]]['options']['type']+'">'+auxDir[auxFile[i]]["options"]["name"]+'</span>');
            } else {
                newLine(lvl+'├──\xa0<a class="'+auxDir[auxFile[i]]['options']['type']+'" target="_blank" href="'+auxDir[auxFile[i]]['options']['url']+'">'+auxDir[auxFile[i]]["options"]["name"]+'</a>');
            }
            treeRec(auxDir[auxFile[i]]["options"]["dir"]+auxDir[auxFile[i]]["options"]["name"]+"/",lvl+"│\xa0\xa0\xa0");
        }
        if ( auxFile.length > 0 ) {
            if ( !auxDir[auxFile[i]]['options']['type'].includes('open') ) {
                newLine(lvl+'└──\xa0<span class="'+auxDir[auxFile[i]]['options']['type']+'">'+auxDir[auxFile[i]]["options"]["name"]+'</span>');
            } else {
                newLine(lvl+'└──\xa0<a class="'+auxDir[auxFile[i]]['options']['type']+'" target="_blank" href="'+auxDir[auxFile[i]]['options']['url']+'">'+auxDir[auxFile[i]]["options"]["name"]+'</a>');
            }
            treeRec(auxDir[auxFile[i]]["options"]["dir"]+auxDir[auxFile[i]]["options"]["name"]+"/",lvl+"\xa0\xa0\xa0\xa0");
        }
    }
}
