
function right() {
    var prev = $('#input .prev').text();
    var caret = $('#input .caret').text();
    var next = $('#input .next').text();

    var length = next.length;
    if ( length > 0 ) {
        $('#input .prev').text(prev+caret);
        $('#input .caret').text(next[0]);
        $('#input .next').text(next.substring(1,length));
    }
}
