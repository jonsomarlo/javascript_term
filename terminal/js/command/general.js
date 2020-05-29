
/* VARIABLES AUXILIARES =====================================================*/
var commands = [];
var currentCmd = '';
var current = 0;

/* LISTAS RESTRICTIVAS ======================================================*/
var WLIST_CHARS = ['|',"'",'"','<','<<','>','>>','&','(',')','{','}','[',']'];
var WLIST_STRINGS = ['for','if','while','sed'];
var WLIST_SYSNAME = ["options",".",".."];
function allowSyntax(command) {
    for ( let i = 0; i < command.length; i++) {
        for ( let j = 0; j < WLIST_CHARS.length; j++) {
            if ( command[i].includes(WLIST_CHARS[j]) )
                return "not enough permissions: char '"+WLIST_CHARS[j]+"´ is blocked"
        }
        for ( let j = 0; j < WLIST_STRINGS.length; j++) {
            if ( command[i] == WLIST_STRINGS[j] )
                return "not enough permissions: function '"+command[i]+"´ is blocked"
        }
    }
    return null;
}

function newCommand(newcommand) {

    newcommand = removeEmpty(newcommand.split('\xa0'));
    if ( newcommand.length == 0 ) { // si no tiene palabras
        repit++;
        return;
    }

    repit=0;

    // regular expressions
    var command = [];
    for ( let i = 0; i < newcommand.length; i++ ) {
        if ( newcommand[i].includes("*") ) {
            let exp = newcommand[i].split("/");
            let path = exp[0] == "" ? "/" : "./";
            var paths = regex_check(path,exp);
            if ( paths.length == 0 ) {
                newLine(("shell: no matches found: "+newcommand[i]).replace(/ /g,'\xa0'))
                return;
            }
            for ( let i = 0; i < paths.length; i++ ) {
                command.push(paths[i].replace(/^.\//,""));
            }
        } else {
            command.push(newcommand[i]);
        }
    }

    let warning = allowSyntax(command)
    if ( warning != null ) {
        newLine(('warning: '+warning).replace(/ /g,'\xa0'));
    } else if (command[0] in superCommand ) {
        supercommand(command);
    } else if (command[0] in userCommand ) {
        usercommand(command);
    } else {
        newLine(('command not found: '+command[0]).replace(/ /g,'\xa0'));
    }
}
/* SUPER COMMADS ============================================================*/
var superCommand = {};
superCommand['man'] = manCMD;
superCommand['sudo'] = sudoCMD;
superCommand['su'] = sudoCMD;

function supercommand(command) {
    for ( let i = 0; i < command.length; i++) {
        if ( command[i].startsWith('-') ) {
            newLine((command[0]+': options not available: not enough permissions').replace(/ /g,'\xa0'));
            return;
        }
    }
    superCommand[command[0]](command);
}

/* USER COMMADS =============================================================*/
userCommand['cat'] = catCMD;
userCommand['cd'] = cdCMD;
userCommand['clear'] = clearCMD;
userCommand['cp'] = cpCMD;
userCommand['echo'] = echoCMD;
userCommand['exit'] = exitCMD;
userCommand['help'] = helpCMD;
userCommand['info'] = infoCMD;
userCommand['la'] = perDeniedCMD;
userCommand['ls'] = lsCMD;
userCommand['message'] = messageCMD;
userCommand['mkdir'] = mkdirCMD;
userCommand['mv'] = mvCMD;
userCommand['open'] = openCMD;
userCommand['print'] = echoCMD;
userCommand['printenv'] = printenvCMD;
userCommand['ps'] = perDeniedCMD;
userCommand['pwd'] = pwdCMD;
userCommand['rm'] = rmCMD;
userCommand['rmdir'] = rmdirCMD;
userCommand['spanish-politician'] = spanishPoliticianCMD;
userCommand['touch'] = touchCMD;
userCommand['tree'] = treeCMD;

function usercommand(command) {
    for ( let i = 0; i < command.length; i++) {
        if ( command[i].startsWith('-') ) {
            newLine((command[0]+': options not available: not enough permissions').replace(/ /g,'\xa0'));
            return;
        }
    }

    userCommand[command[0]](command);
}
