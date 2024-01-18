import React from "react";
import { days } from "../constants";

function ForcastItem(props) {
    console.log("FORCAST ITEM PROPS", props)
    const { forcast } = props
    const forcastDay = new Date(forcast.date).getDay()
    console.log(forcastDay)
    return (
        <div className="p-4 flex-col justify-evenly">
            <div className="flex align-middle justify-center">
                <img className="size-20" src={forcast.day.condition.icon} alt={props.forcast.day.condition.text} />
            </div>
            <p className="text-center text-2xl">{forcast.day.avgtemp_c}°</p>
            <p className="text-center text.2xl">{days[forcastDay]}</p>
        </div>
    );
}

export default ForcastItem;