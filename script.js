const menuSection         = document.querySelector('.menu-section');
const gameSection         = document.querySelector('.game-section');
const newWordSection      = document.querySelector('.new-word-section');
const userRightLettersDiv = document.querySelector('.user-right-letters');
const userWrongLettersDiv = document.querySelector('.user-wrong-letters');
const hangmanImageFigure  = document.querySelector('.game-content figure');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'];

let typedKeys = [];

const words = ['praça', 'pedir', 'porta'];

let selectedWord;
let rightLettersQuantity = 0;

let isGameRunning = false;

let actualPage = menuSection;

let tries = 6;

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
    alert('Game Over!');
    isGameRunning = false;
}

function gameWon() {
    alert('Game Won!');
    isGameRunning = false;
}

function surrender() {
    isGameRunning = false;
    resetGame();
    returnToMenu();
}

function resetGame() {
    userRightLettersDiv.innerHTML = '';
    userWrongLettersDiv.innerHTML = '';
    hangmanImageFigure.innerHTML = '<img src="./assets/tries/6-try.svg" alt="" id="man">';
    typedKeys = []
    rightLettersQuantity = 0;
    tries = 6;
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * (words.length))
    
    selectedWord = words[randomIndex];
}

addEventListener('keydown', (event) => {
    if (isGameRunning) {
        if (letters.includes(event.key)) {
            userTypeKey(event.key);
        }
    }
})

function userTypeKey(key) {

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

    words.push(newWord);
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

    return;
}


//conditions to verify.
function isWordEmpty(word) {
    if (word.length === 0) {
        return true;
    }
}

function isThereNotAcceptedCharacter(word) {
    for (let letter of word) {
        if (letters.includes(letter)) {
            continue;
        } else {
            return true;
        }
    }
}

function doesWordExceedMaxLength(word) {
    return word.length > 8;
}
