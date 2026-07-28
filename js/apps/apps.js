import { createCalculator } from "./calculator.js";
import { createNotes } from "./notes.js";


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
    }
];