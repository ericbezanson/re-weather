import axios from "axios"
import { SUN_BASE_URL } from "./config"

export function getDateInfo(epoch) {

}


export const getSunrise = (lat, lon) => {
  const sunUrl = `${SUN_BASE_URL}?lat=${lat}&lng=${lon}`;

  return axios.get(sunUrl).then((resp) => {
    const sunInfo = {
      sunrise: resp.data.results.sunrise,
      sunset: resp.data.results.sunset
    };
    return sunInfo;
  });
};