import Notes from './components/Notes'
import {useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('set new note');
  const [showAll, setShowAll] = useState(true);
//toggle importance button handler
  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id ===id)
    const changedNote = {...note, important: !note.important};
    noteService.update(id, changedNote).then(returnedNote => setNotes(notes.map(note => 
      note.id ===id ? returnedNote : note
    ))).catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  }
// load notes initially
  const hook = () => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    }
    )};
  useEffect(hook, []);
// add a note
  const addNote = (note) => {
    note.preventDefault()
    const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }
  noteService.create(noteObject)
  .then(returnedNote =>{setNotes(notes.concat(returnedNote))
      setNewNote('')})
  }
// typing
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);
console.log(showAll);

  return(
    <div>
      <h1>Notes</h1>
       <div>
        <button onClick = {() => setShowAll(!showAll)} >show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Notes key = {note.id} note = {note} toggleImportance = {() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit = {addNote}>
        <input value = {newNote} onChange = {handleNoteChange}/>
        <button type = "Submit">save</button>
      </form>
      <br />
    </div>
  )
}
export default App;
