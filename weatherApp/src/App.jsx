import { useEffect, useState } from 'react'
import './App.css'
import Highlights from './components/Highlights'
import Temperature from './components/Temperature'


function App() {
  const [city, setCity] = useState("Lahore");
  const [weatherData, setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=b1cb8d427964429d9ac160843240303&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((e) => {
        console.error("Failed to fetch weather data:", e);
      });
  }, [city]);

  // Ensure weatherData is not null before trying to access its properties
  if (!weatherData) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div className='bg-[#1f213a] h-screen flex justify-center align-top'>
      <div className="mt-40 w-1/5 h-1/3">
        {weatherData && <Temperature
          setCity={setCity}
          stats={{
            temp: weatherData.current.temp_c,
            mood: weatherData.current.condition.text, // Ensure this is accessed correctly
            isDay: weatherData.current.is_day,
            location: weatherData.location.name,
            time: weatherData.location.localtime,
          }}
        />}
      </div>
      <div className="mt-20 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6">
        <h2 className='text-slate-200 text-2xl col-span-2'>Today Highlights</h2>
        {
          weatherData && 
          (
             <>
          <Highlights 
          stats={{
            title:"Winds Status",
            value: weatherData.current.wind_mph, 
            unit: "mph",
            direction: weatherData.current.wind_dir
          }}
          />
          <Highlights 
          stats={{
            title:"Humidity",
            value: weatherData.current.humidity, 
            unit: "%",
          }}
          />
          <Highlights 
          stats={{
            title:"Visibility",
            value: weatherData.current.vis_miles, 
            unit: "miles",
          }}
          />
          <Highlights 
          stats={{
            title:"Air Pressure",
            value: weatherData.current.pressure_mb, 
            unit: "mb",
          }}/>
          
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;
