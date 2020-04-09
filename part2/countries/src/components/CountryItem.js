import React from "react";

const CountryItem = ({ country, onClick }) => (
  <div>
    {country.name}
    <button onClick={() => onClick(country)}>show</button>
  </div>
);

export default CountryItem;
