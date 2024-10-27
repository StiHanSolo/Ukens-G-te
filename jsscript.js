// Prompt for User Name and Store in Local Storage
function promptUserName() {
    let userName = localStorage.getItem("userName");
    if (!userName) {
        userName = prompt("Enter your name:");
        localStorage.setItem("userName", userName);
    }
    document.getElementById("userNameDisplay").innerText = `Welcome, ${userName}`;
}

// Initialize Leaderboard with Local Storage
function updateLeaderboard(score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: localStorage.getItem("userName"), score: score });
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);  // Top 10 scores
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

// Start Puzzle Timer and Scoring
let timer;
let timeElapsed = 0;

function startPuzzleTimer() {
    timeElapsed = 0;
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById("timerDisplay").innerText = `Time: ${timeElapsed}s`;
    }, 1000);
}

function stopPuzzleTimer() {
    clearInterval(timer);
    const score = calculateScore(timeElapsed);
    updateLeaderboard(score);
}

function calculateScore(time) {
    return Math.max(100 - time, 0);  // Higher score for faster completion
}

// Achievements Functionality
function unlockAchievement(achievement) {
    const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
    if (!achievements.includes(achievement)) {
        achievements.push(achievement);
        localStorage.setItem("achievements", JSON.stringify(achievements));
        displayAchievement(achievement);
    }
}

function displayAchievement(achievement) {
    const achievementList = document.getElementById("achievementList");
    const listItem = document.createElement("li");
    listItem.innerText = achievement;
    listItem.classList.add("reveal-hint");  // Apply reveal animation
    achievementList.appendChild(listItem);
}

// Theme Management
function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
}

// Check for saved theme on load
window.onload = function() {
    const savedTheme = localStorage.getItem("theme") || "theme-day";
    applyTheme(savedTheme);
    document.getElementById("themeSelector").value = savedTheme;
    promptUserName();
    updateLeaderboard(0);  // Example initial score
};

// Sound Effects and Background Music
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
