import Notes from './components/Notes'
import {useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'
import './index.css'


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('set new note');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })
console.log(user)
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
// Check if token exists in local storage
  useEffect(() => {
    if(user){
      noteService.setToken(user.token)
    }
    } , [user])
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

// logs in
  const handleLogin = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
    const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  )

  const notesToShow = showAll ? notes : notes.filter(note => note.important);


  return(
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage} />
       {!user && loginForm()}
       {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
       )}
       <div>
        <button onClick = {() => setShowAll(!showAll)} >show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Notes key = {note.id} note = {note} toggleImportance = {() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <Footer />
    </div>
  )
}
export default App;
