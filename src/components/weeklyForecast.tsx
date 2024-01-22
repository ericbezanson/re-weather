import React from "react";
import ForecastItem from "./forecastItem";
import { Forecast } from "../common/types";

interface ForecastProps {
    data: Forecast;
    useImperial: boolean;
}


const WeeklyForecast: React.FC<ForecastProps> = (props) => {
    const forecastItems = props.data.forecastday.map(forecast => (
        <ForecastItem forecast={forecast} useImperial={props.useImperial} />
    ));

    return (
        <ul className="flex justify-around bg-cyan-500 rounded-md">
            {forecastItems}
        </ul>
    );
}

export default WeeklyForecast;
