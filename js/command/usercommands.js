/* ==================================================================== CAT =*/
function catCMD(command){
    switch (command.length) {
        case 1:
            newLine(command[0]+': no path selected'.replace(/ /g,'\xa0'));
            return;
        default:
            for ( let i = 1; i < command.length; i++ ) {
                let auxDir = openDir(command[i],command[0]);
                if ( auxDir != null )
                    if (auxDir['options']['type'].includes('doc')) {
                        let content = auxDir['options']['content'];
                        for ( let j = 0; j < content.length; j++)
                            newLine(content[j].replace(/ /g,'\xa0'));
                    } else {
                        newLine((command[0]+': '+command[i]+' is not a text file').replace(/ /g,'\xa0'));
                        if (auxDir['options']['type'].includes('open'))
                            newLine(('-- you should try "open"').replace(/ /g,'\xa0'));
                        newLine('\xa0');
                    }
            }
    }
}

/* ===================================================================== CD =*/
function cdCMD(command) {
    switch (command.length) {
        case 1:
            file = openDir("~",command[0]);
            $('#input .path').text("~");
            return;
        case 2:
            let auxDir = openDir(command[1],command[0]);
            if ( auxDir != null) {
                if ( !auxDir['options']['type'].includes('doc') ) {
                    file = auxDir;
                    $('#input .path').text(file['options']['path']);
                } else {
                    newLine((command[0]+': '+command[1]+' is not a directory').replace(/ /g,'\xa0'));
                }
            }
            return;
        default:
            newLine(command[0]+': can not access multiple path'.replace(/ /g,'\xa0'));
    }
}

/* ================================================================== CLEAR =*/
function clearCMD(command){
    switch ( command.length ) {
        case 1:
                for ( let i = MAX_LINES; i > 0; i-- )
                    divs += "<div id='"+i+"'></div>\n";
                $('#terminal').html(divs);
            break;
        default:
            newLine("Usage: "+command[0]+" [options]".replace(/ /g,'\xa0'));
            newLine(" ".replace(/ /g,'\xa0'));
            newLine("Options:".replace(/ /g,'\xa0'));
            newLine("  -T TERM     use this instead of $TERM".replace(/ /g,'\xa0'));
            newLine("  -V          print curses-version".replace(/ /g,'\xa0'));
            newLine("  -x          do not try to clear scrollback".replace(/ /g,'\xa0'));
    }
}

/* ===================================================================== CP =*/
function cpCMD(command){
    switch (command.length) {
        case 1:
            newLine(command[0]+": needs a file as operator".replace(/ /g,'\xa0'));
            newLine("Try '"+command[0]+" --help' for extra info.".replace(/ /g,'\xa0'));
            return;
        case 2:
            newLine((command[0]+": needs a file destination after '"+command[1]+"'").replace(/ /g,'\xa0'));
            newLine("Try '"+command[0]+" --help' for extra info.".replace(/ /g,'\xa0'));
            return;
        default:
            let length = command.length-1;
            if (length == 2) {
                let dstDir = openDir(command[2],"");
                let dstPath = removeEmpty(command[length].split("/"));
                let dstName = dstPath.pop();
                let newName = false;
                if ( dstDir == null ) {
                    dstDir = openDir(dstPath.join("/"),command[0]);
                    if ( dstDir == null ) return;
                    newName = true;
                }
                let srcDir = openDir(command[1],command[0]);
                if ( srcDir != null) {
                    if ( srcDir['options']['edit'] ) {
                        if ( !newName )
                            dstName = srcDir['options']['name'];
                        if (dstDir[dstName] == undefined)
                            dstDir[dstName] = JSON.parse(JSON.stringify(srcDir));
                        else
                            dstDir[dstName] = Object.assign({}, dstDir[dstName], srcDir);
                        path_change_recursive(dstDir[dstName],dstDir['options']['dir']+dstDir['options']['name']+"/",dstName);
                    } else {
                        newLine((command[0]+": not enough permissions: '"+command[1]+"' no able to edit").replace(/ /g,'\xa0'));
                    }
                }
            } else {
                let dstDir = openDir(command[length],command[0]);
                if ( dstDir != null ) {
                    for ( let i = 1; i < length; i++ ) {
                        let srcDir = openDir(command[i],command[0]);
                        let srcName = srcDir['options']['name'];
                        if ( srcDir != null) {
                            if ( srcDir['options']['edit'] ) {
                                if (dstDir[srcName] == undefined)
                                    dstDir[srcName] = JSON.parse(JSON.stringify(srcDir));
                                else
                                    dstDir[srcName] = Object.assign({}, dstDir[srcName], srcDir);
                                path_change_recursive(dstDir[srcName],dstDir['options']['dir']+dstDir['options']['name']+"/",srcName);
                            } else {
                                newLine((command[0]+": not enough permissions: '"+command[i]+"' no able to edit").replace(/ /g,'\xa0'));
                            }
                        }
                    }
                }
            }
    }
}

/* =================================================================== ECHO =*/
function echoCMD(command){
    let string = '';
    for ( let i = 1; i < command.length; i++) {
        if ( command[i].startsWith('$') ) {
            let name = command[i].substring(1,command[i].length);
            if ( name in envVar ) {
                string += envVar[name]+'\xa0';
            } else {
                string += '\xa0';
            }
        } else {
            string += command[i]+'\xa0';
        }
    }
    newLine(string+'\xa0');
}

/* =================================================================== EXIT =*/
function exitCMD(command){
    window.opener = self;
    window.close();
}

/* =================================================================== HELP =*/
function helpCMD(command){
    newLine(" - HELP ----------------------------------------------".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" Since you can not enjoy my website, and spend one of".replace(/ /g,'\xa0'));
    newLine(" the best times of the day, I will provide some links".replace(/ /g,'\xa0'));
    newLine(" for you to hang out, although I warn you that it is".replace(/ /g,'\xa0'));
    newLine(" not as rewarding as the use of my website, although".replace(/ /g,'\xa0'));
    newLine(" it is not bad either.".replace(/ /g,'\xa0'));
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" Links:".replace(/ /g,'\xa0'));
    newLine("   Profiles:".replace(/ /g,'\xa0'));
    newLine('\xa0\xa0\xa0\xa0\xa0- <a class="opengit" target="_blank" href="https://github.com/jonsomarlo">github: Jonso Marlo</a>');
    newLine('\xa0\xa0\xa0\xa0\xa0- <a class="openlinked" target="_blank" href="https://www.linkedin.com/in/juan-martinez-41a4261a9/">linkeding: Juan Martinez</a>');
    newLine(" ".replace(/ /g,'\xa0'));
    newLine("   CV:".replace(/ /g,'\xa0'));
    newLine('\xa0\xa0\xa0\xa0\xa0- <a class="open" target="_blank" href="anonymous/curriculum/curriculum_es.pdf">CV: Spanish</a>');
    newLine('\xa0\xa0\xa0\xa0\xa0- <a class="open" target="_blank" href="anonymous/curriculum/curriculum_en.pdf">CV: English</a>');
    newLine(" ".replace(/ /g,'\xa0'));
    newLine("   Projects:".replace(/ /g,'\xa0'));
    newLine('\xa0\xa0\xa0\xa0\xa0- <a class="opengit" target="_blank" href="https://github.com/jonsomarlo/javascript_term/tree/v0.1">JavaScript Command Line</a>');
    newLine(" ".replace(/ /g,'\xa0'));
    newLine(" -----------------------------------------------------".replace(/ /g,'\xa0'));
}

/* =================================================================== INFO =*/
function infoCMD(command){
    newLine('Last update: 30.04.29'.replace(/ /g,'\xa0'));
    newLine('By: Obvious me'.replace(/ /g,'\xa0'));
}

/* ===================================================================== LS =*/
function lsCMD(command) {
    switch ( command.length ) {
        case 1:
            let auxPath = Object.keys(file).sort();
            let list = [];
            for ( let i = 0; i < auxPath.length; i++) {
                if ( auxPath[i] != 'options' && !auxPath[i].startsWith('.')) {
                    if ( !file[auxPath[i]]['options']['type'].includes('open') )
                        list.push('<span class="'+file[auxPath[i]]['options']['type']+'">'+auxPath[i]+'</span>');
                    else
                        list.push('<a class="'+file[auxPath[i]]['options']['type']+'" target="_blank" href="'+file[auxPath[i]]['options']['url']+'">'+auxPath[i]+'</a>');
                }
            }
            list_print_in_columns(list,false);
            return;

        default:
            for ( let i = 1; i < command.length; i++) {
                if (command.length > 2) {
                    if (i > 1)
                        newLine('\xa0');
                    newLine((command[i]+':').replace(/ /g,'\xa0'));
                }
                let auxDir = openDir(command[i],command[0]);
                if ( auxDir != null) {
                    if ( auxDir['options']['type'].includes('folder') ) {
                        let auxPath = Object.keys(auxDir).sort();
                        let list = [];
                        for ( let i = 0; i < auxPath.length; i++) {
                            if ( auxPath[i] != 'options' && !auxPath[i].startsWith('.'))
                                if ( !auxDir[auxPath[i]]['options']['type'].includes('open') )
                                    list.push('<span class="'+auxDir[auxPath[i]]['options']['type']+'">'+auxPath[i]+'</span>');
                                else
                                    list.push('<a class="'+auxDir[auxPath[i]]['options']['type']+'" target="_blank" href="'+auxDir[auxPath[i]]['options']['url']+'">'+auxPath[i]+'</a>');
                        }
                        list_print_in_columns(list,false);
                    } else {
                        newLine((command[0]+': '+command[i]+' is not a directory').replace(/ /g,'\xa0')+"</span>");
                    }
                }
            }
    }
}

/* ==================================================================== MAN =*/
function manCMD(command){
    switch ( command.length ) {
        case 1:
            newLine(command[0]+": needs a name as operator".replace(/ /g,'\xa0'));
            newLine(("Try '"+command[0]+" man' for extra info.").replace(/ /g,'\xa0'));
            break;
        case 2:
            if ( !(command[1] in userCommand) && !(command[1] in superCommand) ) {
                newLine((command[1]+': no entry in manual').replace(/ /g,'\xa0'));
            } else {
                try {
                    BOOLEAN_MAN = true;
                    shutup(true);
                    fetch('https://cors-anywhere.herokuapp.com/'+'https://linux.die.net/man/1/'+command[1])
                        .then(function (response) {
                            switch (response.status) {
                                case 200:
                                    let message = response.text();
                                    message.then(function(value) {
                                        value = value.substring(
                                            value.lastIndexOf("<!-- google_ad_section_start -->") + 33,
                                            value.lastIndexOf("<!-- google_ad_section_end -->")
                                        );
                                        document.getElementById("command").style.display = "none";
                                        document.getElementById("man").style.display = "block";
                                        $('#man .content').html(value+"<br><br>");
                                        $('#man #page').text(command[1]);
                                        window.scrollTo(0,0);
                                        shutup(false);
                                    });
                                    return;
                                default:
                                    newLine((command[1]+': no entry in manual').replace(/ /g,'\xa0'));
                                    shutup(false);
                                    BOOLEAN_MAN = false;
                            };
                        })
                } catch (e) {
                    newLine((command[0]+': error loking for'+command[1]).replace(/ /g,'\xa0'));
                    shutup(false);
                    BOOLEAN_MAN = false;
                }
            }
            break;
        default:
            newLine((command[0]+": too many arguments").replace(/ /g,'\xa0'));
    }
}

/* ================================================================ MESSAGE =*/
function messageCMD(command) {
    switch (command.length) {
        case 1:
            newLine(" ".replace(/ /g,'\xa0'));
            newLine("\xa0\xa0This is an anonimous message.".replace(/ /g,'\xa0'));
            newLine(" ".replace(/ /g,'\xa0'));
            $('#input .prompt').text('');
            $('#input .path').text('');
            $('#input .dollar').text('\xa0\xa0Message:\xa0');
            $('#input .prev').text('');
            $('#input .caret').text('\xa0');
            $('#input .next').text('');
            BOOLEAN_MESSAGE = true;
            break;
        default:
            newLine(command[0]+": too many arguments".replace(/ /g,'\xa0'));
    }
}

/* ================================================================== MKDIR =*/
function mkdirCMD(command){
    switch ( command.length ) {
        case 1:
            newLine(command[0]+": needs a name as operator".replace(/ /g,'\xa0'));
            newLine("Try '"+command[0]+" --help' for extra info.".replace(/ /g,'\xa0'));
            return;
        default:
            for ( let i = 1; i < command.length; i++ ) {
                let path = command[i].split("/");
                let dir = path.pop();
                let auxDir = path.length > 0 ? openDir(path.join("/"),command[0]) : file;
                if ( auxDir != null) {
                    let auxPath = Object.keys(auxDir).sort();
                    if ( !auxPath.includes(dir) ) {
                        auxDir[dir] = {
                            'options': {
                                'dir': auxDir['options']['dir']+auxDir['options']['name']+"/",
                                'name': dir,
                                'path': (auxDir['options']['dir']+auxDir['options']['name']+"/"+dir+"/").replace(/\/home\/anonymous\//g,""),
                                'type': 'folder',
                                'allow': 1,
                                'edit': 1,
                                'content': [
                                    " ",
                                ]
                            },
                            '.': { 'options': { 'type': 'system', }, },
                            '..': { 'options': { 'type': 'system', }, },
                        };
                    } else {
                        newLine((command[0]+": alredy exist directory "+command[i]).replace(/ /g,'\xa0'));
                    }
                }
            }
    }
}

/* ===================================================================== MV =*/
function mvCMD(command){
    switch (command.length) {
        case 1:
            newLine(command[0]+": needs a file as operator".replace(/ /g,'\xa0'));
            newLine("Try '"+command[0]+" --help' for extra info.".replace(/ /g,'\xa0'));
            break;
        case 2:
            newLine((command[0]+": needs a file destination after '"+command[1]+"'").replace(/ /g,'\xa0'));
            newLine("Try '"+command[0]+" --help' for extra info.".replace(/ /g,'\xa0'));
            break;
        default:
            let length = command.length-1;
            if (length == 2) {
                let dstDir = openDir(command[2],"");
                let dstPath = removeEmpty(command[length].split("/"));
                let dstName = dstPath.pop();
                let newName = false;
                if ( dstDir == null ) {
                    dstDir = openDir(dstPath.join("/"),command[0]);
                    if ( dstDir == null ) return;
                    newName = true;
                }
                let srcDir = openDir(command[1],command[0]);
                if ( srcDir != null) {
                    if ( srcDir['options']['edit'] ) {
                        if ( !newName )
                            dstName = srcDir['options']['name'];
                        let srcCpy = srcDir;
                        srcDir = openDir(srcCpy['options']['dir'],command[0]);
                        if (dstDir[dstName] == undefined)
                            dstDir[dstName] = srcCpy;
                        else {
                            dstDir[dstName] = Object.assign({}, dstDir[dstName], srcDir);
                        }
                        delete srcDir[srcCpy['options']['name']];
                        path_change_recursive(dstDir[dstName],dstDir['options']['dir']+dstDir['options']['name']+"/",dstName);
                    } else {
                        newLine((command[0]+": not enough permissions: '"+command[1]+"' no able to edit").replace(/ /g,'\xa0'));
                    }
                }
            } else {
                let dstDir = openDir(command[length],command[0]);
                if ( dstDir != null ) {
                    for ( let i = 1; i < length; i++ ) {
                        let srcDir = openDir(command[i],command[0]);
                        let srcCpy = srcDir;
                        let srcName = srcDir['options']['name'];
                        if ( srcDir != null) {
                            if ( srcDir['options']['edit'] ) {
                                srcDir = openDir(srcDir['options']['dir'],command[0]);
                                if (dstDir[srcName] == undefined)
                                    dstDir[srcName] = srcCpy;
                                else {
                                    dstDir[srcName] = Object.assign({}, dstDir[srcName], srcDir);
                                }
                                delete srcDir[srcName];
                                path_change_recursive(dstDir[srcName],dstDir['options']['dir']+dstDir['options']['name']+"/",srcName);
                            } else {
                                newLine((command[0]+": not enough permissions: '"+command[i]+"' no able to edit").replace(/ /g,'\xa0'));
                            }
                        }
                    }
                }
            }
    }
}

/* =================================================================== OPEN =*/
function openCMD(command){
    switch (command.length) {
        case 1:
            newLine(command[0]+': no path selected'.replace(/ /g,'\xa0'));
        default:
            for ( let i = 1; i < command.length; i++ ) {
                let auxDir = openDir(command[i],'open');
                if ( auxDir != null ) {
                    if ( auxDir['options']['type'].includes('open') ) {
                        let win = window.open(auxDir['options']['url'],'_blank');
                        win.focus();
                    } else {
                        newLine((command[0]+': '+command[i]+' error while opening').replace(/ /g,'\xa0'));
                        if (auxDir['options']['type'].includes('doc') ) {
                            newLine(('-- you should try "cat"').replace(/ /g,'\xa0'));
                        }
                    }
                }
            }
    }
}

/* =============================================================== PRINTENV =*/
function printenvCMD(command){
    let variables = Object.keys(envVar);
    switch (command.length) {
        case 1:
            for ( let i = 0; i < variables.length; i++)
                newLine((variables[i]+"="+envVar[variables[i]]).replace(/ /g,'\xa0'));
            return;
        default:
            for ( let i = 1; i < command.length; i++ )
                if ( variables.includes(command[i]) )
                    newLine(envVar[command[i]].replace(/ /g,'\xa0')+'\xa0');
    }
}

/* ==================================================================== PWD =*/
function pwdCMD(command){
    switch (command.length) {
        case 1:
            newLine((file['options']['dir']+file['options']['name']).replace(/ /g,'\xa0'));
            return;
        default:
            newLine((command[0]+": too many arguments").replace(/ /g,'\xa0'));
    }
}

/* ===================================================================== RM =*/
function rmCMD(command){
    switch (command.length) {
        case 1:
            newLine(command[0]+': no path selected'.replace(/ /g,'\xa0'));
            newLine("Try '"+command[0]+" --help' for extra info.".replace(/ /g,'\xa0'));
        default:
            for ( let i = 1; i < command.length; i++ ) {
                let path = command[i].split("/");
                let doc = path.pop();
                let auxDir = openDir(path.join("/"),command[0]);
                if ( auxDir != null ) {
                    if (doc != "" && auxDir[doc]['options']['type'].includes('doc') ) {
                        delete auxDir[doc];
                    } else {
                        newLine((command[0]+": can't remove "+command[1]+': is not a file').replace(/ /g,'\xa0'));
                    }
                }
            }
    }
}

/* ================================================================== CLEAR =*/
function rmdirCMD(command){
    switch (command.length) {
        case 1:
            newLine(command[0]+': no path selected'.replace(/ /g,'\xa0'));
            newLine("Try '"+command[0]+" --help' for extra info.".replace(/ /g,'\xa0'));
        default:
            for ( let i = 1; i < command.length; i++ ) {
                let path = command[i].split("/");
                let dir = "";
                while ( dir == "" ) {
                    if ( path.length > 0 )
                        dir = path.pop();
                    else {
                        newLine((command[0]+": can't remove "+command[1]+': not allow').replace(/ /g,'\xa0'));
                        return;
                    }
                }
                let auxDir = openDir(path.join("/"),command[0]);
                if ( auxDir != null ) {
                    if (auxDir[dir]['options']['type'].includes("folder")) {
                        if ( auxDir[dir]['options']['allow'] == 0 ) {
                            newLine((command[0]+": can't remove "+command[1]+': not allow').replace(/ /g,'\xa0'));
                        } else if ( Object.keys(auxDir[dir]).length > 3 ) {
                            newLine((command[0]+": can't remove "+command[1]+': not empty').replace(/ /g,'\xa0'));
                        } else {
                            delete auxDir[dir];
                        }
                    } else {
                        newLine((command[0]+": can't remove "+command[1]+': is not a directory').replace(/ /g,'\xa0'));
                    }
                }
            }
    }
}

/* ===================================================== SPANISH POLITICIAN =*/
function spanishPoliticianCMD(command){
    switch (command.length) {
        case 1:
            shutup(true);
            fetch('https://cors-anywhere.herokuapp.com/'+'http://www.subliminalia.com/generator/argumentario')
                .then(function (response) {
                    switch (response.status) {
                        case 200:
                            var message = response.text();
                            message.then(function(value) {
                                value = value.replace('(("- ','(("');
                                value = value.replace('document.write(abstract)','return abstract');
                                var fun = new Function (value);
                                newLine(fun().replace(/ /g,'\xa0'));
                                newLine(" ¯ ¯¯¯¯¯¯¯¯¯\\|¯¯¯¯¯¯ ¯ ".replace(/ /g,'\xa0'));
                                newLine("          \\(·>· )/     ".replace(/ /g,'\xa0'));
                                newLine("           _|__|_      ".replace(/ /g,'\xa0'));
                                newLine("           |    | ".replace(/ /g,'\xa0')+'<span class="quote">Message by:</span>');
                                newLine("           |    | ".replace(/ /g,'\xa0')+'<span class="quote">www.subliminalia.com</span>');
                                shutup(false);
                            });
                            return;
                        default:
                            newLine('The spanish politician is doing spanish political "things"'.replace(/ /g,'\xa0'));
                            newLine('("things" def: nothing, corruption, is late ...).'.replace(/ /g,'\xa0'));
                            newLine(" ¯ ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ ¯ ".replace(/ /g,'\xa0'));
                            newLine("     *chirp*           ".replace(/ /g,'\xa0'));
                            newLine(" *chirp*  ______       ".replace(/ /g,'\xa0'));
                            newLine("          |    |       ".replace(/ /g,'\xa0'));
                            newLine("          |    |       ".replace(/ /g,'\xa0'));
                            shutup(false);
                    }
                })
            return;
        default:
            command.shift();
            newLine(command.join('\xa0'));
            newLine(" ¯ ¯¯¯¯¯¯¯¯¯\\|¯¯¯¯¯¯ ¯ ".replace(/ /g,'\xa0'));
            newLine("          \\(·>· )/     ".replace(/ /g,'\xa0'));
            newLine("           _|__|_      ".replace(/ /g,'\xa0'));
            newLine("           |    |      ".replace(/ /g,'\xa0'));
            newLine("           |    |      ".replace(/ /g,'\xa0'));
            shutup(false);
    }
}

/* ================================================================== SUDO =*/
function sudoCMD(command) {
    switch (command.length) {
        case 1:
            newLine("usage: "+command[0]+" -h | -K | -k | -V".replace(/ /g,'\xa0'));
            newLine("usage: "+command[0]+" -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]".replace(/ /g,'\xa0'));
            newLine("usage: "+command[0]+" -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]".replace(/ /g,'\xa0'));
            newLine("usage: "+command[0]+" [-AbEHknPS] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]".replace(/ /g,'\xa0'));
            newLine("usage: "+command[0]+" -e [-AknS] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...".replace(/ /g,'\xa0'));
            break;
        default:
            $('#input .prompt').text('');
            $('#input .path').text('');
            $('#input .dollar').text('[sudo]\xa0password\xa0for\xa0anonymous:\xa0');
            $('#input .prev').text('');
            $('#input .caret').text('\xa0');
            $('#input .next').text('');
            BOOLEAN_SUDO = true;
    }
}

/* ================================================================== TOUCH =*/
function touchCMD(command){
    switch (command.length) {
        case 1:
            newLine("touch: needs a file as operator".replace(/ /g,'\xa0'));
            newLine("Try 'touch --help' for extra info.".replace(/ /g,'\xa0'));
        default:
            for ( let i = 1; i < command.length; i++ ) {
                let path = command[i].split("/");
                let doc = path.pop();
                let auxDir = path.length > 0 ? openDir(path.join("/"),'touch') : file;
                if ( auxDir != null) {
                    let auxPath = Object.keys(auxDir).sort();
                    if ( !auxPath.includes(doc) )
                        auxDir[doc] = {
                            'options': {
                                'dir': auxDir['options']['dir']+auxDir['options']['name']+"/",
                                'name': doc,
                                'type': 'doc',
                                'allow': 1,
                                'edit': 1,
                                'content': [
                                    " ",
                                ]
                            }
                        };
                }
            }
            return;
    }
}

/* ================================================================== TREE =*/
function treeCMD(command) {
    switch (command.length) {
        case 1:
            newLine('<span class="folder">.</span>');
            treeRec(file['options']['dir']+file['options']['name']+"/","")
            newLine('\xa0');
            break;
        default:
            for ( let i = 1; i < command.length; i++) {
                let auxDir = openDir(command[i],'tree');
                if ( !auxDir['options']['type'].includes('open') )
                    newLine('<span class="'+auxDir['options']['type']+'">'+command[i]+'</span>');
                else
                    newLine('<a class="'+auxDir['options']['type']+'" target="_blank" href="'+auxDir['options']['url']+'">'+command[i]+'</a>');
                treeRec(auxDir['options']['dir']+auxDir['options']['name']+"/","")
                newLine('\xa0');
            }
    }
}
