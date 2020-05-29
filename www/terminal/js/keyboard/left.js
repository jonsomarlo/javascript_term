
function left() {
    var prev = $('#input .prev').text();
    var caret = $('#input .caret').text();
    var next = $('#input .next').text();

    var length = prev.length - 1;
    if ( length >= 0 ) {
        $('#input .next').text(caret+next);
        $('#input .caret').text(prev[length]);
        $('#input .prev').text(prev.substring(0,length));
    }
}
