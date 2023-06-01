// if location === USA UNITED STATED OF AMERICA return USA
// add fade in effect
// maybe add animated image weather

import axios from "axios"
import { useRef, useState } from 'react'
import Sunny from './assets/WeatherTypesImages/Clear.png'
import Rain from './assets/WeatherTypesImages/Rain.png'
import Overcast from './assets/WeatherTypesImages/Overcast.png'
import PartlyCloudy from './assets/WeatherTypesImages/PartlyCloudy.png'
import PatchyRain from './assets/WeatherTypesImages/PatchyRain.png'
import Snow from './assets/WeatherTypesImages/Snow.png'
import Storm from './assets/WeatherTypesImages/Storm.png'
import Temperature from './assets/Temperature.png'
import Humidity from './assets/Humidity.png'


const App = () => {

  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null)
  const [showWeather, setShowWeather] = useState(null)

  const WeatherTypes = [
    {
      type: "Sunny", // or Sunny
      img: Sunny,
    },
    {
      type: "Clear", // or Sunny
      img: Sunny,
    },
    {
      type: "Rain",
      img: Rain,
    },
    {
      type: "Moderate or heavy rain with thunder",
      img: Storm,
    },
    {
      type: "Snow",
      img: Snow,
    },
    {
      type: "Overcast", // or Cloudy
      img: Overcast,
    },
    {
      type: "Partly cloudy", 
      img: PartlyCloudy,
    },
    {
      type: "Light rain",
      img: PatchyRain,
    },
  ];

  const handleKeyEnter = (event) => {
    if(event.key === 'Enter') {
      fetchWeather()
    }
  }

  const fetchWeather = async () => {
    const Api_Key = `7ee703210eeb449eaaf153104233105`
    const url = `https://api.weatherapi.com/v1/current.json?key=${Api_Key}&q=${inputRef.current.value}&aqi=no`

    axios
    .get(url).then((res) => {
      console.log(res.data)
      setApiData(null)
      setShowWeather(WeatherTypes.filter((weather) => weather.type === res.data.current.condition.text ))
      console.log(res.data.current.condition.text)
      setApiData(res.data)
    })
    .catch((err)=> console.log(err + ' No such country exists'))
    console.log(inputRef.current.value)
  } 

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="mt-4">
        <h2 className="text-white font-mono">
          Data retrieved from WeatherAPI.com
        </h2>
      </div>
      <div className="bg-white w-96 p-4 mb-12 rounded-md">
        <div className="flex items-center justify-between">
          <input
            className=" placeholder-gray-600 text-xl border-b focus:outline-none focus:bg-gray-200 drop-shadow-xl p-1  border-gray-400 font-semibold uppercase flex-1"
            type="text" 
            ref={inputRef}
            placeholder="Enter Any Location..." 
            onKeyDown={handleKeyEnter}
          />
          <button onClick = {fetchWeather}>
            <img 
              className="w-8 drop-shadow-xl"
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png" alt="..." />
          </button>
        </div>
        <div>
          {
            showWeather && (
            <div className="text-center flex flex-col gap-5 mt-10">
              {apiData && (<p className="text-xl font-semibold">{`${apiData?.location.name}, ${apiData?.location.country}`}</p>)}
              <img 
                src={showWeather[0]?.img} alt="..." 
                className="w-52 mx-auto" 
              />
              {console.log(showWeather[0])}
              <h3 className="text-2xl font-bold text-zinc-800">
                {showWeather[0]?.type}
              </h3>
              {apiData && (
                <>
                <div className="flex jusify-center gap-2">
                  <img src={Temperature} alt="..." className="h-9 mt-1" />
                  <h2 className="text-4xl font-extrabold">{apiData?.current.temp_c}&#176;C</h2>             
                </div>

                <div className="flex items-start gap-2">
                  <img src={Humidity} alt="..." className="h-9 mt-1" />
                  <h2 className="text-4xl font-extrabold">{apiData?.current.humidity}%</h2>
                </div>
                </>
              )}
              
          </div>
            )
          }
        </div>
      </div>
      <div className="">
        <h2 className="text-white font-mono">
          by Adlene Feliachi
        </h2>
      </div>
    </div>
  )
}

export default App