import axios from "axios"
import { SUN_BASE_URL } from "./config"

export function getDateInfo(epoch) {

}

export const getSunrise = (lat, lon) => {
const sunUrl = `${SUN_BASE_URL}?lat=${lat}&lng=${lon}`
let sunInfo = {}
axios.get(sunUrl).then((resp) => {
    console.log("LAT/LNG", resp)
    sunInfo.sunrise = resp.data.results.sunrise
    sunInfo.sunset = resp.data.results.sunset
})
return sunInfo
}