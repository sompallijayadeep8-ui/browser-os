export function createNotes() {

    const notes = document.createElement("div");

    notes.className = "notes-app";

    notes.innerHTML = `
    
        <div class="notes-sidebar">

            <button class="new-note-btn">
                + New Note
            </button>

            <div class="notes-list">

            </div>

        </div>

        <div class="notes-editor">

            <input
                class="note-title"
                placeholder="Title"
            >

            <textarea
                class="note-content"
                placeholder="Write your note here..."
            ></textarea>

        </div>

    `;
    let notesData =
    JSON.parse(
        localStorage.getItem("browser-os-notes")
    ) || [];

let selectedNoteId =
    notesData.length
        ? notesData[0].id
        : null;

const newNoteBtn = notes.querySelector(".new-note-btn");
const notesList = notes.querySelector(".notes-list");

const titleInput = notes.querySelector(".note-title");
const contentInput = notes.querySelector(".note-content");

function saveNotes() {

    localStorage.setItem(
        "browser-os-notes",
        JSON.stringify(notesData)
    );

}

function renderNotes() {

    notesList.innerHTML = "";

    notesData.forEach(note => {

        const noteItem = document.createElement("div");

        noteItem.className = "note-item";

        noteItem.dataset.id = note.id;

        noteItem.innerHTML = `
            <h4>${note.title || "Untitled"}</h4>
            <button class="delete-note">🗑️</button>
        `;

        if (note.id === selectedNoteId) {
            noteItem.classList.add("active");
        }

        notesList.appendChild(noteItem);

    });

    const selectedNote = notesData.find(
        note => note.id === selectedNoteId
    );

    if (selectedNote) {

        titleInput.value = selectedNote.title;
        contentInput.value = selectedNote.content;

    } else {

        titleInput.value = "";
        contentInput.value = "";

    }

}

newNoteBtn.addEventListener("click", () => {

    const note = {

        id: Date.now(),

        title: "",

        content: ""

    };

    notesData.unshift(note);

    selectedNoteId = note.id;

    renderNotes();

    saveNotes();

    titleInput.focus();

});

notesList.addEventListener("click", (event) => {

    const noteItem = event.target.closest(".note-item");

    if (!noteItem) return;

    const id = Number(noteItem.dataset.id);

    if (event.target.classList.contains("delete-note")) {

        notesData = notesData.filter(
            note => note.id !== id
        );

        if (selectedNoteId === id) {

            selectedNoteId =
                notesData.length
                    ? notesData[0].id
                    : null;

        }

        renderNotes();

        saveNotes();

        return;

    }

    selectedNoteId = id;

    renderNotes();

});

titleInput.addEventListener("input", () => {

    const note = notesData.find(
        note => note.id === selectedNoteId
    );

    if (!note) return;

    note.title = titleInput.value;

    renderNotes();

    saveNotes();

});

contentInput.addEventListener("input", () => {

    const note = notesData.find(
        note => note.id === selectedNoteId
    );

    if (!note) return;

    note.content = contentInput.value;

    saveNotes();

});

renderNotes();

return notes;
}