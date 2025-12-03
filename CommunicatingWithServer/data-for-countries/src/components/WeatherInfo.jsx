import axios from 'axios'
import {useEffect, useState} from 'react'

const WeatherInfo = (props) => {
    const [weatherData, setWeatherData] = useState(null)
    const country = props.country;

    useEffect(() =>{
        const latlng = country.capitalInfo.latlng;
        if(latlng) console.log("fetched latlng, its "+latlng);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${import.meta.env.VITE_weatherKey}`;
        if(weatherUrl) console.log('fetched correctly, '+weatherUrl)
        axios.get(weatherUrl).then(response => setWeatherData(response.data));
    }, [country]);

    if(!weatherData) return <p>Loading...</p>
    
    return(
        <div>
            <p>Temperature {weatherData.main.temp} Celsius</p>
            <img src = {`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
            <p>Wind {weatherData.wind.speed}m/s</p>
        </div>
    )
}
export default WeatherInfo;