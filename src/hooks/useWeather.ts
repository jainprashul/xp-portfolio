import { sun } from "@/assets/asset";
import { WeatherResponse } from "@/utils/Weather";
import { API_CURRENT_WEATHER_BY_CITY, API_CURRENT_WEATHER_BY_COORDS, API_ICON } from "@/utils/weatherAPI";
import { useEffect, useState } from "react";

function useWeather(){
    const [weather, setWeather] = useState<WeatherResponse>();

    const icon = weather?.weather[0].icon ? API_ICON(weather?.weather[0].icon) : sun;

    // get your location
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        fetch(API_CURRENT_WEATHER_BY_COORDS(latitude, longitude)).then(res => res.json()).then(data => {
          console.log('weather', data)
          setWeather(data)
        })
      }), () => {
        console.log('error getting location , using default location')
        fetch(API_CURRENT_WEATHER_BY_CITY('Chhindwara')).then(res => res.json()).then(data => {
          console.log('weather', data)
          setWeather(data)
        })
      }
    }, [])

    return { 
        temp : weather?.main.temp,
        minTemp : weather?.main.temp_min,
        maxTemp : weather?.main.temp_max,
        feelsLike : weather?.main.feels_like,
        humidity : weather?.main.humidity,
        windSpeed : weather?.wind.speed,
        
        city : weather?.name,
        icon : icon,
    } 
}

export default useWeather
