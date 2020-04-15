import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = props => {
  const handleChange = ({ target }) => {
    props.setFilter(target.value);
  };

  return (
    <div>
      <label>filter: </label>
      <input onChange={handleChange}></input>
    </div>
  );
};

const mapDispatchToProps = {
  setFilter
};

const connectedComponent = connect(undefined, mapDispatchToProps)(Filter);
export default connectedComponent;
