// Variables globales
let notes = [];
const NOTES_KEY = 'quick-jot-notes';

// Elementos del DOM
let notesContainer, emptyNotesMsg, addNoteModal;
let noteTitleInput, noteTextInput, btnAddNote, btnSaveNote, btnCancelNote;

// Funciones
function loadNotes() {
  const savedNotes = localStorage.getItem(NOTES_KEY);
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
  }
  renderNotes();
}

function saveNotes() {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function renderNotes() {
  notesContainer.innerHTML = '';
  
  if (notes.length === 0) {
    emptyNotesMsg.style.display = 'flex';
    return;
  }
  
  emptyNotesMsg.style.display = 'none';
  
  notes.forEach((note, index) => {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col-desktop mdl-cell--6-col-tablet mdl-cell--12-col-phone';
    noteCard.innerHTML = `
      <div class="mdl-card__title">
        <h4 class="note-title">${note.title || 'Sin título'}</h4>
        <button class="delete-note mdl-button mdl-js-button mdl-button--icon" data-index="${index}">
          <i class="material-icons">delete</i>
        </button>
      </div>
      <div class="mdl-card__supporting-text">
        ${note.text}
        <div class="note-date">${new Date(note.date).toLocaleString()}</div>
      </div>
    `;
    notesContainer.appendChild(noteCard);
    
    // Agregar evento al botón de eliminar
    noteCard.querySelector('.delete-note').addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      deleteNote(index);
    });
  });
}

function addNote() {
  const title = noteTitleInput.value.trim();
  const text = noteTextInput.value.trim();
  
  if (text) {
    notes.unshift({
      title: title,
      text: text,
      date: new Date().toISOString()
    });
    saveNotes();
    renderNotes();
    closeAddNote();
  }
}

function deleteNote(index) {
  if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
}

function showAddNote() {
  addNoteModal.style.display = 'flex';
  noteTitleInput.focus();
}

function closeAddNote() {
  addNoteModal.style.display = 'none';
  noteTitleInput.value = '';
  noteTextInput.value = '';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Obtener referencias a los elementos del DOM
  notesContainer = document.getElementById('notes-container');
  emptyNotesMsg = document.getElementById('empty-notes');
  addNoteModal = document.getElementById('add-note-section');
  noteTitleInput = document.getElementById('note-title');
  noteTextInput = document.getElementById('note-text');
  btnAddNote = document.getElementById('btn-add-note');
  btnSaveNote = document.getElementById('btn-save-note');
  btnCancelNote = document.getElementById('btn-cancel-note');

  // Verificar que todos los elementos existen
  if (!btnAddNote || !btnSaveNote || !btnCancelNote) {
    console.error('No se encontraron algunos elementos del DOM');
    return;
  }

  // Event Listeners
  btnAddNote.addEventListener('click', showAddNote);
  btnSaveNote.addEventListener('click', addNote);
  btnCancelNote.addEventListener('click', closeAddNote);
  
  // Cerrar modal al hacer clic fuera del contenido
  addNoteModal.addEventListener('click', (e) => {
    if (e.target === addNoteModal) {
      closeAddNote();
    }
  });
  
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  }
  
  // Cargar notas
  loadNotes();
});