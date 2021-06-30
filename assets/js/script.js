const els = {
    score: null,
    answer: null,
    choices: null
};

const words = [
    'JAVASCRIPT',
    'ARRAY',
    'BRAIN',
    'ELEMENT',
    'ONLOAD',
    'SCRIPT',
    'VALUE',
    'KELLER',
    'CONCATENATION',
    'ADDEVENTLISTENER'
];

let choices = [];

let word = '';
let wordMap = [];
let choicesMap = [];
let scoreCount = 0;
let scoreMax = 5;
const laSo = new Audio('assets/sound/dernier.mp3');
const fiSo = new Audio('assets/sound/rires-1.mp3');
const secSo = new Audio('assets/sound/cry-2.mp3');
const thiSo = new Audio('assets/sound/no-3.mp3');
const foSo = new Audio('assets/sound/hurl-4.mp3');





const init = () => {
    //console.log('>> #init')

    // Attach element : 

    els.score = document.getElementById("score");
    els.answer = document.getElementById("answer");
    els.choices = document.getElementById("choices");

    // Pick word
    word = pickWord();

    //   - create word mapping
    wordMap = getWordMapping(word);


    // Generate choices
    choices = generateChoice();

    //   - create choices mapping
    choicesMap = getChoicesMapping(choices);

    console.log(choicesMap)

    // Display words
    displayWord(wordMap);

    // Display choices
    displayChoice(choicesMap);

    // Display score (error)
    displayScore();

    // Listen events
    //      - mouse events
    els.choices.addEventListener(('click'), ({ target }) => {
        // evt:MouseEvent evt.target => {target}
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        }
    });

    //      - Keyboard events
    document.addEventListener('keydown', ({ keyCode }) => {
        // evt:KeyboardEvent evt.keyCode => { keyCode }
        const letter = String.fromCharCode(keyCode);
        if (keyCode >= 65 && keyCode <= 90) {
            checkLetter(letter)
        }
    })

    // Check letter
    //      - if not in word : add score (error)
    //      - if in the word: display letter
    //   - endGame : 
    //      - if score == max: loseGame
    //      - if all letter visible: winGame
 
};

    const checkLetter = (letter) => {
        console.log(letter);
        let isInWord = false;
        let allFound = true;
        wordMap.forEach((letterMapping) => {
            if (letterMapping.letter === letter) {
                letterMapping.isVisible = true;
                isInWord = true;
                
                
            }
            if (!letterMapping.isVisible) {
                allFound = false;
            }
           
        });
        choicesMap.forEach((letterMapping) => {
            if (letterMapping.letter === letter) {
                letterMapping.isChosen = true;
                
            }
        });

        displayChoice(choicesMap);

        if (isInWord === true) {
            displayWord(wordMap);
        } else {
            scoreCount++;
            displayScore();
            if (scoreCount === 1) {
                fiSo.play();
                document.querySelector('body').style.backgroundColor = '#f2a3a3';
                document.getElementById('head').style.display = 'inline';
            }
            if (scoreCount === 2) {
                secSo.play();
                document.querySelector('body').style.backgroundColor = '#d67373';
                document.getElementById('head').style.display = 'none';
                document.getElementById('bod').style.display = 'inline';
            }
            if (scoreCount === 3) {
                thiSo.play();
                document.querySelector('body').style.backgroundColor = '#cd5454';
                document.getElementById('bod').style.display = 'none';
                document.getElementById('bodarm').style.display = 'inline';
                
            }
            if (scoreCount === 4) {
                foSo.play();
                document.querySelector('body').style.backgroundColor = '#ba3434';
                document.getElementById('bodarm').style.display = 'none';
                document.getElementById('legs').style.display = 'inline';
            }
        }

        if (scoreCount === scoreMax) {
            endGame();
        }
        if (allFound) {
            winGame();
        }
    };

    
        
    function endGame() {
        
        els.choices.innerHTML = `<h1>That was a hard death, bro :(</h1>`;
        document.querySelector('body').style.backgroundColor = '#930d0d';
        laSo.play();
        document.getElementById('legs').style.display = 'none';
        document.getElementById('last').style.display = 'inline';
    };

    function winGame() {
        els.choices.innerHTML = `<h1>Congrats, you live !</h1>`;
        document.querySelector('body').style.backgroundColor = 'green';
    };
    
