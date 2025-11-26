import {useState, useEffect} from 'react'
const SearchResults = (props) => {
    const [selected, setSelected]  = useState(null);
    useEffect(() =>{
        setSelected(null)
    }
        ,[props])
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
                    Weather in {country.name.common} (to be added)
                </h2>
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