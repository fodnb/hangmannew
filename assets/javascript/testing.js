var letters = ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// var words = ['PUMPKIN', 'CANDY', 'SKELETON', 'GHOUL', 'GOBLIN', 'COSTUME', 'GHOST', 'HALLOWEEEEN', 'VAMPIRE', 'ZOMBIE','GUILOTENE', 'TRICK', 'TREAT'];
var words = ['PUMPKIN'];
var chosenWord = words[Math.floor(Math.random() * words.length)];
var starts = 0;
var hitArray = [];
var missArray = [];
var blankAnswer = [];
var letters;
var wins = 0;
var losses = 0;

var checkGuess = (guess) => {
	var count = 0;
	theLetters.forEach((item, i)=>{

		if(guess != theLetters[i]){
			count++;
			// console.log(count);
		}else{

			return hitArray.push(guess);
		}

	});	

		if(count === theLetters.length){
			return missArray.push(guess);
		}	
}

var wordReducedToSingleOccurrence = (word) => {
	var cwArray = word.split("");
	var onlyLetters = [];
	cwArray.sort();
	cwArray = cwArray.forEach((item, i)=> {
		if(cwArray[i] != cwArray[i+1]){
			onlyLetters.push(cwArray[i]);
		}
	});
		return onlyLetters;	
}

var startGame = () => {
	if(words.length === 0){
		$('#start').html('PLAY AGAIN!');
		wins = 0;
		losses =0;	
			// words =  ['PUMPKIN', 'CANDY', 'SKELETON', 'GHOUL', 'GOBLIN', 'COSTUME', 'GHOST', 'HALLOWEEEEN', 'VAMPIRE', 'ZOMBIE','GUILOTENE', 'TRICK', 'TREAT'];
			words = ['PUMPKIN'];
			// $("#demo").empty();
	}
	letters = ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	blankAnswer = [];
	hitArray = [];
	answerArray = [];
	missArray = [];
	if(starts != 0){
	chosenWord = words[Math.floor(Math.random() * words.length)];
	}
	theLetters = wordReducedToSingleOccurrence(chosenWord);
	makeWordLengthVisible();
	// $("#demo").html('Happy Halloween!');
	setTimeout(()=>{
	
		$("#start").html('');
	},2000)
	$("#pic").attr("src", "assets/images/hangman1.jpeg");
	$("#misses").html('');
	$("#tried").html(blankAnswer.toString().replace(/,/g, " "));
	$("#wins").html(`Wins: ${wins}`);
	$("#losses").html(`Losses: ${losses}`);
	words = words.filter((word)=> {
		return word != chosenWord;
	})
	starts++;
}

var win = (array) => {
	if(array.length >= theLetters.length){
		$("#demo").html('You Win!');
		wins++;
		setTimeout(startGame, 3000);
		setTimeout(()=>{
			$("#hangman").empty();
		}, 3000);
	}
}

var lose = (array) => {
	switch(array.length){
		case 0:
		$("#hangman").html();
		break;
		case 1:
		$("#hangman").html("H");
		$("#pic").empty();
		$("#pic").attr("src", "assets/images/hangman2.jpeg");
		break;
		case 2:
		$("#hangman").html("H A");
		$("#pic").attr("src", "assets/images/hangman3.jpeg");	
		break;
		case 3:
		$("#hangman").html("H A N");	
		$("#pic").attr("src", "assets/images/hangman4.jpg");
		break;
		case 4:
		$("#hangman").html("H A N G");
		$("#pic").attr("src", "assets/images/hangman5.jpg");
		break;
		case 5:
		$("#hangman").html("H A N G M");	
		$("#pic").attr("src", "assets/images/hangman6.jpg");
		break;
		case 6:
		$("#hangman").html("H A N G M A");
		$("#pic").attr("src", "assets/images/hangman7.jpg");
		break;
		case 7:
		$("#hangman").html("H A N G M A N!");
		$("#demo").html("YOU LOSE!");
		$("#pic").attr("src", "assets/images/hangman8.jpg");
		losses++;	
		setTimeout(startGame, 3000);
		setTimeout(()=>{
			$("#hangman").empty();
		}, 3000);
		break;


	}	


	// if(array.length >= 6){
	// 	$("#demo").html('You Lose!');
	// 	setTimeout(startGame, 3000);
	// }

}

var game = () => {
	win(hitArray);
	lose(missArray);
}



var makeWordLengthVisible = () => {
	var hangMan = chosenWord.split("");		
	hangMan.forEach((letter, i)=>{
		blankAnswer.push("_");
	});
	return blankAnswer;
}

var checkGuessInAnswer = (guess) => {
	blankAnswer.map((answer, i)=> {
		if(chosenWord.charAt(i) === guess){
			blankAnswer.splice(i, 1, guess);
		}
	})
}

var removeGuessFromLetters = (guess) => {
	letters.forEach((item, i)=>{
		if(letters[i] === guess){
		letters.splice(i, 1);	
		}	
		return letters;
	});
}

var wrongGuess = (guess) => {
	
	var patt = /[A-Z]/;
	patt.test(guess);
	console.log(patt.test(guess));
	if(patt.test(guess)){
	$('#graveyard').html(`${guess} was already guessed try again.`)
} else {
	$('#graveyard').html(`${guess} is not a valid guess please try again.`)

} 
}
makeWordLengthVisible();
startGame();
document.onkeypress = (event) => {
	var guess = event.key.toUpperCase();
	// $('#demo').html("Happy Halloween!");
	var count = 0;
	
	letters.forEach((letter,i)=>{
	
		if(letters[i] != guess){
			count ++;
		}
	});
	console.log(count);
	if(count != letters.length){

	removeGuessFromLetters(guess);
	checkGuessInAnswer(guess);
	checkGuess(guess);
	game();
	if(missArray.length >= 1){
	$("#misses").html(`Misses: ${missArray.toString().replace(/,/g, " ")}`);
	}
	$("#tried").html(`Correct guesses: ${hitArray.toString().replace(/,/g, " ")}`);
	$("#tried").html(blankAnswer.toString().replace(/,/g, " "));
}else {
	setTimeout(wrongGuess(guess), 100);
	setTimeout(()=>{
	$('#graveyard').empty();

	},1000)
}
	

}	