
var phrases = {
    10:"Are you looking for 'clear'?",
    25:"The keyboard has more keys, not just the enter key.",
    50:"Seriously check your keyboard, if you don't have any more keys you've been scammed.",
    75:"Be careful the key is heating up from so much use.",
    100:"Imagine if the only key on your keyboard breaks.",
    125:"I see you concentrated.",
    150:"If I were you I would focus my passion on something, what do you think of the cookie clicker?.",
    175:"Better, why don't you work as an elevator operator?.",
    200:"What a fool I am, you would only take clients to the same plant, I withdraw what I said.",
    225:"We have reached 225 times, I give up on you.",
    250:"You are a witness, I present my resignation, I'm going to find some better job.",
    275:"My new job will be: checking that an elevator operator does his job well. It is more interesting than you, they at least press several buttons. Bye.",
}

function againEnter() {
    if ( phrases[repit] != undefined ) {
        newLine(phrases[repit].replace(/ /g,'\xa0'));
        repit++;
        now = new Date().getTime();
        return true;
    }
    return false;
}

function enter( clear, acction) {
    newLine($('#input').html());

    current = 0;
    if ( !BOOLEAN_MUTE )  {
        let command = $('#input .prev').text();
        command += $('#input .caret').text();
        command += $('#input .next').text();

        if ( acction && command.length > 1 )
            commands.push(command);

        if ( clear ) {
            $('#input .prompt').text('anonymous-PC\xa0');
            $('#input .path').text(file["options"]["path"]);
            $('#input .dollar').text('\xa0$\xa0');
            $('#input .prev').text('');
            $('#input .caret').text('\xa0');
            $('#input .next').text('');
        }

        return command;
    }
}
