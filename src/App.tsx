import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import axios from 'axios';
import Current from './components/current';
import WeeklyForecast from './components/weeklyForecast';
import DropdownMenu from './components/dropdownMenu';
import exampleForecast from './samples/exampleForecast.json';
import exampleForecastWeek from './samples/exampleForecastWeek.json'
import { getSunrise } from './helpers';
import { API_KEY, BASE_URL, FORECAST } from './config';
import { WeatherData, CombinedData, Forecast } from './common/types';
import sunlight from "./assets/backgroundImg/sunlight.jpg"
import moonlight from "./assets/backgroundImg/moonlight.jpg"
import moment from 'moment-timezone';


const App: React.FC = () => {
  const [data, setData] = useState<WeatherData>(exampleForecast);
  const [forecast, setForecast] = useState<Forecast>(exampleForecastWeek.forecast)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [daytime, setDaytime] = useState<boolean>(false)
  const [useImperial, setUseImperial] = useState<boolean>(false);

  useEffect(() => {
    console.log('Data updated:', data);
    
    // Convert the epoch to a moment object in UTC
    const currentTime = moment.utc(data.location.localtime_epoch * 1000);
  
    // Now convert it to Tehran's time
    const tehranTime = currentTime.tz('Asia/Tehran');
    console.log('Tehran time:', tehranTime.format());
  
    const hour = tehranTime.hours();
    console.log('Current hour in Tehran:', hour);
    const isItDaytime = hour >= 6 && hour < 20;
    console.log('Is it daytime in Tehran?', isItDaytime);
    setDaytime(isItDaytime);
  }, [data.location.localtime_epoch]);
  
  
  const searchLocation = async (input: string | ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
    const value = typeof input === 'string' ? input : (input.target as HTMLInputElement).value;
  
    if (typeof input === 'object' && 'key' in input && input.key !== 'Enter') {
      return;
    }
  
    try {
      const forecastResponse = await axios.get(`${BASE_URL}${FORECAST}${API_KEY}&q=${value}&days=7&aqi=no&alerts=no`);
  
      // Use some data from forecastResponse to get sunrise information
      const { lat, lon } = forecastResponse.data.location; // Replace with actual path to the data
  
      // use lat and lon to use sunrisesunset api to get sun info
      const sunriseData = await getSunrise(lat, lon);
  
      // Combine data from both APIs
      const combinedData: CombinedData = {
        current: forecastResponse.data.current,
        location: forecastResponse.data.location,
        forecast: forecastResponse.data.forecast,
        sunriseInfo: sunriseData,
      };
  
      // Set combined data to state
      setData(combinedData);
      setForecast(forecastResponse.data.forecast)
    } 
    catch (error) {
      console.error('Error in requests:', error);
    }
  };
  console.log("is daytime?", daytime)
  return (
    <div className={`App relative ${daytime ? 'bg-yellow-600' : 'bg-cyan-600'} m-10 w-1280 h-720 rounded-md overflow-hidden`}>
      {/* Background image with opacity */}
      <div style={{ backgroundImage: `url(${daytime ? sunlight : moonlight})` }}  className="absolute inset-0 bg-cover bg-center opacity-50"></div>
      
      {/* Content container */}
      <div className="relative p-4 text-slate-50">
        <h1 className="text-3xl font-bold underline text-cyan-950">Re-Weather</h1>
        
        {/* Other components */}
        <div className="absolute top-10 right-48">
          <DropdownMenu
            inputValue={searchQuery}
            setInputValue={setSearchQuery}
            onSubmit={searchLocation}
            useImperial={useImperial}
            setUseImperial={setUseImperial}
          />
        </div>
        <div className="flex-col px-10 pt-10">
          <Current data={data} useImperial={useImperial} />
          <WeeklyForecast data={forecast} useImperial={useImperial} daytime={daytime}/>
        </div>
      </div>
    </div>
  );

};

export default App;
