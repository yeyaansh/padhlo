export const InputField = ({
  id,
  label,
  register,
  error,
  required,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-gray-700 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      {...register(id)} // Connects to react-hook-form
      {...props} // Passes any other props like type, placeholder, etc.
      className={`w-full px-4 py-2 bg-slate-100 border-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 transition ${
        error
          ? "border-red-500 focus:ring-red-300"
          : "border-gray-800 focus:ring-yellow-300" // Conditional styling for errors
      }`}
    />
    {/* Displays the error message if there is one */}
    {error && (
      <p className="text-red-600 text-xs font-semibold mt-1">{error.message}</p>
    )}
  </div>
);

// ---

export const TextAreaField = ({
  id,
  label,
  register,
  error,
  required,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-gray-700 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      {...register(id)}
      {...props}
      className={`w-full px-4 py-2 h-24 bg-slate-100 border-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 transition resize-vertical ${
        // Added resize-vertical
        error
          ? "border-red-500 focus:ring-red-300"
          : "border-gray-800 focus:ring-yellow-300"
      }`}
    />
    {error && (
      <p className="text-red-600 text-xs font-semibold mt-1">{error.message}</p>
    )}
  </div>
);

// ---

export const SelectField = ({
  id,
  label,
  register,
  error,
  required,
  children,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-gray-700 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      {...register(id)}
      {...props}
      className={`w-full px-4 py-2 bg-slate-100 border-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 transition ${
        error
          ? "border-red-500 focus:ring-red-300"
          : "border-gray-800 focus:ring-yellow-300"
      }`}
    >
      {children} {/* Renders the <option> elements passed to it */}
    </select>
    {error && (
      <p className="text-red-600 text-xs font-semibold mt-1">{error.message}</p>
    )}
  </div>
);

// ---

// Handles comma-separated input and converts it to an array for react-hook-form
// Handles comma-separated input and converts it to an array for react-hook-form
export const TagInputField = ({
  id,
  label,
  register,
  error,
  required,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-gray-700 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}{" "}
      <span className="text-xs font-normal text-gray-500">
        (comma-separated)
      </span>
    </label>
    <input
      id={id}
      {...register(id, {
        // ## UPDATED ##: Added check to ensure value is a string
        setValueAs: (value) => {
          if (typeof value === "string") {
            return value
              .split(",") // Split string by comma
              .map((tag) => tag.trim().toLowerCase()) // Trim whitespace, convert to lowercase
              .filter(Boolean); // Remove empty strings
          }
          return []; // Return empty array if value is not a string
        },
      })}
      {...props}
      className={`w-full px-4 py-2 bg-slate-100 border-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 transition ${
        error
          ? "border-red-500 focus:ring-red-300"
          : "border-gray-800 focus:ring-yellow-300"
      }`}
    />
    {error && (
      <p className="text-red-600 text-xs font-semibold mt-1">
        {Array.isArray(error)
          ? error.map((e) => e.message).join(", ")
          : error.message}
      </p>
    )}
  </div>
);
