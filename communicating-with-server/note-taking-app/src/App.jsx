import Notes from './components/Notes'
import {useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import './index.css'


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('set new note');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
//toggle importance button handler
  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id ===id)
    const changedNote = {...note, important: !note.important};
    noteService.update(id, changedNote).then(returnedNote => setNotes(notes.map(note => 
      note.id ===id ? returnedNote : note
    ))).catch(error => {
      setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification message = {errorMessage} />
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
      <Footer />
    </div>
  )
}
export default App;
