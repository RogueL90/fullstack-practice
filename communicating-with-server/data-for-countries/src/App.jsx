import { useState, useEffect} from 'react'
import axios from 'axios'
import SearchResults from './components/SearchResults'
const App = () => {
const [searchVal, setSearchVal] = useState("");
const [resultsList, setresultsList] = useState([]);
const [countries, setCountries] = useState([]);

useEffect(() => {
  axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      setCountries(response.data)
    });
}, [])

const handleSearchChange = (event) => {
  const value = event.target.value.toLowerCase()
  setSearchVal(value)

  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(value)
  )

  setresultsList(filtered)
}


  return (
    <>
    <div>
      <p>find countries</p>
      <input value = {searchVal} onChange = {handleSearchChange}/>
    </div>
    <SearchResults list = {resultsList} />
    <div>
      
    </div>
    </>
  )
}
export default App;