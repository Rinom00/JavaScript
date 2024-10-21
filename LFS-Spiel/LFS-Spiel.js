const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ";
let selectedLetter = "";
let players = [];
let playerPoints = {};
let countdownTimer;
let gameDuration = 60; // 60 Sekunden für das Spiel

// Zufälligen Buchstaben auswählen
function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

// Spiel initialisieren und Timer starten
function loadGame() {
    selectedLetter = getRandomLetter();
    document.getElementById('letter').textContent = selectedLetter;
    startTimer(gameDuration);
}

// Timer-Funktion
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    countdownTimer = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        document.getElementById('timer').textContent = `Zeit: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (--timer < 0) {
            clearInterval(countdownTimer);
            endGame();
        }
    }, 1000);
}

// Antworten senden und Punkte berechnen
function submitAnswers() {
    const stadt = document.getElementById("stadt").value.trim();
    const land = document.getElementById("land").value.trim();
    const fluss = document.getElementById("fluss").value.trim();

    let playerName = prompt("Bitte deinen Namen eingeben:");
    if (!players.includes(playerName)) {
        players.push(playerName);
        playerPoints[playerName] = 0;
    }

    let results = document.getElementById("results");
    results.innerHTML += `<h3>${playerName}'s Ergebnisse</h3>`;

    // Stadt überprüfen
    if (stadt.charAt(0).toUpperCase() === selectedLetter) {
        results.innerHTML += `<p><strong>Stadt:</strong> ${stadt} - Richtig (+10 Punkte)</p>`;
        playerPoints[playerName] += 10;
    } else {
        results.innerHTML += `<p><strong>Stadt:</strong> ${stadt} - Falsch (0 Punkte)</p>`;
    }

    // Land überprüfen
    if (land.charAt(0).toUpperCase() === selectedLetter) {
        results.innerHTML += `<p><strong>Land:</strong> ${land} - Richtig (+10 Punkte)</p>`;
        playerPoints[playerName] += 10;
    } else {
        results.innerHTML += `<p><strong>Land:</strong> ${land} - Falsch (0 Punkte)</p>`;
    }

    // Fluss überprüfen
    if (fluss.charAt(0).toUpperCase() === selectedLetter) {
        results.innerHTML += `<p><strong>Fluss:</strong> ${fluss} - Richtig (+10 Punkte)</p>`;
        playerPoints[playerName] += 10;
    } else {
        results.innerHTML += `<p><strong>Fluss:</strong> ${fluss} - Falsch (0 Punkte)</p>`;
    }

    // Eingabefelder leeren
    document.getElementById("stadt").value = "";
    document.getElementById("land").value = "";
    document.getElementById("fluss").value = "";

    // Punkte aktualisieren
    document.getElementById('points').textContent = `Punkte: ${playerPoints[playerName]}`;
}

// Spiel beenden und Punkte anzeigen
function endGame() {
    let results = document.getElementById("results");
    results.innerHTML += `<h2>Spiel beendet!</h2>`;
    results.innerHTML += `<h3>Endergebnisse:</h3>`;

    for (let player in playerPoints) {
        results.innerHTML += `<p>${player}: ${playerPoints[player]} Punkte</p>`;
    }
    
    // Neustart ermöglichen
    clearInterval(countdownTimer);
    alert("Das Spiel ist zu Ende. Hier sind die Endergebnisse.");
    resetGame();
}

// Spiel neustarten
function resetGame() {
    players = [];
    playerPoints = {};
    document.getElementById("results").innerHTML = "";
    document.getElementById("timer").textContent = "";
    document.getElementById("points").textContent = "";
    loadGame();
}

// Spiel laden, wenn die Seite geöffnet wird
window.onload = loadGame;