import React from "react";
import ForecastItem from "./forecastItem";
import { Forecast } from "../common/types";

interface ForecastProps {
    data: Forecast;
    useImperial: boolean;
    daytime: boolean;
}


const WeeklyForecast: React.FC<ForecastProps> = (props) => {
    const daytime = props.daytime
    const forecastItems = props.data.forecastday.map(forecast => (
        <ForecastItem forecast={forecast} useImperial={props.useImperial} />
    ));

    return (
        <div className={`pb-10 rounded-md ${daytime ? 'bg-yellow-600' : 'bg-cyan-600'} opacity-90`}>
            <ul className="flex justify-around">
                {forecastItems}
            </ul>
        </div>
    );
}

export default WeeklyForecast;
