const workspace = document.getElementById("workspace");
import { addTaskbarApp } from "./taskbarManager.js";
const runningApps = [];

let highestZIndex = 1;

export function openWindow(app){
      const existingApp = runningApps.find(item => item.appId === app.id);

    // STEP 2
    // If found, don't create another window

    if(existingApp){

       bringToFront(existingApp);

        return;

    }

    const windowElement = document.createElement("div");

    windowElement.className = "app-window";
    windowElement.style.zIndex = highestZIndex;

    windowElement.innerHTML = `
    
        <div class="window-header">

            <span>${app.icon} ${app.name}</span>
            <div class="window-controls">

               <button class="minimize-btn">—</button>

            <button class="close-btn">✕</button>
            </div>

        </div>

        <div class="window-content">

            Welcome to ${app.name}

        </div>

    `;

    workspace.appendChild(windowElement);
    const taskbarButton = addTaskbarApp(app);
    windowElement.addEventListener("mousedown", function(){

     bringToFront(runningApp);

});


    const closeButton = windowElement.querySelector(".close-btn");

    closeButton.addEventListener("click",function(){

        const index = runningApps.findIndex(item => item.appId === app.id);
        if(index !== -1){
            runningApps[index].taskbarButton.remove();
            runningApps.splice(index,1);
        }
        windowElement.remove();

    });
    const minimizeButton = windowElement.querySelector(".minimize-btn");
    minimizeButton.addEventListener("click", function(){

    windowElement.style.display = "none";

    runningApp.minimized = true;

});


    enableDragging(windowElement);
    const runningApp = {

    appId: app.id,

    app,

    windowElement,

    taskbarButton,

    minimized: false,

    active: true

};

runningApps.push(runningApp);
bringToFront(runningApp);
taskbarButton.addEventListener("click", function(){
     if(runningApp.minimized){

        windowElement.style.display = "";

        runningApp.minimized = false;

    }
    bringToFront(runningApp);

});
}
     function bringToFront(runningApp){

    highestZIndex++;

    runningApp.windowElement.style.zIndex = String(highestZIndex);
    setActiveTaskbarButton(runningApp.taskbarButton);

}
function setActiveTaskbarButton(taskbarButton){
    const buttons = document.querySelectorAll(".taskbar-app");
    buttons.forEach(function(button){

    button.classList.remove("active");

});
taskbarButton.classList.add("active");

}
   
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


