import React from "react";

const PersonForm = ({
  onSubmit,
  onNameChange,
  onNumberChange,
  name,
  number
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
