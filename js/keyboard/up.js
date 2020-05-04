
function up() {
    if ( current == 0 )
        currentCmd = $('#input').html();

    if ( current < commands.length )
        current++;

    if ( current != 0 ) {
        var move = commands.length - current;
        var length = commands[move].length - 1;
        $('#input .prev').text(commands[move].substring(0,length));
        $('#input .caret').text(commands[move][length]);
        $('#input .next').text('');
    }
}
