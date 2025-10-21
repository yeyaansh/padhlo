import { useState, useEffect, useMemo } from "react";


// ## NEW ##: Reusable component for horizontal filter options
const HorizontalFilterGroup = ({ label, options, selectedValue, onSelect }) => (
  <div className="mb-4 sm:mb-0 w-full"> {/* Stack vertically on mobile */}
    <label className="text-sm font-bold text-gray-600 mb-2 block">{label}:</label>
    <div className="flex flex-wrap gap-2"> {/* Allow wrapping */}
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-colors ${
            selectedValue === option.value
              ? 'bg-yellow-200 text-yellow-900 border-yellow-500' // Selected style
              : 'bg-slate-100 text-gray-700 border-gray-400 hover:bg-slate-200 hover:border-gray-600' // Default style
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);



const SelectInput = ({ id, label, value, onChange, options }) => (
  // ## UPDATED ##: Added responsive width classes
  <div className="flex flex-col items-start w-full sm:w-auto mb-4 sm:mb-0"> {/* Stack vertically by default, add bottom margin */}
    <label htmlFor={id} className="text-sm font-bold text-gray-600 mb-1">
      {label}:
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="p-2 w-full bg-slate-100 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default function FilterZone({ playlist, onFilterChange }) {
  // State for each filter
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");
  const [status, setStatus] = useState("all"); // 'all', 'solved', 'attempted'
  const [sortBy, setSortBy] = useState("dateAdded"); // 'dateAdded', 'difficulty', 'latestAttempt'

  // ## NEW ##: Dynamically get unique topics from the playlist problems
  const uniqueTopics = useMemo(() => {
    const topics = new Set(["all"]); // Start with 'all'
    playlist?.problemStore?.forEach((problem) => {
      problem?.tags?.forEach((tag) => topics.add(tag));
    });
    return Array.from(topics).map((tag) => ({
      value: tag,
      label: tag === "all" ? "All Topics" : tag,
    }));
  }, [playlist]);

  // ## NEW ##: Call the parent's filter function when any filter state changes
  useEffect(() => {
    onFilterChange({ difficulty, topic, status, sortBy });
  }, [difficulty, topic, status, sortBy, onFilterChange]);

  // Define options for dropdowns
  const difficultyOptions = [
    { value: "all", label: "All" }, // Shorter labels for horizontal layout
    { value: "easy", label: "Easy 🌱" },
    { value: "medium", label: "Medium ⚡" },
    { value: "hard", label: "Hard 🔥" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "solved", label: "Solved ✅" },
    { value: "attempted", label: "Attempted ✏️" },
  ];

  const sortOptions = [
    { value: "dateAdded", label: "Date Added" },
    { value: "difficultyAsc", label: "Difficulty ▲" }, // Use arrows for sorting
    { value: "difficultyDesc", label: "Difficulty ▼" },
    { value: "latestAttempt", label: "Last Attempt" },
  ];

  return (
    <div className="mt-6 bg-white p-4 rounded-xl border-3">
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:gap-4 sm:justify-between">
        <SelectInput
          id="difficulty"
          label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          options={difficultyOptions}
        />
        <SelectInput
          id="topic"
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          options={uniqueTopics}
        />
        <SelectInput
          id="status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusOptions}
        />
        <SelectInput
          id="sortBy"
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={sortOptions}
        />
      </div>
    </div>
  );
}
