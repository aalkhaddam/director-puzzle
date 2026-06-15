let puzzleCounter = 0; 
// maybe 4 puzzles? Idk if it will be easy or hard

let puzzleArray = [
    [`Those last 3 pieces of an 'apple', after an 'exam' are a good ILLUSTRATION of taking care of one's health.(answer: example)`, -1322970774],
    [`I have keys but open no doors. I have space but no rooms. You can enter, but you can never come inside.`, 503739367],
    [`If you like terms like 'Green Thumb', 'Red Face', 'White Knuckles', or 'Yellow Belly', computers have this one word that's crazy called... `, 1968882350],
    [`A: I was taking this intro to computer science course one time and someone slid me this note that said: 6A 61 76 61 73 63 72 69 70 74 <br>
        B: Wow that's kinda odd? <br>
        A: Yea... would be nice if I could memorize an ascii table or convert from decimal to other computer related systems.`, 188995949],
    ['Inspect this Element and the answer will be IDentified to you.', 97621890],
    ['Education Commons has a great cybersecurity page but this word kept coming up, and all I could think about was going out to the lake to catch some wild game...', -1447167332],
    [`What does a computer love to bake?`, 952189583],
    [`A: Hey, I'm having some trouble with this online resource; I thought my computer was supposed to be whitelisted but I still can't access this tool... <br>
        B: Oh shoot! I totally forgot the windows command... but maybe your device is not getting the right IP and needs some configuration...`, 1867831081],
    [`If you "zoom in" to this number, and DROP it in, a new secret awaits you.`, 1068762291],
    [`This word is also the common name for a diverse group of small, brightly coloured butterflies (genus Celastrina and Ogyris) found in various parts of the world. 
        The word can also be used to refer to a bright, cyan-blue colour resemlbing the sky. <br> <br>
        Otherwise, it's just as commonly used a term in system administration as well...`, 93332111]
];

let puzzleObject = {
    clueText : `This is where the puzzle text goes.`,
    contentBox : `<input placeholder="Answer Here" class="answer">
            <button class="gameButton">Submit!</button>`,
    answer : ''
}

let skipButtonHTML = `<button class="skipButton">SKIP</button>`;

let finalWord = [71, 73, 78, 84, 79, 67, 76, 69, 65, 82]
let finalWordLength = 10; 
let finalMessage = [
    `You made it to the end!`, 
    `The anagram might have something to do with location...`,
    -1242682162,
    -1190933822
]; 

let reachedFinal = false;
let correctAna = false;

let startTime = 0;
let endTime = 0;

let pageButton = document.body.querySelector('.contentBox');
let skipButton = document.body.querySelector('.skipButtonBox');

pageButton.addEventListener('click', () => {
    if (!event.target.classList.contains('gameButton')) {
        return;
    } //ChatGPT solution to my broken code
    console.log('button clicked');
    submitPuzzle();
    
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitPuzzle();
    }
});

skipButton.addEventListener('click', () => {
    if (!event.target.classList.contains('skipButton')){
        return;
    }
    console.log('skipped!');
    alert("Puzzle Skipped!");
    puzzleCounter ++;
    callPuzzle();
});

function callPuzzle(){
    if((puzzleCounter-1) == finalWordLength){ // final word logic here
        document.querySelector('.pageTitle').innerHTML = finalMessage[0];
        document.querySelector('.clueText').innerHTML = finalMessage[1];
        document.querySelector('.skipButtonBox').innerHTML = '';
        reachedFinal = true;
        return;
    }
    let truePuzzleCount = puzzleCounter - 1;
    
    puzzleObject.clueText = puzzleArray[truePuzzleCount][0];
    puzzleObject.answer = puzzleArray[truePuzzleCount][1];

    document.querySelector('.pageTitle').innerHTML = `<b>Puzzle # ${puzzleCounter}</b>`;
    document.querySelector('.clueText').innerHTML = puzzleObject.clueText/*clue*/;
}

function submitPuzzle(){
    if (document.body.querySelector('.answer')){
        let inputAnswer = document.body.querySelector('.answer').value;
        if (reachedFinal && checkAnswer(inputAnswer)){
            if(correctAna){
                console.log('entered correct ana');
                endTime = Date.now();
                youWinScreen();
                alert("Congrats! You got the correct anagram!");
                return;
            }else{
                alert("That's one of the anagrams but not the one we're looking for. Keep re-arranging!");
            }
        }else if (reachedFinal && !checkAnswer(inputAnswer)){
            alert("Try again!");
        }

        if (checkAnswer(inputAnswer) && !reachedFinal){
            console.log(Date.now());
            alert(`Great job! - Your letter is: ${String.fromCharCode(finalWord[puzzleCounter-1])}`); //final word logic here
            puzzleCounter ++;
            document.querySelector('.contentBox').innerHTML = puzzleObject.contentBox;
        }else if (!checkAnswer(inputAnswer) && !reachedFinal){
            alert("Try again!");
        }
    }
    if (puzzleCounter == 0){
        document.querySelector('.skipButtonBox').innerHTML = skipButtonHTML;
        document.querySelector('.contentBox').innerHTML = puzzleObject.contentBox;
        puzzleCounter ++;
        startTime = Date.now();
    }
    callPuzzle();
}

function checkAnswer(input){ 
    let hash = 0;
    let textMod = input.toLowerCase();
    for (let i = 0, len = input.length; i < len; i++) {
        let chr = textMod.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }

    if (hash == finalMessage[2] || hash == finalMessage[3]){
        if(hash == finalMessage[2]){
            correctAna = true;
        }
        return true;
    }

    if (hash == puzzleObject.answer){
        return true;
    }

    return false;
}

function youWinScreen(){
    let finalTime = endTime - startTime;
    let minutes = Math.floor(finalTime / 1000 / 60);
    let seconds = Math.floor((finalTime / 1000) % 60);
    document.querySelector('.pageTitle').innerHTML = `<b>You Win!</b>`;
    document.querySelector('.clueText').innerHTML = `Your time is ${minutes}min ${seconds}sec`;
    document.querySelector('.contentBox').innerHTML = '';
}