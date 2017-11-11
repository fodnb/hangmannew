// var night = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
// var x = 0;
// var word = [];
// var wins = 0;
// var missArray = [];
// var losses = 0;

var word = ['PUMPKIN', 'CANDY', 'SKELETON', 'GHOUL', 'GOBLIN', 'COSTUME', 'GHOST', 'HALLOWEEN', 'VAMPIRE', 'ZOMBIE','GUILOTENE', 'TRICK', 'TREAT'];
var chosenWord = word[Math.floor(Math.random() * word.length)];
var count = 0;
var win = 0;
var loss = 0;
var correctGuesses = 0;
var wrongGuesses = 0;
var guessesRemaining = 6;
var guessguessed = 0;


var hitArray = [];
var answerArray = [];
var missArray = [];
var letters = [];

var dashes;
var differentNumbers;









function startGame() {

    $(".newDiv").empty();
    $("#image").empty();
    $("#pWin").empty();
    $("#pLoss").empty();

    letters = ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    answerArray = [];
    missArray = [];
    hitArray = [];

    chosenWord = word[Math.floor(Math.random() * word.length)];
    document.getElementById('start').innerHTML = "TRY YOUR LUCK AT HANGMAN!";
    console.log(chosenWord);


    for (var i = 0; i < chosenWord.length; i++) {
        answerArray[i] = "_";
    }
    var dashes = answerArray.toString();
    dashes = dashes.replace(/\,/g, " ");
       
    var wordLength = chosenWord.length;
    differentNumbers = wordLength;
    lettersinword();
    console.log(differentNumbers + "differentNumbers");
    correctGuesses = 0;
    wrong = 0;
    guessesRemaining = 6;
   
    document.getElementById("demo").innerHTML = answerArray.join("  ");
    console.log(typeof + dashes);
    console.log(typeof + answerArray);
    document.getElementById('misses').innerHTML = "ALPHABET GRAVEYARD";
    document.getElementById('tried').innerHTML = "You have " + guessesRemaining + " guesses!"
    document.getElementById('graveyard').innerHTML = missArray.join(" ");
     document.getElementById('wins').innerHTML = "You've Won: " + win + " times!";
}


// this fixes words with the same letter
function lettersinword() {
    var sameLetter = 0;
    for (var n = 0; n < chosenWord.length; n++) {
        for (var i = 0; i < chosenWord.length; i++) {
            if (chosenWord.charAt(n) == chosenWord[i]) {
                sameLetter++;
                count++;
            } //ends 1st if statement

        } //ends first for statement
        i = 0;
        count = 0;

    } // ends second for statement
    console.log(sameLetter);
    differentNumbers = (sameLetter - chosenWord.length) / 2;// was 2
    console.log(sameLetter);
    differentNumbers = chosenWord.length - differentNumbers;
    console.log(differentNumbers);

} // ends function





function checkLetters() {

    for (var i = 0; i < chosenWord.length; i++) {
        if (userguess.toUpperCase() === chosenWord[i]) {
            answerArray[i] = userguess.toUpperCase();
          
            document.getElementById("demo").innerHTML = answerArray.join("  ");
            correctGuesses++;

            console.log(letters);



        } else if (userguess != chosenWord[i]) {
            wrong++;
        }
        if (wrong != chosenWord.length) {
            document.getElementById('start').innerHTML = "You got that one right!";
        } else if (wrong === chosenWord.length) {
            document.getElementById('start').innerHTML = "WRONG!";
            missArray.push(userguess.toUpperCase());
            document.getElementById('misses').innerHTML = "WRONG GUESSES:";
            document.getElementById('graveyard').innerHTML = missArray.join(" ");
            guessesRemaining--;
            document.getElementById('tried').innerHTML = "You have " + guessesRemaining + " guesses left!";
            console.log(missArray);
        }
    }
    if (correctGuesses >= 1) {

        hitArray.push(userguess.toUpperCase());
    }
    wrong = 0;
    correctGuesses = 0;
}

function handlerGuess() {

    if ((hitArray.length === chosenWord.length) || (differentNumbers === hitArray.length)) {

        document.getElementById('start').innerHTML = "You WON!";
        correctGuesses = 0;
        win++;
        guessesRemaining = 6;
        document.getElementById('wins').innerHTML = "You've Won: " + win + " times!";
        // startGame();
        midScreenWin();
    } else if (guessesRemaining === 0) {

        document.getElementById('start').innerHTML = "You LOSE";
        loss++;
        document.getElementById('losses').innerHTML = "You've Lost: " + loss + " times!";
        midScreenLoss();
    }
}

//need to find a way to check if a letter was guessed and if it was to get next guess
function checkArray(array) {
    for (var i = 0; i < array.length; i++) {
        if (userguess === array[i]) {
            guessguessed++;
        }
    }
}

function midScreenLoss(){
    letters = [];
    loss = loss;
    console.log(win);
    console.log(letters); 
    $("#demo").empty();
    $("#misses").empty();
    $("#tried").empty();
    $("#graveyard").empty();
    // $("#bigDiv").empty();
    var newDiv = $("<div>");
    var newImage = $("<img>");
    var newP = $("<p>");
    newDiv.attr("class", "newDiv");
    newP.attr("id", "pWin")
    newImage.attr("src", "assets/images/hangmamimage.jpg");
    newImage.attr("id", "image");
    newP.html("YOU LOSE!");
    newDiv.append(newP);
    newDiv.append(newImage);
    $("#losses").append(newDiv);
    setTimeout(startGame, 3000);

}

function midScreenWin(){
     letters = [];
    win = win;
    console.log(win);
    console.log(letters);
    $("#demo").empty();
    $("#misses").empty();
    $("#tried").empty();
    $("#graveyard").empty();
    var newDiv2 = $("<div>");
    var newImage2 = $("<img>");
    var newP2 = $("<p>");
    newP2.attr("id", "pLoss")
    newDiv2.attr("class", "newDiv");
    newImage2.attr("src", "assets/images/halloweenimg3.jpg");
    newImage2.attr("id", "image");
    newP2.html("MUAH HA HA!");
    newDiv2.append(newP2);
    newDiv2.append(newImage2);
    $("#wins").append(newDiv2);
    setTimeout(startGame, 3000);

}




startGame();

console.log(chosenWord);

document.getElementById('start').innerHTML = "Choose Your Letters Wisely!"

document.onkeypress = function(event) { 
        guess = event.key;
        userguess = guess.toUpperCase();    
        console.log(userguess);
        checkArray(letters);


        if (guessguessed > 0) {
            guessguessed = 0;
            checkArray(answerArray);
            checkArray(hitArray);
            checkArray(missArray);
            console.log(guessguessed);



            if (guessguessed > 0) {
                guessguessed = 0;
            } else {
                checkLetters();
                console.log(answerArray);
                console.log()
                handlerGuess();
                console.log(missArray);
                console.log(hitArray);

            }
        }
    }
    // if it's in the alphabet.  go throught the array and check.  if it gets a hit
