const taskbarCenter = document.getElementById("taskbar-center");

export function addTaskbarApp(app){

    const button = document.createElement("button");

    button.className = "taskbar-app";

    button.innerHTML = `${app.icon} ${app.name}`;

    taskbarCenter.appendChild(button);

    return button;

}