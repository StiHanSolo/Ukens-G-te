// Start veiledning - Introduksjon
function startGuidedTour() {
    alert("Velkommen til Ukens Gåte! La oss starte veiledningen.");
    // Her kan du implementere en interaktiv veiledning hvis ønskelig
}

// Hint Timer - Oppdatere Hint på spesifikke tidspunkter
function startHintTimer() {
    const hintTimes = [
        { day: "Mandag", time: "10:00", elementId: "hint1" },
        { day: "Tirsdag", time: "10:00", elementId: "hint2" },
        { day: "Onsdag", time: "10:00", elementId: "hint3" },
        { day: "Torsdag", time: "10:00", elementId: "hint4" },
    ];

    hintTimes.forEach(hint => {
        const now = new Date();
        const hintTime = new Date();
        const [hours, minutes] = hint.time.split(":");
        hintTime.setHours(hours);
        hintTime.setMinutes(minutes);

        if (now < hintTime) {
            const timeRemaining = Math.floor((hintTime - now) / 1000);
            displayCountdown(timeRemaining, hint.elementId);
        } else {
            document.getElementById(hint.elementId).innerText = `${hint.day} Hint: Tilgjengelig nå!`;
        }
    });
}

function displayCountdown(seconds, elementId) {
    const countdownElement = document.getElementById(elementId);
    const countdownInterval = setInterval(() => {
        if (seconds <= 0) {
            countdownElement.innerText = "Tilgjengelig nå!";
            clearInterval(countdownInterval);
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            countdownElement.innerText = `Tilgjengelig om ${hours}t ${minutes}m ${remainingSeconds}s`;
            seconds--;
        }
    }, 1000);
}

// Oppdatere Poengtavle - Dynamisk poengtavle for team
function updateScoreboard(scores) {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = ""; // Tømmer tidligere data

    scores.forEach((score, index) => {
        const scoreEntry = document.createElement("p");
        scoreEntry.innerText = `${index + 1}. ${score.name}: ${score.points} poeng`;
        scoreboard.appendChild(scoreEntry);
    });
}

// Eksempel data for poengtavlen
const exampleScores = [
    { name: "Team Alfa", points: 150 },
    { name: "Team Beta", points: 120 },
    { name: "Team Gamma", points: 100 }
];

// Start funksjoner når siden lastes inn
window.onload = function() {
    startHintTimer();
    updateScoreboard(exampleScores);
};
