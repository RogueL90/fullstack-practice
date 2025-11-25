import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filtered, setFiltered] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  
  const handleDelete = (id) => {
    if(!window.confirm("you sure you wanna delete ts?")) return;
    personService.deleteEntry(id)
    .then(response => setPersons(persons.filter(person => person.id !== id)));
  }

  const Display = ({persons}) => {
    const arr = !filtered ? persons : persons.filter(person => person.name === searchValue);
    if(arr.length===0) return (<p>No results</p>)
      return(
        arr.map(person => {
          return (
            <div key={person.id}>
            <p >{person.name}, {person.number}</p> <button  onClick = {() => {handleDelete(person.id)}} >delete</button>
            </div>
          )
        })
      )
  }

  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
  }, [])

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleNewSearch = (event) => {
    setSearchValue(event.target.value);
    if(searchValue === "") setFiltered(false)
  }

  const handleSave = (event) => {
    event.preventDefault();
    if(persons.some(person => person.name === newName)){
      console.log(newName, 'is already in the book')
      return;
    }
    if(persons.some(person => person.number === newNumber)){
      if(!window.confirm("This number is already in the phonebook. Override the name associated with it?"))return;
      const idOfDup = persons.filter(person => person.number === newNumber)[0].id;
      personService.changeName(idOfDup, newName).then(response => {
        const newArr = persons.map(person => person.id!==response.id ? person : response);
        setPersons(newArr);
      });
      setErrorMessage(
      `Name changed of number ${newNumber} to ${newName}!`
    )
    setTimeout(() => {setErrorMessage(null)}, 3000);
      setNewName("");
      setNewNumber("");
      return;
    }
    const newEntry = 
      {name: newName,
        number: newNumber
      }
    personService.createEntry(newEntry)
    .then(response => setPersons(persons.concat(response)));
    setErrorMessage(
      `Entry added in the phonebook for ${newName}!`
    )
    setNewName("");
    setNewNumber("");
    setTimeout(() => {setErrorMessage(null)}, 3000);
  }

  const handleFilter = (event) => {
    event.preventDefault();
     setFiltered(true);
  }
    
  const clearSearch = () => {
    setFiltered(false);
    setSearchValue("");
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message = {errorMessage} />
      <div>
        <form onSubmit = {handleFilter}>
          <div>
          search filter: <input value = {searchValue} onChange = {handleNewSearch} />
          </div>
          <div>
          <button type="Submit">Search</button>
          </div>
        </form>
        <button onClick = {clearSearch}>Clear Search</button>
      </div>
      <h2>Add Person</h2>
      <form onSubmit = {handleSave}>
        <div>
          name: <input value = {newName} onChange = {handleNewName}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNewNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Display persons = {persons} />
      </div>
    </div>
  )
}
export default App;