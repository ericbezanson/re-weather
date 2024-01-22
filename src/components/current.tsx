import { days, months } from "../constants";
import locationIcon from "../assets/icons/location.png";
import thermometerIcon from "../assets/icons/thermometer.png";

interface CurrentProps {
    data: {
        current: {
            temp_c: number;
            temp_f: number;
            feelslike_c: number;
            feelslike_f: number;
            condition: {
                icon: string;
                text: string;
            };
            precip_mm: number;
            precip_in: number;
            wind_kph: number;
            wind_mph: number;
            wind_dir: string;
            pressure_mb: number;
            pressure_in: number;
        };
        location: {
            name: string;
            localtime_epoch: number;
        };
        sunriseInfo?: {
            sunrise: string;
            sunset: string;
        };
    };
    useImperial: boolean;
}

function Current(props: CurrentProps) {
    const { current, location, sunriseInfo } = props.data;
    const useImperial = props.useImperial;
    const currentDay = new Date(location.localtime_epoch).getDay();
    const currentMonth = new Date(location.localtime_epoch).getMonth();
    const currentDate = new Date(location.localtime_epoch).getDate();

    return (
        <div className="flex justify-between mb-10">
            <div className="flex-col w-80">
                {/* LEFT */}
                <div className="flex">
                    <div className="w-24 flex align-middle justify-center">
                        <img className="size-16" src={locationIcon} alt={locationIcon + " Icon"} />
                    </div>
                    <div className="flex-col">
                        <p className="font-bold text-6xl mb-12">{location.name}</p>
                        <p className="font-light text-3xl">{months[currentMonth]} {currentDate}</p>
                        <p className="font-light text-3xl mb-14">{days[currentDay]}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-24">
                        <img className="size-18" src={thermometerIcon} alt={locationIcon + " Icon"} />
                    </div>
                    <div className="flex-col">
                        <p className="font-bold text-7xl mb-4 text-nowrap">{useImperial ? `${current.temp_f} °F` : `${current.temp_c} °C`}</p>
                        <p className="font-thin text-2xl text-nowrap">Feels Like: {useImperial ? current.feelslike_f : current.feelslike_c}°{useImperial ? "F" : "C"}</p>
                    </div>
                </div>
            </div>
            {/* MIDDLE */}
            <div className="flex-col justify-between">
                <div>
                    <img src={current.condition.icon} alt={current.condition.text + ` Icon`} className="size-80"></img>
                </div>
                <p className="text-center font-thin text-2xl">{current.condition.text}</p>
            </div>
            {/* RIGHT */}
            <div className="flex-col w-64">
                <p className="font-thin text-2xl p-3">Sunrise: {sunriseInfo ? sunriseInfo.sunrise : ""}</p>
                <p className="font-thin text-2xl p-3">Sunset: {sunriseInfo ? sunriseInfo.sunset : ""}</p>
                <p className="font-thin text-2xl p-3">Precipitation: {useImperial ? current.precip_in : current.precip_mm}</p>
                <p className="font-thin text-2xl p-3">Wind Speed: {useImperial ? `${current.wind_mph} mph` : `${current.wind_kph} km`}</p>
                <p className="font-thin text-2xl p-3">Wind Direction: {current.wind_dir}</p>
                <p className="font-thin text-2xl p-3">Pressure: {useImperial ? `${current.pressure_in} psi` : `${current.pressure_mb} mbar`}</p>
            </div>
        </div>
    );
}

export default Current;
