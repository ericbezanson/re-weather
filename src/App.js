import React, {useState} from 'react'
import { API_KEY, BASE_URL, FORECAST, SUN_BASE_URL } from './config'
import axios from 'axios'
import Current from './components/current'
import Forcast from './components/forcast'
import exampleForcast from './samples/exampleForcast.json'

function App() {

  // http://api.weatherapi.com/v1/current.xml?key=925bcf2c47ee4923a5a203853241101&q=halifax


  const [data, setData] = useState(exampleForcast)
  const [searchQuery, setsearchQuery] = useState();
  
  const [lat, setlat] = useState("");
  const [lon, setlon] = useState("");
  const [sunTime, setsunTime] = useState();
  const [forcast, setforcast] = useState();
  
  
  // forcast example  http://api.weatherapi.com/v1/forecast.json?key=925bcf2c47ee4923a5a203853241101&q=halifax&days=7&aqi=no&alerts=no
  const requestUrl = `${BASE_URL}${FORECAST}${API_KEY}&q=${searchQuery}&days=7&aqi=no&alerts=no`


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(requestUrl).then((resp) => {
        setData(resp.data)
        console.log("RESP", resp.data)
      })
    }
  }

  return (
    <div className="App m-10 bg-cyan-600 text-slate-50">
      <div className='p-4'>
        <h1 className="text-3xl font-bold underline text-cyan-950">
          Re-Weather
        </h1>
        <div className='search text-slate-900'>
          <input
            value={searchQuery}
            onChange={event => setsearchQuery(event.target.value)}
            placeholder='Enter Location'
            onKeyUp={searchLocation}
            type='text'
          />
        </div>
      </div>
      <div className="flex-col px-10 pt-10">
        <Current data={data} />
        <Forcast data={data}/>
      </div>
    </div>
  );
}

export default App;
