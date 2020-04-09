import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

import CountryList from "./CountryList";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  let countriesToShow = [];
  if (!_.isEmpty(selectedCountry)) {
    countriesToShow.push(selectedCountry);
  } else {
    countriesToShow = countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const totalCountries = countriesToShow.length;

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      if (response.status === 200) {
        setCountries(response.data);
      }
    });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const onCountryClick = country => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <label>find countries </label>
      <input value={filter} onChange={handleFilterChange}></input>
      <div>
        {totalCountries <= 10 ? (
          <CountryList
            countries={countriesToShow}
            onCountryClick={onCountryClick}
          />
        ) : (
          "Too many matches, specify another filter"
        )}
      </div>
    </div>
  );
};

export default App;
