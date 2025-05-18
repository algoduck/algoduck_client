// src/components/FormGroup.jsx
import React from "react";

const FormGroup = ({ label, type, name, value, onChange, required = false, disabled = false }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default FormGroup;
