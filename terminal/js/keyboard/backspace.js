
function backspace() {
    var prev = $('#input .prev').text();
    var length = prev.length - 1;
    if ( length >= 0 ) {
        $('#input .prev').text(prev.substring(0,length));
    }
}
