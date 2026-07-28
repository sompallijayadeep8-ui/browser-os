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
    let notesData = [];

    let selectedNoteId = null;

    const newNoteBtn = notes.querySelector(".new-note-btn");
     const notesList = notes.querySelector(".notes-list");

     const titleInput = notes.querySelector(".note-title");
     const contentInput = notes.querySelector(".note-content");


     function renderNotes(){

    notesList.innerHTML = "";

    notesData.forEach(note => {

        const noteItem = document.createElement("div");

        noteItem.className = "note-item";

        noteItem.dataset.id = note.id;

        noteItem.innerHTML = `
            <h4>${note.title || "Untitled"}</h4>
            <button class="delete-note">🗑</button>
        `;

        if(note.id === selectedNoteId){
            noteItem.classList.add("active");
        }

        notesList.appendChild(noteItem);

    });

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

    titleInput.value = "";

    contentInput.value = "";

    titleInput.focus();

});
notesList.addEventListener("click",(event)=>{

    const noteItem = event.target.closest(".note-item");

    if(!noteItem) return;

    const id = Number(noteItem.dataset.id);

   

    const note = notesData.find(note => note.id === id);

    if(event.target.classList.contains("delete-note")){

        notesData = notesData.filter(note => note.id !== id);

        if(selectedNoteId === id){

            selectedNoteId = null;

            titleInput.value = "";

            contentInput.value = "";

        }

        renderNotes();

        return;

    }

    selectedNoteId = id;

    titleInput.value = note.title;

    contentInput.value = note.content;

    renderNotes();

});

    return notes;

}