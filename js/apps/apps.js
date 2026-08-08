import { createCalculator } from "./calculator.js";
import { createNotes } from "./notes.js";
import { createFileExplorer } from "./fileExplorer.js";
import { createSettings } from "./settings.js";


export const apps = [
    {
        id: "notes",
        name: "Notes",
        icon: "📝",
        content: createNotes
    },
    {
        id: "calculator",
        name: "Calculator",
        icon: "🧮",
        content: createCalculator
    },
    {
        id: "browser",
        name: "Browser",
        icon: "🌐"
    },
    {
        id: "settings",
        name: "Settings",
        icon: "⚙️"
    },
    {
        id: "recycle-bin",
        name: "Recycle Bin",
        icon: "🗑️"
    },

    {
    id:"file-explorer",

    name:"File Explorer",

    icon:"📁",

    content:createFileExplorer
},


{
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    content: createSettings
}

];