import { useState } from 'react'
import axios from 'axios'

const Weather = ({lat, lon, city}) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const [currentTemp, setCurrentTemp] = useState(0)
    const [currentWind, setCurrentWind] = useState(0)
    const [currentIcon, setCurrentIcon] = useState('')
    console.log(lat, lon)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log(response.data)
        setCurrentTemp(response.data.main['temp'])
        setCurrentWind(response.data.wind.speed)
        setCurrentIcon(response.data.weather[0].icon)
      })
    
    return(
      <div>
        <h2>Weather in {city}</h2>
        <p>Temperature {currentTemp} celsius</p>
        <img src={`https://openweathermap.org/img/wn/${currentIcon}@2x.png`} />
        <p>Wind {currentWind} m/s</p>
      </div>
    )
  }

export default Weather