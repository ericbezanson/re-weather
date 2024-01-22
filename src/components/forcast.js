import React from "react";
import ForcastItem from "./forcastItem";

function Forcast(props) {
    const forcastItems = props.data.forecast.forecastday.map(forcast => <ForcastItem forcast={forcast} useImperial={props.useImperial} />);

    return (
        <ul className="flex justify-around bg-cyan-500 rounded-md" >
            {forcastItems}
        </ul>
    );
}

export default Forcast;