import React, { useState, useEffect } from "react";
import axios from "axios";

import Weather from "./Weather";

const CountryFullDetails = ({ country }) => {
  const { name, capital, population, languages, flag } = country;
  const [weather, setWeather] = useState({});

  const weatherQuery = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`;

  useEffect(() => {
    axios.get(weatherQuery).then(response => {
      if (response.status === 200) {
        setWeather(response.data);
      }
    });
  }, []);

  const languagesList = languages.map(({ name }) => (
    <div key={name}>{name}</div>
  ));

  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <h2>Spoken languages</h2>
      {languagesList}
      <img src={flag}></img>
      {weather && weather.current ? (
        <Weather
          city={capital}
          temperature={weather.current.temperature}
          weatherIcon={weather.current.weather_icons[0]}
          windSpeed={weather.current.wind_speed}
          windDir={weather.current.wind_dir}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CountryFullDetails;
