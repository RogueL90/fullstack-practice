import {useState, useEffect} from 'react'
import axios from 'axios'
import WeatherInfo from './WeatherInfo'
const SearchResults = (props) => {
    const [selected, setSelected]  = useState(null);
    useEffect(() =>{
        setSelected(null)
    }
        ,[props])
 const getWeatherData = (props) => {
            const url = props.weatherurl;
            return axios.get(url).then(response => <p>response.data</p>)

        }
const showCountry = (country) => {

    return(
        <div>
            <h1>
                {country.name.common}
            </h1>
            <div>
                <p>{country.capital}</p>
                <p>Area {country.area}</p>
            </div>
            <h2>
                Languages
            </h2>
            <ul>
                {Object.values(country.languages).map(lang => <li key = {Math.random()}>{lang}</li>)}
            </ul>
            <img src = {country.flags.png} />
            <div>
                <h2>
                    Weather in {country.capital} 
                </h2>
                <WeatherInfo country = {country} />
            </div>
        </div>
    )
}

    const list = props.list;
    if(selected) return showCountry(selected);
    if(list.length==0) return <p>No results</p>
    if(list.length >10) return <p>Too many matches, specify another filter</p>
    if(list.length===1) return showCountry(list[0])
    return (
        <>
            {list.map(listVal => {
                return(
                <div key = {listVal.name.official}>
                     <p >{listVal.name.common}</p> <button onClick = {() => setSelected(listVal)}>Show</button>
                </div>
                )
            })}
        </>
    )
}
export default SearchResults;