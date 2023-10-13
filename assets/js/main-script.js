
const all_boxes = document.getElementById('all_boxes');
const winner = document.getElementById('winner');
const start_game = document.getElementById('start_game');
const finish_game = document.getElementById('finish_game');
const levels = document.getElementById('levels');
const startFront = document.querySelector('.start-front');

let gridSize = 16;

let box1 = null;
let box2 = null;

const matchSound = new Audio('./assets/js/mixkit-bonus-earned.wav');
const noMatchSound = new Audio('./assets/js/mixkit-electronic-retro-block-hit.wav');

const data = [
    {imgSrc: './assets/img/apple.jpg'},
    {imgSrc: './assets/img/kewi.jpg'},
    {imgSrc: './assets/img/lemon.jpg'},
    {imgSrc: './assets/img/mango.jpg'},
    {imgSrc: './assets/img/orange.jpg'},
    {imgSrc: './assets/img/images.jpg'},
    {imgSrc: './assets/img/download.jpg'},
    {imgSrc: './assets/img/download-2.jpg'},

    {imgSrc: './assets/img/download-3.jpg'},
    {imgSrc: './assets/img/download-4.jpg'},
    {imgSrc: './assets/img/download-5.jpg'},
    {imgSrc: './assets/img/download-6.jpg'},
    {imgSrc: './assets/img/1.jpg'},
    {imgSrc: './assets/img/2.jpg'},
    {imgSrc: './assets/img/3.jpg'},
    {imgSrc: './assets/img/4.jpg'},
    {imgSrc: './assets/img/5.jpg'},
    {imgSrc: './assets/img/6.jpg'},

    {imgSrc: './assets/img/7.jpg'},
    {imgSrc: './assets/img/8.jpg'},
    {imgSrc: './assets/img/9.jpg'},
    {imgSrc: './assets/img/10.jpg'},
    {imgSrc: './assets/img/11.jpg'},
    {imgSrc: './assets/img/12.jpg'},
    {imgSrc: './assets/img/13.jpg'},
    {imgSrc: './assets/img/14.jpg'},
    {imgSrc: './assets/img/15.jpg'},
    {imgSrc: './assets/img/16.jpg'},
    {imgSrc: './assets/img/17.jpg'},
    {imgSrc: './assets/img/18.jpg'},
    {imgSrc: './assets/img/19.jpg'},
    {imgSrc: './assets/img/20.jpg'}

];
const duplicatData = data.flatMap( item => [item, item] );
const shuffledData = [...duplicatData];
// console.log(shuffledData)

for (let i = gridSize; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
}

let createBox = () => {
    // if( levels.value == 'medium' ){
    //     gridSize = 36;
    //     resetGame();
    // } else if( levels.value == 'hard' ){
    //     gridSize = 64;
    //     resetGame();
    // } else {
    //     gridSize = 16;
    //     resetGame();
    // }
    // const duplicatData = data.flatMap( item => [item, item] );
    // const shuffledData = [...duplicatData];
    let box = shuffledData.slice(0, gridSize);
    console.log(box);
    let item = box.map(item => 
        `
            <div class="box" onclick="checkBox(this)">
                <figure class="hold-icon">
                    <img src=${item.imgSrc} alt="icon" />
                </figure>
                <div class="front">??</div>
            </div>
        `
    ).join('');
    
    all_boxes.innerHTML += item; 
};

let checkMatch = () => {
    if( box1.querySelector('img').src == box2.querySelector('img').src ){
        matchSound.play();
        box1 = null;
        box2 = null;
        checkWinner();
    } else {
        box1.classList.remove('selected');
        box2.classList.remove('selected');
        noMatchSound.play();
        box1 = null;
        box2 = null;
    }
};

let checkBox = (el) => {

    if( box1 == null ) {
        el.classList.add('selected');
        box1 = el;
        
    } else if ( box2 == null ) {
        el.classList.add('selected');
        box2 = el;
        setTimeout( checkMatch, 400 );
    }
    
};

let checkWinner = () => {

    const boxes = document.querySelectorAll('.box');
    const selectedBoxes = document.querySelectorAll('.box.selected');

    if (boxes.length === selectedBoxes.length) {
        winner.classList.add('show');
        all_boxes.style.opacity = '0';
        // finish_game.disabled = false;
    }
    
};

let chooseLevels = () => {
    resetGame(); 
    start_game.disabled = false;
    finish_game.disabled = true;
    startFront.style.display = 'block';
    all_boxes.style.opacity = '1';

    if( levels.value == 'medium' ){
        gridSize = 36;
    } else if( levels.value == 'hard' ){
        gridSize = 64;
    } else {
        gridSize = 16;
    } 
    createBox();


    if( levels.value == 'medium' ){
        all_boxes.classList.add('medium');
        all_boxes.classList.remove('easy');
        all_boxes.classList.remove('hard');

    } else if( levels.value == 'hard' ){
        all_boxes.classList.add('hard');
        all_boxes.classList.remove('easy');
        all_boxes.classList.remove('medium');

    } else {
        all_boxes.classList.add('easy');
        all_boxes.classList.remove('medium');
        all_boxes.classList.remove('hard');

    }

    
};

let resetGame = () => {
    const boxes = document.querySelectorAll('.box');
    all_boxes.innerHTML = '';
    boxes.forEach(box => {
        box.classList.remove('selected');
    });
    winner.classList.remove('show');
    finish_game.disabled = true;
    // createBox(); 
}

start_game.addEventListener('click', () => {
    start_game.disabled = true;
    finish_game.disabled = false;
    startFront.style.display = 'none';
    all_boxes.style.opacity = '1';
});

finish_game.addEventListener('click', () => {
    resetGame();
    start_game.disabled = false;
    startFront.style.display = 'block';
});


document.addEventListener('DOMContentLoaded', createBox);