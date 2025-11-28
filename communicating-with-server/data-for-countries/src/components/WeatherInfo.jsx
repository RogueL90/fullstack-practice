import axios from 'axios'
import {useEffect, useState} from 'react'

const WeatherInfo = (props) => {
    const [weatherData, setWeatherData] = useState(null)
    const country = props.country;
    let latlng;
    let weatherurl;
    useEffect(() =>{
        latlng = country.capitalInfo.latlng;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${import.meta.env.VITE_weatherKey}`;
        if(!weatherUrl) console.log('API KEY NOT RETRIEVED')
            setWeatherData(axios.get(weatherUrl).then(response => response.data));
    }, []);
    
    return(
        <div>
            <p>{weatherData}</p>
        </div>
    )
}
export default WeatherInfo;