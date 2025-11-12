import { Icon } from "lucide-react";
import React from "react";

function FieldInput({
  name,
  label = "Input Field",
  type = "text",
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
}) {
  const isInvalid = !!error;
  return (
    <div className="form-control w-full pt-3">
      <label htmlFor={name} className="  flex items-center gap-2">
        {" "}
        <Icon className="w-4 h-4 text-indigo-500" />
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name} //import for event handling
        onBlur={onBlur} // Standard blur handler
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full max-w-xs ${
          isInvalid
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
        aria-invalid={isInvalid}
        placeholder={placeholder}
      />
      {isInvalid && <em className="text-xs text-red-500 block">{error}</em>}
    </div>
  );
}

export default FieldInput;
