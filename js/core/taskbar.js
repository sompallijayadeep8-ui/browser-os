const clock = document.getElementById("taskbar-clock");
const startButton = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    clock.textContent = time;
}

updateClock();

setInterval(updateClock, 60000);
startButton.addEventListener("click", function () {
    event.stopPropagation();
    startMenu.classList.toggle("hidden");

});
document.addEventListener("click", function () {
    startMenu.classList.add("hidden");
});
