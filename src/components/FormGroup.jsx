import React from "react";

const FormGroup = ({ label, type, name, value, onChange, required = false, disabled = false }) => {
  return (
    <div className="mb-4 text-left">
      <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
      />
    </div>
  );
};

export default FormGroup;
