import { MapPin, Thermometer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WeatherIcon } from './WeatherIcon'

export const WeatherInfo = () => {
  const [weather, setWeather] = useState('')
  const [temprature, setTemperature] = useState(0)
  const [city, setCity] = useState('')
  const [icon, setIcon] = useState('')

  useEffect(() => {
    const getWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async position => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          const apiKey = '054f74866e6c1b1bc641e469fec9be65'

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
          )
          const data = await res.json()

          setCity(data.name)
          setTemperature(data.main.temp)
          setWeather(data.weather[0].description)
          setIcon(data.weather[0].icon)
        })
      } catch (error) {
        console.error('Erro ao buscar o clima:', error)
      }
    }

    getWeather()

    const intervalId = setInterval(getWeather, 60000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <div className="panel__weather--info">
        <div className="panel__weather--info-item">
          <MapPin />
          <span>{city}</span>
        </div>
        <div className="panel__weather--info-item">
          <Thermometer />
          <span>{temprature} °C</span>
        </div>
        <div className="panel__weather--info-item">
          <WeatherIcon iconCode={icon} alt={weather} />
          <span>{weather}</span>
        </div>
      </div>
    </>
  )
}
