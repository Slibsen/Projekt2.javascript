var msg1 = document.getElementById("message1");
var msg2 = document.getElementById("message2");
var msg3 = document.getElementById("message3");
var scoreMsg = document.getElementById("message4");
var playerGuess = document.getElementById("guess").value;
var numOfRounds = 0;

var answer = randomNum();
var noOfGuesses = 0;
var guessedNumbers = [];
var player = 1;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneTime = 0;
let playerTwoTime = 0;
var timeStart = new Date();
var timeEnd;


function randomNum(){
    return Math.floor(Math.random() * 1000) + 1;
}
function guess(){
    const currentNum = answer;
    const startTime = timeStart;
    play(currentNum, startTime);
}

function play(answer, timeStart){ 
    var scoreMsg = document.getElementById("message4");
    var playerGuess = document.getElementById("guess").value;
    
    if (playerGuess < 1 || playerGuess > 1000 && playerGuess != null){
        alert("Tallet skal være mellem 1-1000");
    }
    else{
        guessedNumbers.push(" " + playerGuess);
        noOfGuesses += 1;

        if (playerGuess < answer){
            msg1.textContent = "Your guess is too low";
            msg2.textContent = "Number of guesses: " + noOfGuesses;
            msg3.textContent = "Guessed numbers: " + guessedNumbers;
        }
        else if (playerGuess > answer){
            msg1.textContent = "Your guess is too high";
            msg2.textContent = "Number of guesses: " + noOfGuesses;
            msg3.textContent = "Guessed numbers: " + guessedNumbers;
        }
        else if (playerGuess == answer){
            timeEnd = new Date();
            msg1.textContent = "Yay you guessed correctly! The number was: " + answer;
            msg2.textContent = "It took " + noOfGuesses + " tries";
            document.getElementById("guessBtn").disabled = true;
            if (player === 1){
                playerOneScore += 10 - noOfGuesses;
                msg3.textContent = "Player one score: " + playerOneScore;
                playerOneTime = (timeEnd - timeStart) / 1000;
            }
            else if (player === 2){
                playerTwoScore += 10 - noOfGuesses;
                msg3.textContent = "Player two Score: " + playerTwoScore;
                playerTwoTime = (timeEnd - timeStart - playerOneTime) / 1000;
            }
            checkWinner();
        }

    }

    if (noOfGuesses > 9 && playerGuess != answer){
        timeEnd = new Date();
        msg1.textContent = "You didn't guess it! You've used your 10 tries";
        msg2.textContent = "The correct answer was: " + answer;
        document.getElementById("guessBtn").disabled = true;
        if (player == 1){
            scoreMsg.textContent = "Player one score: " + playerOneScore;
            playerOneTime = (timeEnd - timeStart) / 1000;
            msg1.innerHTML = "Player one time: " + Math.trunc(playerOneTime) + " seconds";
        }
        else if (player == 2){
            scoreMsg.textContent = "Player two Score: " + playerTwoScore;
            playerTwoTime = (timeEnd - timeStart) / 1000 - playerOneTime;
            msg1.innerHTML = "Player two time: " + Math.trunc(playerTwoTime) + " seconds";
        }
        checkWinner();
    }
}

function checkWinner(){
    if (numOfRounds >= 1){
        if (playerOneScore == playerTwoScore)
        {
            if (playerOneTime < playerTwoTime){
                alert("Player 1 wins the game!!")
            }
            else if (playerTwoTime < playerOneTime){
                alert("Player 2 wins the game!!")
            }
        }
        else if (playerOneScore > playerTwoScore){
            alert("Player 1 wins the game!!")
        }
        else if (playerTwoScore > playerOneScore){
            alert("Player 2 wins the game!!")
        }
    }
}

function newRound(){
    document.getElementById("guessBtn").disabled = false;
    numOfRounds += 1;
    noOfGuesses = 0;
    guessedNumbers = [];
    if (player === 1){
        player = 2;
    }
    else if (player === 2){
        player = 1;
    }
    document.getElementById("guess").value = '';
    console.log(player)
    
}

function reload(){
    window.location.reload();
    document.getElementById("guess").value = '';
}
