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

                <button class="maximize-btn">▢</button>


            <button class="close-btn">✕</button>
            </div>

        </div>

        <div class="window-content">

           

        </div>

        <div class="resize-handle"></div>

    `;

    workspace.appendChild(windowElement);

    const windowContent = windowElement.querySelector(".window-content");

    if (app.content) {
    windowContent.appendChild(app.content());
}


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

    const resizeHandle = windowElement.querySelector(".resize-handle");

let isResizing = false;

resizeHandle.addEventListener("mousedown", function(event){

     console.log("Resize Started");

     if(runningApp.maximized){
        return;
     }


    isResizing = true;

});


document.addEventListener("mousemove", function(event){

    if(!isResizing) return;

    // Resize logic comes here
   const MIN_WIDTH = 250;
   const MIN_HEIGHT = 100;

     const newWidth = event.clientX - windowElement.offsetLeft;

    const newHeight = event.clientY - windowElement.offsetTop;

if(newWidth >= MIN_WIDTH && newHeight >= MIN_HEIGHT){

    windowElement.style.width  = newWidth + "px";
    windowElement.style.height = newHeight + "px";
}

});


document.addEventListener("mouseup", function(){

    isResizing = false;

});


    const minimizeButton = windowElement.querySelector(".minimize-btn");

      minimizeButton.addEventListener("click", function () {

    windowElement.style.display = "none";

    runningApp.minimized = true;

});


    const maximizeButton =windowElement.querySelector(".maximize-btn");


    maximizeButton.addEventListener("click",function(){
        toggleMaximize();
    });
    const header = windowElement.querySelector(".window-header");

  header.addEventListener("dblclick", function(){

    toggleMaximize();

});

    enableDragging(windowElement);
    const runningApp = {

    appId: app.id,

    app,

    windowElement,

    taskbarButton,

    minimized: false,

    maximized: false,

    previousState:null,

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

function toggleMaximize(){
         if(runningApp.maximized){
            windowElement.style.left = runningApp.previousState.left;
           windowElement.style.top = runningApp.previousState.top;
           windowElement.style.width = runningApp.previousState.width;
           windowElement.style.height = runningApp.previousState.height;
           runningApp.maximized = false;
        }
    else{
        
        runningApp.previousState = {

    left: windowElement.style.left,

    top: windowElement.style.top,

    width: windowElement.style.width,

    height: windowElement.style.height

};
   windowElement.style.left = "0px";

   windowElement.style.top = "0px";

   windowElement.style.width = workspace.clientWidth+ "px";

   windowElement.style.height = workspace.clientHeight+ "px";

   console.log(workspace.clientWidth);
console.log(workspace.clientHeight);

   runningApp.maximized = true;
    }
    };
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


