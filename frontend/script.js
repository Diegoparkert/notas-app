document.addEventListener('DOMContentLoaded', function() {
    fetchNotes();

    document.getElementById('note-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const noteInput = document.getElementById('note-input');
        const noteText = noteInput.value.trim();

        if (noteText !== "") {
            addNoteToBackend(noteText);
            noteInput.value = "";
        }
    });
});

function fetchNotes() {
    fetch('http://localhost:5000/notes')
        .then(response => response.json())
        .then(data => {
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = '';
            data.forEach(note => {
                addNoteToList(note.content);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addNoteToBackend(noteContent) {
    fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: noteContent }),
    })
    .then(response => response.json())
    .then(note => {
        addNoteToList(note.content);
    })
    .catch(error => console.error('Error:', error));
}

function addNoteToList(noteContent) {
    const notesList = document.getElementById('notes-list');
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.textContent = noteContent;
    notesList.appendChild(noteElement);
}
