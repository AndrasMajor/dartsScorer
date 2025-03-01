let player1Name = '';
let player2Name = '';
let numOfSets = '';
let numOfLegs = '';
let checkIn = 1;
let checkOut = 2;


function switchToSingleIn(){
    document.querySelector('#single-in').classList.add('selected');
    checkIn = 1;
    document.querySelector('#double-in').classList.remove('selected');
}
function switchToDoubleIn(){
    document.querySelector('#double-in').classList.add('selected');
    checkIn = 2;
    document.querySelector('#single-in').classList.remove('selected');
}
function switchToSingleOut(){
    document.querySelector('#single-out').classList.add('selected');
    checkOut = 1;
    document.querySelector('#double-out').classList.remove('selected');
}
function switchToDoubleOut(){
    document.querySelector('#double-out').classList.add('selected');
    checkOut = 2;
    document.querySelector('#single-out').classList.remove('selected');
}

function goToMainPage(){
    player1Name = document.querySelector('#player1').value;
    player2Name = document.querySelector('#player2').value;
    numOfSets = document.querySelector("#sets").value;
    numOfLegs = document.querySelector("#legs").value;

    
    if(player1Name.trim() !== '' && player2Name.trim() !== '') {
        sessionStorage.setItem('player1', player1Name);
        sessionStorage.setItem('player2', player2Name);
        sessionStorage.setItem('numOfLegs', numOfLegs);
        sessionStorage.setItem('numOfSets', numOfSets);
        sessionStorage.setItem('checkIn', checkIn);
        sessionStorage.setItem('checkOut', checkOut);

        window.location.href = 'game.html';
    } else {
        alert('Please enter the name of the players!');
    }
}

function switchNames() {
    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');

    let temp = player1.value;
    player1.value = player2.value;
    player2.value = temp;
}


function init(){
    document.querySelector('#single-in').addEventListener('click', switchToSingleIn, false);
    document.querySelector('#double-in').addEventListener('click', switchToDoubleIn, false);
    document.querySelector('#single-out').addEventListener('click', switchToSingleOut, false);
    document.querySelector('#double-out').addEventListener('click', switchToDoubleOut, false);
    document.querySelector('#start-btn').addEventListener('click', goToMainPage, false);
    document.querySelector('#csere').addEventListener('click', switchNames, false)
}

window.addEventListener('load', init, false);