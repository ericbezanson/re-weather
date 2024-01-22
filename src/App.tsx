import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import Current from './components/current';
import Forcast from './components/forcast';
import DropdownMenu from './components/dropdownMenu';
import exampleForcast from './samples/exampleForcast.json';
import exampleForcastWeek from './samples/exampleForcastWeek.json'
import { getSunrise } from './helpers';
import { API_KEY, BASE_URL, FORECAST } from './config';
import { WeatherData, CombinedData, Forecast } from './common/types';


const App: React.FC = () => {
  const [data, setData] = useState<WeatherData>(exampleForcast);
  const [forcast, setForcast] = useState<Forecast>(exampleForcastWeek.forecast)
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [useImperial, setUseImperial] = useState<boolean>(false);

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
      const sunriseData = await getSunrise(lat, lon); // Replace with actual parameters
  
      // Combine data from both APIs
      const combinedData: CombinedData = {
        current: forecastResponse.data.current,
        location: forecastResponse.data.location,
        forecast: forecastResponse.data.forecast,
        sunriseInfo: sunriseData,
      };
  
      // Set combined data to state
      setData(combinedData);
      setForcast(forecastResponse.data.forecast)
    } 
    catch (error) {
      console.error('Error in requests:', error);
    }
  };
  
  

  return (
    <div className="App m-10 bg-cyan-600 text-slate-50">
      <div className="p-4">
        <h1 className="text-3xl font-bold underline text-cyan-950">Re-Weather</h1>
      </div>
      <div className="absolute top-10 right-10 p-4">
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
        <Forcast data={forcast} useImperial={useImperial} />
      </div>
    </div>
  );
};

export default App;
