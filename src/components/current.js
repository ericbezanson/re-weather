import React from "react";
import { days, months } from "../constants";
import locationIcon from "../assets/icons/location.png"
import thermometerIcon from "../assets/icons/thermometer.png"
import { getSunrise } from "../helpers";

function Current(props) {
console.log("PROPS", props)
const {current, location, sunTime} = props.data
const currentDay = new Date(location.localtime_epoch).getDay()
const currentMonth = new Date(location.localtime_epoch).getMonth()
const currentDate = new Date(location.localtime_epoch).getDate()
const sunInfo = getSunrise(location.lat, location.lon)
console.log("SUN INFO", sunInfo)

return (
    <div class="flex justify-between mb-10">
        <div class="flex-col w-80">
            {/* LEFT */}
            <div className="flex">
                <div className="w-24 flex align-middle justify-center">
                    <img className="size-16" src={locationIcon} alt={locationIcon + " Icon"}/>
                </div>
                <div className="flex-col">
                    <p className="font-bold text-6xl mb-12">{location.name}</p>
                    <p className="font-light text-3xl">{months[currentMonth]} {currentDate}</p>
                    <p className="font-light text-3xl mb-14">{days[currentDay]}</p>
                </div>
            </div>
            <div className="flex">
                <div className="w-24">
                    <img className="size-18" src={thermometerIcon} alt={locationIcon + " Icon"}/>
                </div>
                <div className="flex-col">
                    <p className="font-bold text-7xl mb-4">{current.temp_c}°</p>
                    <p className="font-thin text-2xl">Feels Like: {current.feelslike_c}°</p>
                </div>
            </div>
        </div>
        {/* MIDDLE */}
        <div class="flex-col justify-between">
            <div>
                <img src={current.condition.icon} alt={current.condition.text + ` Icon`} className="size-80"></img>
            </div>
            <p className="text-center font-thin text-2xl">{current.condition.text}</p>
        </div>
        {/* RIGHT */}
        <div class="flex-col">
            {sunInfo.sunrise && sunInfo.sunset &&
                <>
                    <p className="font-thin text-2xl p-3">Sunrise: {sunInfo.sunrise}</p>
                    <p className="font-thin text-2xl p-3">Sunset: {sunInfo.sunset}</p>
                </>
            }
            <p className="font-thin text-2xl p-3">Precipitation: {current.precip_mm}</p>
            <p className="font-thin text-2xl p-3">Wind Speed: {current.wind_kph} km</p>
            <p className="font-thin text-2xl p-3">Wind Direction: {current.wind_dir}</p>
            <p className="font-thin text-2xl p-3">Precipitation: {current.pressure_mb}</p>
        </div>
    </div>
    );
}

export default Current;