const d = document,
    showMain = d.getElementById('show-main'),
    showGame = d.getElementById('show-game'),
    showAddWord = d.getElementById('show-add-word');

let txtAddWord = d.getElementById('txt-add-word'),
    button = d.getElementsByTagName('button'),
    wordOk = d.getElementById('word-ok'),
    wordLines = d.getElementById('word-lines'),
    wordError = d.getElementById('word-error'),
    draw = d.querySelector('canvas'),
    brush = draw.getContext('2d');

let orderLetter = [],
    newArrayWord = [],
    wordSelect = '',
    letterCheck = '',
    letterError = '',
    option = false;

let setWord = ['DESAFIO', 'HOLITAS', 'LOCURA', 'ESTILO', 'CARRITO', 'CAJAS', 'PERROS', 'BOTELLAS', 'ESCOBA', 'ESPEJO'];

const drawStrokeObj = {
    drawHead(x, y, raio, cor) {
        brush.fillStyle = cor;
        brush.beginPath();
        brush.arc(x, y, raio, 0, 2 * Math.PI);
        brush.fill();
    },
    clear() {
        brush.clearRect(0, 0, 350, 450);
    },
    win() {
        brush.beginPath();
        brush.fillStyle = 'green';
        brush.font='bold 40px arial';
        brush.fillText('You win !!!! :)',70,220);
    },
    gameOver() {
        brush.beginPath();
        brush.fillStyle = 'red';
        brush.font='bold 40px arial';
        brush.fillText("Game over :'(",70,220);
    },
    1() {
        brush.fillRect(75, 30, 5, 380);
    },
    2() {
        this[1]();
        brush.fillRect(75, 30, 180, 5);
    },
    3() {
        this[2]();
        brush.fillRect(255, 30, 5, 40);
    },
    4() {
        this[3]();
        this['drawHead'](258, 90, 20, '#0a3871');
        this['drawHead'](258, 90, 18, '#f3f5fc');
    },
    5() {
        this[4]();
        brush.fillStyle = '#0a3871';
        brush.fillRect(257, 110, 2, 70);
    },
    6() {
        this[5]();
        brush.strokeStyle = '#0a3871';
        brush.beginPath();
        brush.moveTo(258, 120);
        brush.lineTo(230, 150);
        brush.stroke();
    },
    7() {
        this[6]();
        brush.beginPath();
        brush.moveTo(258, 120);
        brush.lineTo(286, 150);
        brush.stroke();
    },
    8() {
        this[7]();
        brush.beginPath();
        brush.moveTo(258, 178);
        brush.lineTo(230, 220);
        brush.stroke();
    },
    9() {
        this[8]();
        brush.beginPath();
        brush.moveTo(258, 178);
        brush.lineTo(286, 220);
        brush.stroke();
    }
}

function wordRandom() {
    let indexRandom = Math.round(Math.random() * setWord.length);
    return setWord[indexRandom];
}

function validateWord(e) {
    let txtWord = e.target;
    let pattern = txtWord.dataset.pattern;
    if (pattern && txtWord.value !== '') {
        let regEx = new RegExp(pattern);
        if (!regEx.exec(txtWord.value)) {
            d.getElementById('info-word').style.color = 'red';
            d.getElementById('info-alert').style.color = 'red';
            for (let i = 0; i < button.length; i++)  button[i].setAttribute('disabled', 'disabled');
        } else {
            d.getElementById('info-word').style.color = '#8e8e8e';
            d.getElementById('info-alert').style.color = '#8e8e8e';
            for (let i = 0; i < button.length; i++) button[i].removeAttribute('disabled');
        }
    }
}

function validateLetter(e) {
    let letter = (e.key).toUpperCase();
    if (wordSelect !== '') {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            (wordSelect.includes(letter))
                ? letterCheck = letter
                : (letterError.length < 10)
                    ? letterError += letter
                    : letterError;
            d.getElementById('info-alert').style.color = '#8e8e8e';
            for (let i = 0; i < button.length; i++) button[i].removeAttribute('disabled');
            game();
        } else {
            d.getElementById('info-alert').style.color = 'red';
            for (let i = 0; i < button.length; i++) button[i].setAttribute('disabled', 'disabled');
        }
    }
}

function gameWinOver() {
    let count=0;
    newArrayWord.forEach(el => {
        if(el === '')  count++;
    });
    if(count === newArrayWord.length) {
        drawStrokeObj['win']();
        return option = true;
    }
    if (letterError.length === 10) {
        drawStrokeObj['gameOver']();
        return option = true;
    }
    if (letterError.length < 10) drawStrokeObj[letterError.length]();
}

function game() {
    wordOk.innerHTML = '';
    wordLines.innerHTML = '';
    wordError.innerHTML = '';
    brush.fillStyle = '#0a3871';
    brush.fillRect(35, 410, 260, 5);
    (option === false) ? d.addEventListener('keypress', validateLetter) : d.removeEventListener('keypress', validateLetter);
    let arrayWord = wordSelect.split('');
    if (orderLetter.length < arrayWord.length) {
        for (let i = 0; i < arrayWord.length; i++) orderLetter.push('');
        newArrayWord = arrayWord;
    }
    let i = 0;
    while (i < orderLetter.length) {
        if (newArrayWord[i] === letterCheck) {
            if (arrayWord.includes(letterCheck)) {
                orderLetter.splice(i, 1, letterCheck);
                newArrayWord.splice(i, 1, '');
                break;
            }
        }
        i++;
    }
    for (let i = 0; i < arrayWord.length; i++) {
        if (newArrayWord[i] === orderLetter[i]) newArrayWord.splice(i, 1, '');
    }
    orderLetter.forEach(el => {
        let letterSpan = d.createElement('h3');
        letterSpan.innerText = el;
        wordOk.appendChild(letterSpan);
    });
    arrayWord.forEach(() => {
        let letterBorder = d.createElement('div');
        wordLines.appendChild(letterBorder);
    });
    wordError.innerHTML = letterError;
    gameWinOver();
    letterCheck = '';
}

function saveWord() {
    d.getElementById('info-word').style.color = 'red';
    if (txtAddWord.value !== '') {
        txtAdd = txtAddWord.value;
        setWord.push(txtAdd);
        wordSelect = wordRandom();
        txtAddWord.value = '';
        showAddWord.style.display = 'none';
        showGame.style.display = 'flex';
        d.getElementById('info-word').style.color = '#8e8e8e';
        letterCheck = '';
        letterError = '';
        orderLetter = [];
        newArrayWord = [];
        drawStrokeObj['clear']();
        option = false;
        game();
    }
}

txtAddWord.addEventListener('keyup', e => {
    if (e.target.matches('textarea')) validateWord(e);
});

d.addEventListener('click', e => {
    if (e.target.matches('#btn-game')) {
        showMain.style.display = 'none';
        showGame.style.display = 'flex';
        wordSelect = wordRandom();
        letterError = '';
        drawStrokeObj['clear']();
        option = false;
        game();
    };
    if (e.target.matches('#btn-add-word')) {
        showMain.style.display = 'none';
        showAddWord.style.display = 'flex';
    };
    if (e.target.matches('#btn-new-game')) {
        wordSelect = wordRandom();
        letterCheck = '';
        letterError = '';
        orderLetter = [];
        newArrayWord = [];
        drawStrokeObj['clear']();
        option = false;
        game();
    }
    if (e.target.matches('#btn-give-up')) {
        showMain.style.display = 'flex';
        showGame.style.display = 'none';
        letterCheck = '';
        letterError = '';
        orderLetter = [];
        newArrayWord = [];
        drawStrokeObj['clear']();
        option = false;
     }
    if (e.target.matches('#btn-word-save')) saveWord();
    if (e.target.matches('#btn-word-cancel')) {
        txtAddWord.value = '';
        showAddWord.style.display = 'none';
        showMain.style.display = 'flex';
    }
})
