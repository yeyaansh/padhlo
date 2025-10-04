import React, { useState, useEffect } from "react"; // Import useEffect

export default function CodeEditor({ problem }) {
  const [language, setLanguage] = useState("python");
  // Corrected typo from 'intialCode' to 'initialCode'
  const [initialCode, setInitialCode] = useState("");

  // ## NEW ##: Use useEffect to set the initial code and update it on language change.
  // This hook runs when the component first mounts and whenever 'language' or 'problem' changes.
  useEffect(() => {
    // Make sure the problem data and starter code are available
    if (problem?.starterCode) {
      // Find the code snippet that matches the currently selected language
      const snippet = problem.starterCode.find(
        (c) => c.language.toLowerCase() === language
      );

      // If a snippet is found, update the state
      if (snippet) {
        setInitialCode(snippet.initialCode);
      } else {
        // Fallback if no snippet is found for the selected language
        setInitialCode(`// No starter code found for ${language}`);
      }
    }
  }, [language, problem]); // This effect depends on 'language' and 'problem'

  return (
    <div className="flex flex-col h-full">
      {/* Header: Language Selector - OnClick handlers are now simpler */}
      <div className="flex items-center p-2 gap-2 border-b-2 border-dashed">
        <LanguageButton active={language === "cpp"} onClick={() => setLanguage("cpp")}>
          C++
        </LanguageButton>
        <LanguageButton active={language === "java"} onClick={() => setLanguage("java")}>
          Java
        </LanguageButton>
        <LanguageButton active={language === "python"} onClick={() => setLanguage("python")}>
          Python
        </LanguageButton>
        <LanguageButton active={language === "javascript"} onClick={() => setLanguage("javascript")}>
          JavaScript
        </LanguageButton>
      </div>

      {/* Code Area */}
      <div className="flex-grow bg-[#282c34] text-white p-4 font-mono overflow-auto">
        {/* ## UPDATED ##: Use `value` and `onChange` to make this a controlled component */}
        <textarea
          className="w-full h-full bg-transparent resize-none focus:outline-none text-lime-300"
          value={initialCode}
          onChange={(e) => setInitialCode(e.target.value)}
          spellCheck="false"
        />
      </div>

      {/* Footer: Run/Submit Buttons */}
      <div className="flex items-center justify-end p-3 gap-3 border-t-2 border-dashed bg-slate-50">
        <button className="px-5 py-2 bg-gray-600 text-white font-bold rounded-lg sketch-button">
          Run
        </button>
        <button className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg sketch-button">
          Submit
        </button>
      </div>
    </div>
  );
}

// Reusable language button (no changes needed)
const LanguageButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1 text-xs rounded-lg font-bold transition-colors ${
      active ? "bg-slate-600 text-white" : "text-gray-500 hover:bg-slate-200"
    }`}
  >
    {children}
  </button>
);