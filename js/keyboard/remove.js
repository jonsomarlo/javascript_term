
function remove() {
    var next = $('#input .next').text();
    var length = next.length;
    if ( length > 0 ) {
        $('#input .caret').text(next[0]);
        $('#input .next').text(next.substring(1,length));
    }
}
