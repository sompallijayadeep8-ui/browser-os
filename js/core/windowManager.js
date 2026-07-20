const workspace = document.getElementById("workspace");

export function openWindow(app){

    const window = document.createElement("div");

    window.className = "app-window";

    window.innerHTML = `
    
        <div class="window-header">

            <span>${app.icon} ${app.name}</span>

            <button class="close-btn">✕</button>

        </div>

        <div class="window-content">

            Welcome to ${app.name}

        </div>

    `;

    workspace.appendChild(window);

    const closeButton = window.querySelector(".close-btn");

    closeButton.addEventListener("click",function(){

        window.remove();

    });

    enableDragging(window);
   
    function enableDragging(windowElement){

    const header = windowElement.querySelector(".window-header");

    let isDragging = false;

    let offsetX = 0;

    let offsetY = 0;

    header.addEventListener("mousedown", function(event){

        isDragging = true;

        offsetX = event.clientX - windowElement.offsetLeft;

        offsetY = event.clientY - windowElement.offsetTop;

    });

    document.addEventListener("mousemove", function(event){

        if(!isDragging) return;

        windowElement.style.left = `${event.clientX - offsetX}px`;

        windowElement.style.top = `${event.clientY - offsetY}px`;

    });

    document.addEventListener("mouseup", function(){

        isDragging = false;

    });

}
}

