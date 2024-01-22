import React from "react";
import { days } from "../constants";

interface ForecastItemProps {
    forecast: {
        date: string;
        day: {
            avgtemp_f: number;
            avgtemp_c: number;
            condition: {
                icon: string;
                text: string;
            };
        };
    };
    useImperial: boolean;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ forecast, useImperial }) => {
    const forecastDay = new Date(forecast.date).getDay();
    return (
        <div className="p-4 flex-col justify-evenly">
            <div className="flex align-middle justify-center">
                <img className="size-20" src={forecast.day.condition.icon} alt={forecast.day.condition.text} />
            </div>
            <p className="text-center text-2xl">{useImperial ? `${forecast.day.avgtemp_f} °F` : `${forecast.day.avgtemp_c} °C`}</p>
            <p className="text-center text.2xl">{days[forecastDay]}</p>
        </div>
    );
}

export default ForecastItem;
