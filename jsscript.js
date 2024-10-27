function startGuidedTour() {
    alert("Velkommen! Denne veiledningen hjelper deg å komme i gang.");
}

function loadHint(hintNumber, hintText) {
    document.getElementById(`hint${hintNumber}`).innerText = hintText;
}

// Example: Load hints at specific times (for demonstration; adjust times as needed)
setTimeout(() => loadHint(1, "Mandag Hint: Sjekk nøye!"), 10000);
setTimeout(() => loadHint(2, "Tirsdag Hint: Et skritt nærmere!"), 20000);
setTimeout(() => loadHint(3, "Onsdag Hint: Se tilbake på de første hintene!"), 30000);
setTimeout(() => loadHint(4, "Torsdag Hint: Dette hintet er avgjørende!"), 40000);
