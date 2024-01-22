import axios from "axios"
import { SUN_BASE_URL } from "./config"
interface SunInfo {
  sunrise: string;
  sunset: string;
}

export const getSunrise = (lat: number, lon: number): Promise<SunInfo> => {
  const sunUrl = `${SUN_BASE_URL}?lat=${lat}&lng=${lon}`;

  return axios.get(sunUrl).then((resp) => {
    const sunInfo: SunInfo = {
      sunrise: resp.data.results.sunrise,
      sunset: resp.data.results.sunset,
    };
    return sunInfo;
  });
};