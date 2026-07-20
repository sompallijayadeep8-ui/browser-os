import { apps } from "../apps/apps.js";
import { openWindow } from "./windowManager.js";

const desktopArea = document.getElementById("desktop-area");

let selectedIcon = null;

function createDesktopIcon(app){

    return `
        <div class="desktop-icon" data-app="${app.id}">
            <div class="icon-image">${app.icon}</div>
            <span class="icon-label">${app.name}</span>
        </div>
    `;
}

export function renderDesktopIcons(){

    desktopArea.innerHTML = "";

    apps.forEach(app=>{

        desktopArea.innerHTML += createDesktopIcon(app);

    });

    initializeDesktopEvents();

}

function initializeDesktopEvents(){

    const icons = document.querySelectorAll(".desktop-icon");

    icons.forEach(icon=>{

        icon.addEventListener("click",function(event){

            event.stopPropagation();

            if(selectedIcon){

                selectedIcon.classList.remove("selected");

            }

            selectedIcon=this;

            selectedIcon.classList.add("selected");

        });
         icon.addEventListener("dblclick",function(event){

    event.stopPropagation();

    const appId = this.dataset.app;

    const app = apps.find(function(item){

        return item.id===appId;

    });

    openWindow(app);

});

    });

    desktopArea.addEventListener("click",function(){

        if(selectedIcon){

            selectedIcon.classList.remove("selected");

            selectedIcon=null;

        }
       

    });
}


