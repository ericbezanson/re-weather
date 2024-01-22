import React from "react";
import ForcastItem from "./forcastItem";
import { Forecast } from "../common/types";

interface ForcastProps {
    data: Forecast;
    useImperial: boolean;
}


const Forcast: React.FC<ForcastProps> = (props) => {
    const forcastItems = props.data.forecastday.map(forcast => (
        <ForcastItem forcast={forcast} useImperial={props.useImperial} />
    ));

    return (
        <ul className="flex justify-around bg-cyan-500 rounded-md">
            {forcastItems}
        </ul>
    );
}

export default Forcast;
