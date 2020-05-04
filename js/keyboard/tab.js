
var tabulate = 0;
function tab() {
    var prev = $('#input .prev').text();
    var command = removeEmpty(prev.split('\xa0'));

    if ( prev.replace(/\xa0/g,"").length != 0 ) {
        if ( prev.length > 0 && prev[prev.length-1] == '\xa0' )
            command.push('');
    }

    tabulate++;
    var prediction = [];
    switch ( command.length ) {
        case 0: // nada
            tabulate = 0;
            return;
        case 1: // escribiendo 1
            var auxList = Object.keys(superCommand);
            auxList = auxList.concat(Object.keys(userCommand));

            auxList = auxList.sort();
            for( let i = 0; i < auxList.length; i++ ) {
                if (auxList[i].startsWith(command[0])) {
                    prediction.push(auxList[i]);
                }
            }

            var endPred = prediction[0];
            for ( let i = 1; i < prediction.length; i++ ) {
                for ( let j = command[0].length; j < endPred.length; j ++ ){
                    if ( endPred[j] != prediction[i][j] ) {
                        endPred = endPred.substring(0,j);
                        break;
                    }
                }
            }

            if ( prediction.length == 1 )
                endPred += '\xa0';

            if ( prediction.length > 0 ) {
                $("#input .prev").text(endPred);
                if ( endPred == prev ) {
                    if ( tabulate > 1 ) {
                        enter(false,false);
                        list_print_in_columns(prediction,true);
                    }
                } else { tabulate = 0; }
            } else { tabulate = 0; }
            break;
        case 2:
            var compare = "";
            var auxList = [];
            var auxDir = file;
            if ( Object.keys(superCommand).includes(command[0]) ) {
                auxList = Object.keys(userCommand);
                compare = command[1];
            } else {
                var auxPath = command[1].split('/').slice(0, -1).join('/');
                var auxDir = openDir(auxPath,'');
                if ( auxDir != null ) {
                    var auxFolders = Object.keys(auxDir).filter(word => word != 'options');
                    for( let i = 0; i < auxFolders.length; i++ ) {
                        var folder = auxDir[auxFolders[i]]['options']['type'].includes('folder') || auxFolders[i]=='..' ? "/" : "";
                        auxList.push(auxFolders[i]+folder);
                    }
                    compare = command[1].split('/').pop();
                    if (compare == "") {
                        auxList = auxList.filter(word => !word.startsWith("."))
                    }
                    if (command[0] == "cd") {
                        auxList = auxList.filter(word => word.includes("/"))
                    }
                }
            }

            auxList = auxList.sort();
            for( let i = 0; i < auxList.length; i++ ) {
                if (auxList[i].startsWith(compare)) {
                    prediction.push(auxList[i]);
                }
            }

            var endPred = prediction[0];
            for ( let i = 1; i < prediction.length; i++ ) {
                for ( let j = compare.length; j < endPred.length; j ++ ){
                    if ( endPred[j] != prediction[i][j] ) {
                        endPred = endPred.substring(0,j);
                        break;
                    }
                }
            }

            var pred = '';
            if ( prediction.length > 0 ) {
                var length = compare.length;
                pred = endPred.substring(length,endPred.length);
                if ( pred.length == 0 ) {
                    if ( tabulate > 1 ) {
                        enter(false,false);
                        list_print_in_columns(prediction,true);
                    }
                } else { tabulate = 0; }
            } else {
                if ( prev.endsWith("/..") || prev.endsWith("\xa0..") )
                    pred = '/';
                tabulate = 0;
            }

            $("#input .prev").text(prev+pred);
            break;
        default:
            var compare = '';
            var auxList = [];
            var auxPath = command[command.length-1].split('/').slice(0, -1).join('/');
            var auxDir = openDir(auxPath,'');
            if ( auxDir != null ) {
                var auxFolders = Object.keys(auxDir).filter(word => word != 'options');
                for( let i = 0; i < auxFolders.length; i++ ) {
                    var folder = auxDir[auxFolders[i]]['options']['type'].includes('folder') || auxFolders[i]=='..' ? "/" : "";
                    auxList.push(auxFolders[i]+folder);
                }
                compare = command[command.length-1].split('/').pop();
                if (compare == "") {
                    auxList = auxList.filter(word => !word.startsWith("."))
                }
            }

            auxList = auxList.sort();
            for( let i = 0; i < auxList.length; i++ ) {
                if (auxList[i].startsWith(compare)) {
                    prediction.push(auxList[i]);
                }
            }

            if ( prediction.length == 1 && compare == "" && command.includes(prediction[0])) {
                prediction = [".","..",prediction[0]];
            }

            var endPred = prediction[0];
            for ( let i = 1; i < prediction.length; i++ ) {
                for ( let j = compare.length; j < endPred.length; j ++ ){
                    if ( endPred[j] != prediction[i][j] ) {
                        endPred = endPred.substring(0,j);
                        break;
                    }
                }
            }

            var pred = '';
            if ( prediction.length > 0 ) {
                var length = compare.length;
                pred = endPred.substring(length,endPred.length);
                if ( pred.length == 0 ) {
                    if ( tabulate > 1 ) {
                        enter(false,false);
                        list_print_in_columns(prediction,true);
                    }
                } else { tabulate = 0; }
            } else {
                if ( prev.endsWith("/..") || prev.endsWith("\xa0..") )
                    pred = '/';
                tabulate = 0;
            }

            $("#input .prev").text(prev+pred);
            break;
    }
}
