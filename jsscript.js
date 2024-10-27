// Prompt for User Name and Store in Local Storage
function promptUserName() {
    let userName = localStorage.getItem("userName");
    if (!userName) {
        userName = prompt("Enter your name:");
        localStorage.setItem("userName", userName);
    }
    document.getElementById("userNameDisplay").innerText = `Welcome, ${userName}`;
}

// Riddle data for the week
const riddles = [
    { day: "Mandag", text: "Hva har hender, men kan ikke klappe?", answer: "klokke" },
    { day: "Tirsdag", text: "Hva blir våtere jo mer det tørker?", answer: "håndkle" },
    { day: "Onsdag", text: "Hva har mange tenner men biter ikke?", answer: "kam" },
    { day: "Torsdag", text: "Hva går opp og ned, men beveger seg aldri?", answer: "trapp" }
];

// Display the riddle of the day
function startGuidedTour() {
    const today = new Date().getDay();
    const riddle = riddles[today - 1];  // Adjust for correct day index
    document.getElementById("riddleContainer").innerText = `${riddle.day}'s gåte: ${riddle.text}`;
}

// Initialize Leaderboard with Local Storage
function updateLeaderboard(score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: localStorage.getItem("userName"), score: score });
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    displayLeaderboard(leaderboard);
}

function displayLeaderboard(leaderboard) {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement("p");
        listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score} points`;
        scoreboard.appendChild(listItem);
    });
}

// Apply Theme
function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
}

// Run on page load
window.onload = function() {
    const savedTheme = localStorage.getItem("theme") || "theme-day";
    applyTheme(savedTheme);
    document.getElementById("themeSelector").value = savedTheme;
    promptUserName();
    updateLeaderboard(0);
};

// Sound Effects
function playSound(soundId) {
    document.getElementById(soundId).play();
}

function toggleSound() {
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}
