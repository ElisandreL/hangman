function displayWord(wordMap) {
    const wordHTML =  wordMap.map((letterMapping) => {
        if(letterMapping.isVisible === true) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li>_</li>`;
        }
    });
    els.answer.querySelector('ul').innerHTML = wordHTML.join('');
}; // génère des lignes au nombre de lettre à trouver


function displayChoice(choicesMap) {
    const choicesHTML = choicesMap.map((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li class="disabled">${letterMapping.letter}</li>`
        }
    });
    els.choices.querySelector('ul').innerHTML = choicesHTML.join('')
}; // Attribue une classe à chaque li qui représente chaque lettre

function displayScore() {
    els.score.innerHTML = `${scoreCount} / ${scoreMax}`
} // Donne le score


function generateChoice() {
    const choices = [];
    for(let ind = 65; ind <= 90; ind++) {
        choices.push(String.fromCharCode(ind));
    } return choices;
}; //générer l'alphabet


function getChoicesMapping(choices) {
    const choicesMap = choices.map((letter) => {
        return {
            letter,
            isChosen: false
        }
    })
    return choicesMap;
} //Atribuer le false à chaque lettre de l'alphabet

function getWordMapping(word){
    const wordArr = word.split('');
    //console.log('word', word);
    //console.log('wordArr', wordArr) ;
    const wordMap = wordArr.map((letter, index) => {
        let isVisible = false;
        if ((index === 0) || (index === wordArr.length - 1)) {
            isVisible = true; //Montrer la &ère et dernière lettre
        }
        return {
            letter,
            isVisible
        };
    })
    return wordMap;
} //Séparer chaque lettre du mot choisi et leur attribuer la valeur false

function pickWord() {
    const randomIndex = getRandomInt(0, words.length - 1);
    return words[randomIndex];
}; //choisir un mot de l'array au hasard




// Plusieurs manières d'appeler l'évènement
// same as window.onload = init; 
//ou window.addEventListener('load', init);
//ou window.onload =() => {
//      init();
// };
// ou ça : 
window.addEventListener('load', () => {
init();

});

/**
* Returns a random number between min (inclusive) and max (exclusive)
*/
function getRandomArbitrary(min, max) {
return Math.random() * (max - min) + min;
};

/**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!
*/
function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
};
