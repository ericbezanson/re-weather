import React, {useState} from 'react'
import { API_KEY, BASE_URL, FORECAST } from './config'
import axios from 'axios'
import Current from './components/current'
import Forcast from './components/forcast'
import exampleForcast from './samples/exampleForcast.json'
import DropdownMenu from './components/dropdownMenu'
import { getSunrise } from "./helpers";

function App() {
  const [data, setData] = useState(exampleForcast)
  const [searchQuery, setsearchQuery] = useState();
  const [useImperial, setUseImperial] = useState(false);

  const searchLocation = async (input) => {
    const value = typeof input === 'string' ? input : input.target.value;
  
    if (input.key === 'Enter' || typeof input === 'string') {
      try {
        const forecastResponse = await axios.get(`${BASE_URL}${FORECAST}${API_KEY}&q=${value}&days=7&aqi=no&alerts=no`);
        
        // Use some data from forecastResponse to get sunrise information
        const { lat, lon } = forecastResponse.data.location; // Replace with actual path to the data
  
        // use lat and lon to use sunrisesunset api to get sun info
        const sunriseData = await getSunrise(lat, lon); // Replace with actual parameters

        // Combine data from both API's
        const combinedData = {
          current: forecastResponse.data.current,
          location: forecastResponse.data.location,
          forecast: forecastResponse.data.forecast,
          sunriseInfo: sunriseData
        };
  
        // Set combined data to state
        setData(combinedData);
  
      } catch (error) {
        console.error("Error in requests:", error);
      }
    }
  };

  return (
    <div className="App m-10 bg-cyan-600 text-slate-50">
      <div className='p-4'>
        <h1 className="text-3xl font-bold underline text-cyan-950">
          Re-Weather
        </h1>
      </div>
      <div className="absolute top-10 right-10 p-4">
        <DropdownMenu 
          inputValue={searchQuery} 
          setInputValue={setsearchQuery} 
          onSubmit={searchLocation}            
          useImperial={useImperial}
          setUseImperial={setUseImperial} 
          />
      </div>
      <div className="flex-col px-10 pt-10">
        <Current data={data}  useImperial={useImperial}/>
        <Forcast data={data}  useImperial={useImperial}/>
      </div>
    </div>
  );
}

export default App;
