import React from "react";

const FloatingLabelInput = ({ label, className = "", ...props }) => {
  return (
    <div className="relative w-full">
      <input
        {...props}
        required
        placeholder=" " // Required for peer-placeholder-shown to work
        className={`peer w-full border border-gray-300 rounded-md p-3 focus:outline-none ${className}`}
      />
      <label
        htmlFor={props.id || props.name}
        className="absolute left-3 bg-white px-1 text-gray-500 text-sm transition-all
                   top-1/2 -translate-y-1/3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                   peer-focus:-top-1/15 peer-focus:text-xs 
                   peer-not-placeholder-shown:-top-1/15 peer-not-placeholder-shown:text-xs  pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
