import React from "react";
import ForcastItem from "./forcastItem";

function Forcast(props) {
    console.log("FORCAST PROPS", props.data)
    const { forcast } = props.data
    console.log("FORCAST", forcast)
    const forcastItems = props.data.forecast.forecastday.map(forcast => <ForcastItem forcast={forcast} />);

    return (
        <ul className="flex justify-around bg-cyan-500" >
            {forcastItems}
        </ul>
    );
}

export default Forcast;