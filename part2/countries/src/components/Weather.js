import React from "react";

const Weather = ({ city, temperature, weatherIcon, windSpeed, windDir }) => (
  <div>
    <h2>Weather in {city}</h2>
    <div>temperature: {temperature} Celcuis</div>
    <img src={weatherIcon}></img>
    <div>
      wind: {windSpeed} (direction: {windDir})
    </div>
  </div>
);

export default Weather;
