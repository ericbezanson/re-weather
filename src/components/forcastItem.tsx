import React from "react";
import { days } from "../constants";

interface ForcastItemProps {
    forcast: {
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

const ForcastItem: React.FC<ForcastItemProps> = ({ forcast, useImperial }) => {
    const forcastDay = new Date(forcast.date).getDay();
    return (
        <div className="p-4 flex-col justify-evenly">
            <div className="flex align-middle justify-center">
                <img className="size-20" src={forcast.day.condition.icon} alt={forcast.day.condition.text} />
            </div>
            <p className="text-center text-2xl">{useImperial ? `${forcast.day.avgtemp_f} °F` : `${forcast.day.avgtemp_c} °C`}</p>
            <p className="text-center text.2xl">{days[forcastDay]}</p>
        </div>
    );
}

export default ForcastItem;
