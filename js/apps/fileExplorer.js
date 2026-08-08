export function createFileExplorer() {

    const fileSystem = {

    Home: {

        Documents: {
            "Resume.pdf": "file",
            "Notes.txt": "file"
        },

        Downloads: {
            "Chrome.exe": "file",
            "Music.mp3": "file"
        },

        Pictures: {
            "Wallpaper.png": "file",
            "Beach.jpg": "file"
        },

        Projects: {

            "Browser OS": {

            },

            "React App": {

            }

        }

    }

};

let currentFolder = fileSystem.Home;

let currentPath = ["Home"];

let history = [

    {

        folder:fileSystem.Home,

        path:["Home"]

    }

];

let historyIndex = 0;

    let selectedItem = null;

    const explorer = document.createElement("div");

    explorer.className = "file-explorer";

    explorer.innerHTML = `

        <div class="explorer-sidebar">

           <div class="sidebar-item active" data-folder="Home">🏠 Home</div>

           <div class="sidebar-item" data-folder="Documents">📄 Documents</div>

           <div class="sidebar-item" data-folder="Downloads">⬇️ Downloads</div>

           <div class="sidebar-item" data-folder="Pictures">🖼️ Pictures</div>

           <div class="sidebar-item" data-folder="Projects">📁 Projects</div>

        </div>

        <div class="explorer-main">

            <div class="explorer-toolbar">

                <button>←</button>

                <button>→</button>

                <button>↑</button>

               <div class="explorer-path"></div>

               <input type="text" 
               class="explorer-search" 
               placeholder="Search..."
               >

               <button class="new-folder-btn">
                 ➕ New Folder
               </button>

               <button class="rename-btn">

                 ✏️ Rename

               </button>

            </div>

            <button class="delete-btn">
               🗑 Delete
            </button>

            <div class="explorer-grid">

                <div class="file-card">
                    📁
                    <p>Projects</p>
                </div>

                <div class="file-card">
                    📁
                    <p>Browser OS</p>
                </div>

                <div class="file-card">
                    📄
                    <p>Resume.pdf</p>
                </div>

                <div class="file-card">
                    🖼️
                    <p>Wallpaper.png</p>
                </div>

            </div>

        </div>

    `;

    const sidebarItems = explorer.querySelectorAll(".sidebar-item");

     const explorerGrid = explorer.querySelector(".explorer-grid");

    const pathContainer =
explorer.querySelector(".explorer-path");

     const backButton =
    explorer.querySelector(".explorer-toolbar button:nth-child(1)");

    const forwardButton = explorer.querySelector(".explorer-toolbar button:nth-child(2)");

     const upButton = explorer.querySelector(".explorer-toolbar button:nth-child(3)");

    const searchInput = explorer.querySelector(".explorer-search");

    const newFolderButton =explorer.querySelector(".new-folder-btn");

    const renameButton =explorer.querySelector(".rename-btn");

    const deleteButton = explorer.querySelector(".delete-btn");

     function getIcon(type, name){

    if(type === "folder") return "📁";

    if(name.endsWith(".png") || name.endsWith(".jpg"))
        return "🖼️";

    if(name.endsWith(".pdf"))
        return "📄";

    if(name.endsWith(".txt"))
        return "📝";

    if(name.endsWith(".mp3"))
        return "🎵";

    if(name.endsWith(".exe"))
        return "⚙️";

    return "📄";

}





   function renderExplorer(){

    explorerGrid.innerHTML = "";

   pathContainer.innerHTML = "";

currentPath.forEach((folder,index)=>{

    const crumb = document.createElement("span");

    crumb.className = "breadcrumb";

    crumb.dataset.index = index;

    crumb.textContent = folder;

    pathContainer.appendChild(crumb);

    if(index !== currentPath.length-1){

        const separator = document.createElement("span");

        separator.textContent = " > ";

        pathContainer.appendChild(separator);

    }

});


   
const search = searchInput.value.toLowerCase();

const entries = Object.entries(currentFolder)
    .filter(([name]) =>
        name.toLowerCase().includes(search)
    );

entries.forEach(([name, value]) => {

    const card = document.createElement("div");

    card.className = "file-card";

    const type =
        typeof value === "object"
            ? "folder"
            : value;

    card.dataset.name = name;
    card.dataset.type = type;

    card.innerHTML = `
        <div class="file-icon">
            ${getIcon(type, name)}
        </div>
        <p>${name}</p>
    `;

    explorerGrid.appendChild(card);

});
   }

explorerGrid.addEventListener("dblclick", function(event){

    const card = event.target.closest(".file-card");

    if(!card) return;

    if(card.dataset.type !== "folder") return;

    const folderName = card.dataset.name;

    currentFolder = currentFolder[folderName];

    currentPath.push(folderName);

    history.splice(historyIndex + 1);

    history.push({

        folder: currentFolder,

        path: [...currentPath]

    });

    historyIndex++;

    renderExplorer();

});

backButton.addEventListener("click",function(){

    if(historyIndex===0) return;

    historyIndex--;

    currentFolder = history[historyIndex].folder;

    currentPath = [...history[historyIndex].path];

    renderExplorer();

});

forwardButton.addEventListener("click",function(){

    if(historyIndex===history.length-1) return;

    historyIndex++;

    currentFolder = history[historyIndex].folder;

    currentPath = [...history[historyIndex].path];

    renderExplorer();

});

pathContainer.addEventListener("click",function(event){

    if(!event.target.classList.contains("breadcrumb"))
        return;

    const index = Number(event.target.dataset.index);

    currentFolder = fileSystem.Home;

    currentPath = ["Home"];

    for(let i=1;i<=index;i++){

        currentFolder =
        currentFolder[currentPath[i]];

    }

    currentPath = currentPath.slice(0,index+1);

    history.splice(historyIndex+1);

    history.push({

        folder:currentFolder,

        path:[...currentPath]

    });

    historyIndex++;

    renderExplorer();

});

upButton.addEventListener("click", function(){

    if(currentPath.length === 1) return;

    currentPath.pop();

    currentFolder = fileSystem.Home;

    for(let i = 1; i < currentPath.length; i++){

        currentFolder =
            currentFolder[currentPath[i]];

    }

    renderExplorer();

});

searchInput.addEventListener("input",function(){

    renderExplorer();

});

newFolderButton.addEventListener("click",function(){

    let folderName = "Untitled Folder";

    let count = 1;

    while(currentFolder[folderName]){

        folderName = `Untitled Folder (${count})`;

        count++;

    }

    currentFolder[folderName] = {};

    renderExplorer();

});

renameButton.addEventListener("click",function(){

    if(!selectedItem){

        alert("Select a folder first");

        return;

    }

    const newName = prompt(
        "Enter new name",
        selectedItem
    );

    if(!newName) return;

    if(currentFolder[newName]){

        alert("Folder already exists");

        return;

    }

    currentFolder[newName] =
        currentFolder[selectedItem];

    delete currentFolder[selectedItem];

    selectedItem = newName;

    renderExplorer();

});


    explorerGrid.addEventListener("click",function(event){

    const card = event.target.closest(".file-card");

    if(!card) return;

    document
        .querySelectorAll(".file-card")
        .forEach(card=>{

            card.classList.remove("selected");

        });

    card.classList.add("selected");

    selectedItem = card.dataset.name;

});

  deleteButton.addEventListener("click",function(){

    if(!selectedItem){

        alert("Select a file or folder first");

        return;

    }

    const confirmed = confirm(
        `Delete "${selectedItem}"?`
    );

    if(!confirmed) return;

    delete currentFolder[selectedItem];

    selectedItem = null;

    renderExplorer();

});

sidebarItems.forEach(item => {

    item.addEventListener("click", function(){

        sidebarItems.forEach(sidebar =>
            sidebar.classList.remove("active")
        );

        this.classList.add("active");

        const folder = this.dataset.folder;

        if(folder === "Home"){

            currentFolder = fileSystem.Home;
            currentPath = ["Home"];

        }else{

            currentFolder = fileSystem.Home[folder];
            currentPath = ["Home", folder];

        }

        history.splice(historyIndex + 1);

        history.push({

            folder: currentFolder,

            path: [...currentPath]

        });

        historyIndex++;

        renderExplorer();

    });

});



   console.log(fileSystem);
console.log(currentFolder);
    renderExplorer();
    return explorer;

}