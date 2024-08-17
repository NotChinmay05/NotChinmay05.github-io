var level = 1;
var gameOver = true;
var seqArr = [];
var buttons = document.querySelectorAll('.btn');
var correctInputs = 0;


function playSound(sound) {
    var audio = new Audio(sound);
    audio.play();
}

function buttonEvent(button) {
    button.classList.add('pressed');
    playSound("./sounds/" + button.classList[1] + ".mp3");

    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}


function simonStart() {
    gameOver = false;
    correctInputs = 0;
    $('#level-title').text('Level ' + level);

    var randomButton = buttons[Math.floor(Math.random() * 4)];
    seqArr.push(randomButton);

    var duration = 500
    for (let i = 0; i < seqArr.length; i++) {
        setTimeout(() => {

            buttonEvent(seqArr[i]);

        }, duration);
        duration += 500;
    }
}

$(document).keydown(keyDownEvents);
$('.btn').click(clickEvents);

function keyDownEvents(event) {
    if (event.key === "Enter" && gameOver === true) {
        $('body').removeClass('game-over');
        simonStart();
    }
}

function clickEvents(event) {
    buttonEvent(event.target);
    if (seqArr[correctInputs] === event.target){
        correctInputs++;

        if (correctInputs === (seqArr.length)){
            setTimeout(() => {
                level++;
                simonStart() ;
            }, 1000);
        }
    }
    else if (gameOver === false && correctInputs !== (seqArr.length)){
        $('#level-title').html("Game Over!!! Score: " + (level -1) + "<br>Press &lt;Enter&gt; to Start");
        seqArr = [];
        level = 1;
        gameOver = true;
        
        playSound('./sounds/wrong.mp3');
        $('body').addClass('game-over');
    }
}
