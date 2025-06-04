import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  register,
  errors,
  validationRules = {},
  defaultValue = "",
  placeholder = "",
  options = [],
  rows = 4,
  multiple = false,
  onChange,
  className = "",
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <div className="mt-1">
        {type === "textarea" ? (
          <textarea
            id={name}
            {...register(name, validationRules)}
            className="form-input"
            rows={rows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        ) : type === "select" ? (
          <select
            id={name}
            {...register(name, validationRules)}
            className="form-input"
            defaultValue={defaultValue}
            onChange={onChange}
            multiple={multiple}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "checkbox" ? (
          <div className="flex items-center">
            <input
              id={name}
              type="checkbox"
              {...register(name, validationRules)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={defaultValue}
              onChange={onChange}
            />
            <span className="ml-2 text-sm text-gray-600">{placeholder}</span>
          </div>
        ) : type === "color" ? (
          <div className="flex">
            <input
              id={name}
              type="color"
              {...register(name, validationRules)}
              className="w-12 h-10 rounded-l-md border border-r-0 border-gray-300"
              defaultValue={defaultValue || "#3B82F6"}
              onChange={onChange}
            />
            <input
              type="text"
              {...register(`${name}_text`, validationRules)}
              className="form-input rounded-l-none w-32"
              defaultValue={defaultValue || "#3B82F6"}
              onChange={onChange}
            />
          </div>
        ) : type === "file" ? (
          <input
            id={name}
            type="file"
            className="form-input"
            onChange={onChange}
            accept="image/*"
          />
        ) : (
          <input
            id={name}
            type={type}
            {...register(name, validationRules)}
            className="form-input"
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        )}

        {errors && errors[name] && (
          <p className="form-error">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default FormField;
