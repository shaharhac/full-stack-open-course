import React from "react";

import CountryItem from "./CountryItem";
import CountryFullDetails from "./CountryFullDetails";

const CountryList = ({ countries, onCountryClick }) => {
  let countryList = [];

  if (countries.length === 1) {
    countryList.push(
      <CountryFullDetails key={countries[0].name} country={countries[0]} />
    );
  } else {
    countryList = countries.map(country => (
      <CountryItem
        key={country.name}
        country={country}
        onClick={onCountryClick}
      />
    ));
  }

  return <div>{countryList}</div>;
};

export default CountryList;
