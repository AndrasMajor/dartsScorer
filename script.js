const startButton = document.querySelector('#startButton');
const gameModes = document.querySelectorAll('.game-mode');
let mode = 0;
let bool = false;
const statsTable = document.querySelector('#statsTable');
// const matchesTable = document.querySelector('#matchesTable');


function gameModeselected() {
    return bool;
}

function startFc() {
    if (gameModeselected()) {
        sessionStorage.setItem('gameMode', mode);
        window.location.href = 'settings.html';
    }
}

function addStyle(clicked) {
    gameModes.forEach(gameMode => {
        gameMode.style.color = "#0A1117";
        gameMode.style.transform = "scale(1.0)";
        gameMode.style.background =  "background-color: #0A1117;";
    });
    clicked.style.color = "#E0FBFC";
    clicked.style.transform = "scale(1.05)";
    clicked.style.background =  "linear-gradient(145deg, #5BE7A9, #334f74);";
    mode = clicked.innerHTML;
    bool = true;
}

function init() {
    startButton.addEventListener('click', startFc, false);
    gameModes.forEach(gameMode => {
        gameMode.addEventListener('click', () => addStyle(gameMode), false);
    });
}

const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

btn.onclick = function() {
    modal.style.display = "block";
    loadStats();
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function loadStats() {
   
    let statsString = "";
    let matchesString = "";

    let players = localStorage.getItem("players");
    let matches = localStorage.getItem("matches");

    if (!players || !matches) {
        statsTable.innerHTML = "<tr><td>No stats available</td></tr>";
        matchesTable.innerHTML = "<tr><td>No matches available</td></tr>";
        return;
    }

    let playersStats = JSON.parse(players);
    let matchesPlayed = JSON.parse(matches);

    let headerRow = `
        <tr>
            <th>Név</th>
            <th>Átlag</th>
            <th>Lejátszott meccsek</th>
            <th>Győzelmek</th>
            <th>Vereségek</th>
            <th>Legmagasabb pont</th>
            <th>Top Finish</th>
        </tr>
    `;
    statsString += headerRow;

    playersStats.forEach(player => {
        let row = `
            <tr>
                <td>${player.name}</td>
                <td>${player.average.toFixed(2)}</td>
                <td>${player.matchesPlayed}</td>
                <td>${player.wins}</td>
                <td>${player.losses}</td>
                <td>${player.highscore}</td>
                <td>${player.topFinish}</td>
            </tr>
        `;
        statsString += row;
    });

    let matchesHeaderRow = `
        <tr>
            <th>Meccs ID</th>
            <th>Játékos 1</th>
            <th>Játékos 2</th>
            <th>Eredmény</th>
            <th>Győztes</th>
        </tr>
    `;
    matchesString += matchesHeaderRow;

    matchesPlayed.forEach(match => {
        let row = `
            <tr>
                <td>${match.matchId}</td>
                <td>${getPlayerName(playersStats, match.player1Id)}</td>
                <td>${getPlayerName(playersStats, match.player2Id)}</td>
                <td>${match.score1} - ${match.score2}</td>
                <td>${match.winnerName}</td>
            </tr>
        `;
        matchesString += row;
    });

    statsTable.innerHTML = statsString;
    // matchesTable.innerHTML = matchesString;
}

function getPlayerName(players, id) {
    let player = players.find(p => p.id === id);
    return player ? player.name : "Unknown";
}


window.addEventListener('load', init);
