
function down() {
    if ( current > 0 )
        current--;

    if ( current == 0 ) {
        if (currentCmd != "")
            $('#input').html(currentCmd);
    }
    else {
        var move = commands.length - current;
        var length = commands[move].length - 1;
        $('#input .prev').text(commands[move].substring(0,length));
        $('#input .caret').text(commands[move][length]);
        $('#input .next').text('');
    }
}
