const menuSection         = document.querySelector('.menu-section');
const gameSection         = document.querySelector('.game-section');
const newWordSection      = document.querySelector('.new-word-section');
const userRightLettersDiv = document.querySelector('.user-right-letters');
const userWrongLettersDiv = document.querySelector('.user-wrong-letters');
const hangmanImageFigure  = document.querySelector('.game-content figure');

const acceptedLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'];

const words = ['praça', 'pedir', 'porta'];

let typedKeys = [];

let selectedWord;
let rightLettersQuantity = 0;

let isGameRunning = false;

const maxLenghtWord = 8;
let tries = 6;

let actualPage = menuSection;

function goToGamePage() {
    actualPage.classList.add('hide');
    gameSection.classList.remove('hide');

    actualPage = gameSection;

    startGame();
}

function goToNewWordPage() {
    actualPage.classList.add('hide');
    newWordSection.classList.remove('hide');

    actualPage = newWordSection;
}

function returnToMenu() {
    actualPage.classList.add('hide');
    menuSection.classList.remove('hide');

    actualPage = menuSection;
}

function startGame() {
    isGameRunning = true;
    getRandomWord();
    createElementForLetterWords();
}

function createElementForLetterWords() {
    for (let i = 0; i < selectedWord.length; i++) {
        const wordElement = document.createElement('div');
        wordElement.setAttribute('class', 'word-letter');
        wordElement.setAttribute('id', `letter-i-${i}`);
        userRightLettersDiv.appendChild(wordElement);
    }
}

function newGame() {
    resetGame();
    startGame();
}

function gameOver() {
    lostGameMessageShow();
    isGameRunning = false;
}

const lostGameMessageDiv = document.querySelector('.lost-game-message')

function lostGameMessageShow() {
    lostGameMessageDiv.style.visibility = 'initial';
    lostGameMessageDiv.style.opacity = 'initial';
}

function lostGameMessageHide() {
    lostGameMessageDiv.style.visibility = 'hidden';
    lostGameMessageDiv.style.opacity = '0';
}

function gameWon() {
    wonGameMessageShow();
    isGameRunning = false;
}

const wonGameMessageDiv = document.querySelector('.won-game-message')

function wonGameMessageShow() {
    wonGameMessageDiv.style.visibility = 'initial';
    wonGameMessageDiv.style.opacity = 'initial';
}

function wonGameMessageHide() {
    wonGameMessageDiv.style.visibility = 'hidden';
    wonGameMessageDiv.style.opacity = '0';
}

function surrender() {
    isGameRunning = false;
    resetGame();
    returnToMenu();
}

function resetGame() {
    lostGameMessageHide();
    wonGameMessageHide();

    userRightLettersDiv.innerHTML = '';
    userWrongLettersDiv.innerHTML = '';
    hangmanImageFigure.innerHTML = '<img src="./assets/tries/6-try.svg" alt="" id="man">';
    
    typedKeys = [];
    rightLettersQuantity = 0;
    tries = 6;
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * (words.length))
    
    selectedWord = words[randomIndex];
}

addEventListener('keydown', (event) => {
    if (isGameRunning) {
        if (acceptedLetters.includes(event.key)) {
            userTypeKeyVerify(event.key);
        }
    }
})

function userTypeKeyVerify(key) {

    if (!typedKeys.includes(key)) {
        typedKeys.push(key);
    } else {
        return;
    }

    let i = 0;
    let isKeyPressedRight = false;
    for (let letter of selectedWord) {
        if (key === letter) {
            let typeLetterPosition = document.querySelector(`#letter-i-${i}`)

            typeLetterPosition.innerText = key.toUpperCase();

            rightLettersQuantity++;

            if (rightLettersQuantity === selectedWord.length) {
                isGameRunning = false;
                gameWon();
                return;
            }

            isKeyPressedRight = true;
        }
        i++;

        if (i >= selectedWord.length && !isKeyPressedRight) {
            wrongLetter(key);

            tries--;

            hangmanImageUpdate(tries)

            if (tries === 0) {
                gameOver();
                return;
            }
        }
    }
}

function wrongLetter(key) {
    const span = document.createElement('span');
    span.innerText = key.toUpperCase();
    userWrongLettersDiv.appendChild(span);
}

function hangmanImageUpdate(whatTryIsUser) {
    hangmanImageFigure.innerHTML = `<img src="./assets/tries/${whatTryIsUser}-try.svg" alt="" id="man">` 
}


function addNewWord() {
    newWord = wordInput.value.toLowerCase();

    if (!verifyWord(newWord) == '') {
        alert(verifyWord(newWord))
        return;
    }

    sucessAddedWord();
    wordInput.value = '';
    words.push(newWord);
}

function sucessAddedWord() {
    const sucessAddedWord = document.querySelector('.sucess-message-add');

    sucessAddedWord.style.visibility = 'initial';
    sucessAddedWord.style.opacity = 'initial';

    setInterval(() => {
        sucessAddedWord.style.visibility = 'hidden';
        sucessAddedWord.style.opacity = '0';
    }, 4000);
}

function verifyWord(word) {
    if (isWordEmpty(word)) {
        return 'Você precisa digitar uma palavra para adicionar';
    }

    if (isThereNotAcceptedCharacter(word)) {
        return 'Não aceitamos letras com acentos, números ou caracteres especiais';
    }

    if (doesWordExceedMaxLength(word)) {
        return 'Excedeu o número máximo de letras';
    }
}


//conditions to verify.
function isWordEmpty(word) {
    if (word.length === 0) {
        return true;
    }
}

function isThereNotAcceptedCharacter(word) {
    for (let letter of word) {
        if (acceptedLetters.includes(letter)) {
            continue;
        } else {
            return true;
        }
    }
}

function doesWordExceedMaxLength(word) {
    return word.length > maxLenghtWord;
}
