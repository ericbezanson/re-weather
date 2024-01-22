import React from "react";
import { days } from "../constants";

function ForcastItem(props) {
    const { forcast,  useImperial } = props
    const forcastDay = new Date(forcast.date).getDay()
    return (
        <div className="p-4 flex-col justify-evenly">
            <div className="flex align-middle justify-center">
                <img className="size-20" src={forcast.day.condition.icon} alt={props.forcast.day.condition.text} />
            </div>
            <p className="text-center text-2xl">{useImperial ? `${forcast.day.avgtemp_f} °F` : `${forcast.day.avgtemp_c} °C`}</p>
            <p className="text-center text.2xl">{days[forcastDay]}</p>
        </div>
    );
}

export default ForcastItem;