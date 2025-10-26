import React, { useState, useRef } from "react";

// A custom hook to detect clicks outside an element (for closing the dropdown)
function useOnClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function TagAutocompleteInput({
  // These props will be provided by the <Controller> component
  value = [], // The array of selected tags
  onChange, // Function to update the array
  // Custom props
  predefinedTags = [],
  label,
  placeholder,
  error,
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setSuggestions([])); // Close dropdown on outside click

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputValue(text);
    if (text) {
      const filtered = predefinedTags.filter(
        (tag) =>
          tag.toLowerCase().includes(text.toLowerCase()) && !value.includes(tag)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addTag = (tagToAdd) => {
    const newTag = tagToAdd.trim().toLowerCase();
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]); // Update the form state
    }
    setInputValue("");
    setSuggestions([]);
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-sm font-bold text-gray-700 mb-1 block">
        {label}
      </label>
      <div
        className={`w-full flex flex-wrap items-center gap-2 p-2 bg-slate-100 border-2 rounded-lg ${
          error ? "border-red-500" : "border-gray-800"
        }`}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-purple-200 text-purple-900 text-xs font-bold px-2 py-1 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-purple-600 hover:text-purple-900"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent focus:outline-none min-w-[100px]"
        />
      </div>
      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => addTag(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-red-600 text-xs font-semibold mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
