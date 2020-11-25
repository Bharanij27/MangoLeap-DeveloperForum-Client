import React from "react";

const Input = ({ id, type, placeholder, value, setValue, name }) => {
  return (
    <div className="form-label-group">
      <input
        onChange = {(e) => setValue(e.target.name, e.target.value)}
        type= {type}
        id= {id}
        name={name}
        className="form-control"
        value = {value}
        placeholder= {placeholder}
        required
      />
      <label htmlFor="inputEmail">{placeholder}</label>
    </div>
  );
};

export default Input;
