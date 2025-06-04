import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const ArrayField = ({
  label,
  name,
  value = [],
  onChange,
  placeholder = "Add item",
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      const newValue = [...value, inputValue.trim()];
      onChange(newValue);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>

      <div className="flex">
        <input
          type="text"
          className="form-input rounded-r-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
          onClick={handleAdd}
        >
          <FiPlus size={18} />
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center text-sm"
            >
              <span>{item}</span>
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                onClick={() => handleRemove(index)}
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name={name} value={JSON.stringify(value)} />
    </div>
  );
};

export default ArrayField;
