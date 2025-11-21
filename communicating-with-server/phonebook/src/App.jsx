import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filtered, setFiltered] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  
  const Display = ({persons}) => {
    const arr = !filtered ? persons : persons.filter(person => person.name === searchValue);
    if(arr.length===0) return (<p>No results</p>)
      return(
        arr.map(person => <p key={person.number}>{person.name}, {person.number}</p>)
      )
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => setPersons(response.data))
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
    const newArr = [
      ...persons,
      {name: newName,
        number: newNumber
      }
    ]
    setPersons(newArr);
    setNewName("");
    setNewNumber("");
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