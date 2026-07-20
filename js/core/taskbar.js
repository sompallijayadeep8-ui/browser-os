const clock = document.getElementById("taskbar-clock");
const startButton = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");

function updateClock() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

updateClock();
setInterval(updateClock, 60000);

/* ---------- Start Menu ---------- */

function toggleStartMenu(event) {
    event.stopPropagation();
    startMenu.classList.toggle("show");
}

function closeStartMenu() {
    startMenu.classList.remove("show");
}

startButton.addEventListener("click", toggleStartMenu);

document.addEventListener("click", closeStartMenu);