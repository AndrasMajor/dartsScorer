const csvData = `170,T20 T20 Bul
167,T20 T19 Bull
164,T20 T18 Bull 
161,T20 T17 Bull
160,T20 T20 D20
158,T20 T20 D19 
157,T20 T19 D20
156,T20 T20 D18
155,T20 T19 D19 
154,T20 T18 D20
153,T20 T19 D18
152,T20 T20 D16
151,T20 T17 D20
150,T20 T18 D18
149,T20 T19 D16
148,T20 T16 D20
147,T20 T17 D18
146,T20 T18 D16
145,T20 T15 D20
144,T20 T20 D12
143,T20 T17 D16
142,T20 T14 D20
141,T20 T19 D12
140,T20 T16 D16
139,T19 T14 D20
138,T20 T18 D12
137,T19 T16 D16
136,T20 T20 D8
135,T20 T17 D12
134,T20 T14 D16
133,T20 T19 D8
132,T20 T16 D12
131,T20 T13 D16
130,T20 T20 D5
129,T19 T16 D12
128,T18 T14 D16
127,T20 T17 D8
126,T19 T19 D6
125,25 T20 D20
124,T20 T16 D8
123,T19 T16 D9
122,T18 T20 D4
121,T17 T10 D20
120,T20 20 D20
119,T19 T10 D16
118,T20 18 D20
117,T20 17 D20
116,T20 16 D20
115,T20 15 D20
114,T20 14 D20
113,T20 13 D20
112,T20 12 D20
111,T20 19 D16
110,T20 18 D16
109,T19 20 D16
108,T20 16 D16
107,T19 18 D16
106,T20 14 D16
105,T19 16 D16
104,T18 18 D16
103,T20 3 D20
102,T20 10 D16
101,T20 1 D20
100,T20 D20
99,T19 10 D16
98, T20 D19
97,T19 D20
96,T20 D18
95,T19 D19
94,T18 D20
93,T19 D18
92,T20 D16
91,T17 D20
90,T20 D15
89,T19 D16
88,T16 D20
87,T17 D18
86,T18 D16
85,T15 D20
84,T20 D12
83,T17 D16
82,T14 D20
81,T19 D12
80,T20 D10
79,T13 D20
78,T18 D12
77,T19 D10
76,T20 D8
75,T17 D12
74,T14 D16
73,T19 D8
72,T16 D12
71,T13 D16
70,T10 D20
69,T15 D12
68,T20 D4   
67,T17 D8
66,T10 D18
65,T19 D4
64,T16 D8
63,T13 D12
62,T10 D16
61,T15 D8
60,20 D20
59,19 D20
58,18 D20
57,17 D20
56,16 D20
55,15 D20
54,14 D20
53,13 D20
52,20 D16
51,19 D16
50,18 D16
49,17 D16
48,16 D16
47,7 D20
46,6 D20
45,13 D16
44,4 D20
43,3 D20
42,10 D16
41,1 D20
40,D20
39,7 D16
38,D19
37,5 D16
36,D18
35,3 D16
34,D17
33,1 D16
32,D16
31,15 D8
30,D15
29,13 D8
28,D14
27,7 D10
26,D13
25,9 D8
24,D12
23,3 D10
22,D11
21,5 D8
20,D10
19,3 D8
18,D9
17,1 D8
16,D8
15,3 D6
14,D7
13,5 D4
12,D6
11,3 D4
10,D5
9,1 D4
8,D4
7,3 D2
6,D3
5,1 D2
4,D2
3,1 D1
2,D1`;

const gameMode = parseInt(sessionStorage.getItem('gameMode'), 10);
const player1Name = sessionStorage.getItem('player1');
const player2Name = sessionStorage.getItem('player2');
const numOfSets = parseInt(sessionStorage.getItem('numOfSets'), 10);
const numOfLegs = parseInt(sessionStorage.getItem('numOfLegs'), 10);

let player1_score = gameMode;
let player2_score = gameMode;
let player1_throws = [];
let player2_throws = [];
let player1_currentLeg_throws = [];
let player2_currentLeg_throws = [];
let player1_finishes = [];
let player2_finishes = [];
let currentPlayer = 1; // 1: Player 1, 2: Player 2
let currentLeg = 1;
let currentSet = 1;
let player1_legswon = 0;
let player2_legswon = 0;
let player1_setswon = 0;
let player2_setswon = 0;

const player1Input = document.querySelector('.scored1');
const player2Input = document.querySelector('.scored2');
const player1Undo = document.querySelector('.undo1');
const player2Undo = document.querySelector('.undo2');
const player1ScoreDisplay = document.querySelector('.remaning_score1');
const player2ScoreDisplay = document.querySelector('.remaning_score2');
const player1AverageDisplay = document.querySelector('.average1');
const player2AverageDisplay = document.querySelector('.average2');
const player1LastScoreDisplay = document.querySelector('.last_score1');
const player2LastScoreDisplay = document.querySelector('.last_score2');
const player1LegsWonDisplay = document.querySelector('.legs1');
const player2LegsWonDisplay = document.querySelector('.legs2');
const player1SetsWonDisplay = document.querySelector('.sets1');
const player2SetsWonDisplay = document.querySelector('.sets2');
const player1CheckOut = document.querySelector('.checkout1');
const player2CheckOut = document.querySelector('.checkout2');
const player1LegAverageDisplay = document.querySelector('.legaverage1');
const player2LegAverageDisplay = document.querySelector('.legaverage2');

function updateDisplay() {
    player1ScoreDisplay.innerHTML = player1_score;
    player2ScoreDisplay.innerHTML = player2_score;
    player1AverageDisplay.innerHTML = calculateAverage(player1_throws).toFixed(2);
    player2AverageDisplay.innerHTML = calculateAverage(player2_throws).toFixed(2);
    player1LegAverageDisplay.innerHTML = calculateAverage(player1_currentLeg_throws).toFixed(2);
    player2LegAverageDisplay.innerHTML = calculateAverage(player2_currentLeg_throws).toFixed(2);
    player1LastScoreDisplay.innerHTML = player1_throws.length ? player1_throws[player1_throws.length - 1] : '-';
    player2LastScoreDisplay.innerHTML = player2_throws.length ? player2_throws[player2_throws.length - 1] : '-';
    if(player1_score <= 170) player1CheckOut.innerHTML = searchCheckout(player1_score);
    else player1CheckOut.innerHTML = '-';
    if(player2_score <= 170) player2CheckOut.innerHTML = searchCheckout(player2_score);
    else player2CheckOut.innerHTML = '-';
}

function searchCheckout(score){

    const rows = csvData.split("\n");

    for (const row of rows) {
        const [scoreValue, description] = row.split(",");
        if (parseInt(scoreValue) === score) {
            return description;
        }
    }
    return "-";
}

function calculateAverage(throws) {
    if (throws.length === 0) return 0;
    return throws.reduce((acc, num) => acc + num, 0) / throws.length;
}

function handleThrow(player, inputElement) {
    const score = parseInt(inputElement.value, 10);
    if (isNaN(score) || score < 0 || score > 180) return;

    if (player === 1) {
        if(player1_score - score === 1){
            return;
        }else{
            player1_throws.push(score);
            player1_currentLeg_throws.push(score);
            player1_score -= score;
        }
        if (player1_score < 0) {
            player1_score += score;
            player1_throws.pop();
            player1_currentLeg_throws.pop();
            return;
        }
        currentPlayer = 2;
    } else {
        if(player2_score - score === 1){
            return;
        }else{
            player2_throws.push(score);
            player2_currentLeg_throws.push(score);
            player2_score -= score;
        }
        if (player2_score < 0) {
            player2_score += score;
            player2_throws.pop();
            player2_currentLeg_throws.pop();
            return;
        }
        currentPlayer = 1;
    }

    inputElement.value = '';
    let x = checkLegWinner();
    if(x === 1) player1_finishes.push(score);
    else if(x === 2) player2_finishes.push(score);
    checkSetWinner();
    toggleInputs();
    updateDisplay();
}

function checkLegWinner() {
    let x = 0;
    if (player1_score === 0 || player2_score === 0) {
        if (player1_score === 0) {
            player1LegsWonDisplay.innerHTML = ++player1LegsWonDisplay.innerHTML;
            player1_legswon++;
            x = 1;
        } else {
            player2LegsWonDisplay.innerHTML = ++player2LegsWonDisplay.innerHTML;
            player2_legswon++;
            x = 2;
        }

        // Új leg kezdése
        
        currentLeg++;
        player1_score = gameMode;
        player2_score = gameMode;
        player1_currentLeg_throws = [];
        player2_currentLeg_throws = [];
        if(currentSet % 2 === 1) currentPlayer = (currentLeg % 2 === 1) ? 1 : 2;
        else currentPlayer = (currentLeg % 2 === 1) ? 2 : 1;
        toggleInputs();
        updateDisplay();
        return x;
    }
}

function checkSetWinner() {
    if (player1_legswon === numOfLegs || player2_legswon === numOfLegs) {
        if (player1_legswon === numOfLegs) {
            player1_setswon++;
            player1SetsWonDisplay.innerHTML = player1_setswon;
        } else {
            player2_setswon++;
            player2SetsWonDisplay.innerHTML = player2_setswon;
        }

        
        if (player1_setswon === numOfSets) {
            alert(`${player1Name} megnyerte a meccset!`);
            if(decide()){ saveGame()};
            resetGame();
            return;
        }
        if (player2_setswon === numOfSets) {
            alert(`${player2Name} megnyerte a meccset!`);
            if(decide()){ saveGame()};
            resetGame();
            return;
        }

        // Új szett indítása
        currentSet++;
        currentLeg = 1;
        player1_legswon = 0;
        player2_legswon = 0;
        player1LegsWonDisplay.innerHTML = player1_legswon;
        player2LegsWonDisplay.innerHTML = player2_legswon;

        // Szervajátékos beállítása
        currentPlayer = (currentSet % 2 === 1) ? 1 : 2;

        // Reset leg pontszámok
        player1_score = gameMode;
        player2_score = gameMode;

        toggleInputs();
        updateDisplay();
    }
}

function decide(){
    return confirm("Szeretnéd menteni a meccset?");
}

function saveGame() {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let matches = JSON.parse(localStorage.getItem("matches")) || [];
    
    function getPlayerByName(name) {
        return players.find(player => player.name === name);
    }
    
    function updateOrCreatePlayer(name, throws, finishes, setsWon, opponentSetsWon) {
        let player = getPlayerByName(name);
        if (player) {
            player.matchesPlayed++;
            player.wins += setsWon > opponentSetsWon ? 1 : 0;
            player.losses += setsWon > opponentSetsWon ? 0 : 1;
            player.highscore = Math.max(player.highscore, ...throws);
            player.topFinish = Math.max(player.topFinish, ...finishes);
            player.average = ((player.average * (player.matchesPlayed - 1)) + calculateAverage(throws)) / player.matchesPlayed;
        } else {
            player = {
                id: players.length + 1,
                name: name,
                average: calculateAverage(throws),
                matchesPlayed: 1,
                wins: setsWon > opponentSetsWon ? 1 : 0,
                losses: setsWon > opponentSetsWon ? 0 : 1,
                highscore: Math.max(...throws),
                topFinish: Math.max(...finishes)
            };
            players.push(player);
        }
    }

    updateOrCreatePlayer(player1Name, player1_throws, player1_finishes, player1_setswon, player2_setswon);
    updateOrCreatePlayer(player2Name, player2_throws, player2_finishes, player2_setswon, player1_setswon);
    
    const matchResult = {
        matchId: matches.length + 1,
        player1Id: getPlayerByName(player1Name).id,
        player2Id: getPlayerByName(player2Name).id,
        score1: numOfSets === 1 ? player1_legswon : player1_setswon,
        score2: numOfSets === 1 ? player2_legswon : player2_setswon,
        winnerId: player1_setswon > player2_setswon ? getPlayerByName(player1Name).id : getPlayerByName(player2Name).id,
        winnerName: player1_setswon > player2_setswon ? player1Name : player2Name
    };

    matches.push(matchResult);
    
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("matches", JSON.stringify(matches));
}

function resetGame() {
    player1_score = gameMode;
    player2_score = gameMode;
    player1_throws = [];
    player2_throws = [];
    player1_legswon = 0;
    player2_legswon = 0;
    player1_setswon = 0;
    player2_setswon = 0;
    currentLeg = 1;
    currentSet = 1;
    currentPlayer = 1;

    player1LegsWonDisplay.innerHTML = player1_legswon;
    player2LegsWonDisplay.innerHTML = player2_legswon;
    player1SetsWonDisplay.innerHTML = player1_setswon;
    player2SetsWonDisplay.innerHTML = player2_setswon;

    toggleInputs();
    updateDisplay();
    window.location.href = "index.html";
}

function undoLastThrow() {
    if (currentPlayer === 2 && player1_throws.length) {
        player1_score += player1_throws.pop();
        player1_currentLeg_throws.pop();
        currentPlayer = 1;
    } else if (currentPlayer === 1 && player2_throws.length) {
        player2_score += player2_throws.pop();
        player2_currentLeg_throws.pop();
        currentPlayer = 2;
    }
    toggleInputs();
    updateDisplay();
}

function toggleInputs() {
    player1Input.disabled = currentPlayer !== 1;
    player2Input.disabled = currentPlayer !== 2;
    player1Undo.disabled = currentPlayer === 1;
    player2Undo.disabled = currentPlayer === 2;
    if(currentPlayer === 1) player1Input.focus();
    else player2Input.focus();
}

function init() {
    document.querySelector('.name1').innerHTML = player1Name;
    document.querySelector('.name2').innerHTML = player2Name;
    toggleInputs();
    updateDisplay();
    player1Input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleThrow(1, player1Input);
    });
    player2Input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleThrow(2, player2Input);
    });
    player1Undo.addEventListener('click', undoLastThrow);
    player2Undo.addEventListener('click', undoLastThrow);
}

window.addEventListener('load', init);
