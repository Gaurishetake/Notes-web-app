const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

function createNote(content = "") {
  const note = document.createElement("div");
  note.className = "note";

  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.rows = 5;

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  editBtn.title = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete";

  // Save on input
  textarea.addEventListener("input", () => saveNotes());

  deleteBtn.addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  note.appendChild(actions);
  note.appendChild(textarea);
  notesContainer.appendChild(note);

  saveNotes();
}

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note textarea").forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => createNote(note));
}

addNoteBtn.addEventListener("click", () => createNote());

loadNotes();
