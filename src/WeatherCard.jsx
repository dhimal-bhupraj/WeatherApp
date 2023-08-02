import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = () => {
  // console.log(import.meta.env.VITE_APP_API_KEY)
    const [search, setSearch] = useState('')
    const [weatherData,setWeatherData] = useState({
        temperature:"",
        maxTemp:"",
        minTemp:"",
        humidity:"",
        cloud:"",
    })
    
    const handleClick =(e) =>{
       fetchWeather();
    }
    const handleKeyPress = (e) => {
      if (e.key === 'Enter'){
      fetchWeather();
      }
    }
    const fetchWeather = async ()=>{
      const apiKey = import.meta.env.VITE_APP_API_KEY;
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${search}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
          }
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
          setWeatherData({
            temperature:data.temp,
            maxTemp:data.max_temp,
            minTemp:data.min_temp,
            humidity:data.humidity,
            cloud : data.cloud_pct
          })
        } catch (error) {
            console.error(error);
        } 

    }
    
    
    return (
    <div className='card-container'>
    <div className="card" style={{width:300,height:350}}>
  {/* <img src="..." className="card-img-top" alt="..."/> */}
  <div className="card-body">
    <h5 className="card-title my-2">Weather App</h5>
    <p className="card-text my-1">Enter the name of you city </p>
    <input type="text" placeholder='City Name'className='input' value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyPress} />
    <a href="#" className="btn btn-primary mt-2" onClick={handleClick}>Search</a>
    <p className='temp mt-2 mb-0'>Temperature:{weatherData.temperature}°C</p>
    <p className='temp mt-0 mb-0'>Maximun Temperature:{weatherData.maxTemp}°C</p>
    <p className='temp mt-0 mb-0'>Minimum Temperature:{weatherData.minTemp}°C</p>
    <p className='humid mt-0 '>Humidity:{weatherData.humidity}</p>
        {weatherData.cloud !== '' && (
      <>
{weatherData.cloud === 'Cloudy' && (
            <FontAwesomeIcon icon={faCloud} />
          )}
    {weatherData.cloud >= 50 && (
            <FontAwesomeIcon icon={faCloud} style={{color:'white' , fontSize:45}} />
          )}
          {weatherData.cloud <= 40 && (
            <FontAwesomeIcon icon={faSun} style={{color:'gold' , fontSize:45}}/>
          )}
          </>
        )}
  </div>
</div>
    </div>
  )
}

export default WeatherCard