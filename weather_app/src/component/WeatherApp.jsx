import React, { useEffect, useState } from 'react'

const WeatherApp = () => {
  const [data, setData] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchWeatherData = async (param)=>{
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      );
      const data = await response.json()
      setData(data)
      console.log(data,'data');
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = () =>{
    fetchWeatherData(search)
  }

  function getCurrentDate(){
    return new Date().toLocaleDateString('en-us',{
      weekday:'long',
      month:'long',
      day:'numeric',
      year:'numeric'
    })
  }
  useEffect(()=>{
    fetchWeatherData('Nepal')
  },[])


  return (
   <div className="container">
    <div className="weather-box">
      <div className="weather-inp">
        <input type="text" placeholder='Enter City Name' value={search}
         onChange={(event)=>setSearch(event.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="weather-details">
        <p className='location'>
          {data ?.name}, <span>{data?.sys?.country}</span>
        </p>
        <p className='date'><span>{getCurrentDate()}</span></p>
        <p className='weather-degree'>{data?.main?.temp}</p>
        <p className='mist'>{data && data.weather && data.weather[0]?
         data.weather[0].description:''}</p>
      </div>
      <div className="present-weather">
        <div className="weather-info">
          <p>{data?.wind?.speed}</p>
          <p>{data?.main?.humidity}%</p>
        </div>
        <div className="weather-info">
          <p className='wind'>Wind Speed</p>
          <p className='humidity'>Humidity</p>
        </div>
      </div>
    </div>
   </div>
  )
}

export default WeatherApp

