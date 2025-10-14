import React, { useState, useEffect, useRef } from "react"; // Import useEffect
import axiosClient from "../../axiosClient";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ problem }) {
  const [language, setLanguage] = useState("cpp");
  const [initialCode, setInitialCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const editorRef = useRef(null);
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    // alert(editorRef.current.getValue());
  }

  async function runCodeFunction() {
    try {
      setSubmitting(true);
      const response = await axiosClient.post(`/pid/run/${problem._id}`, {
        code: editorRef.current.getValue(),
        language,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      // setTimeout(() => {
      //   setSubmitting(false);
      // }, 5000);

      setSubmitting(false);
    }
  }

  async function submitCodeFunction() {
    try {
      setSubmitting(true);
      const response = await axiosClient.post(`/pid/submit/${problem._id}`, {
        code: editorRef.current.getValue(),
        language,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      // setTimeout(() => {
      //   setSubmitting(false);
      // }, 5000);
      setSubmitting(false);
    }
  }
  return (
    <div className="flex flex-col h-full">
      {/* Header: Language Selector - OnClick handlers are now simpler */}
      <div className="flex items-center p-2 gap-2 border-b-2 border-dashed">
        <LanguageButton
          active={language === "cpp"}
          onClick={() => {
            setLanguage("cpp");
          }}
        >
          C++
        </LanguageButton>
        <LanguageButton
          active={language === "java"}
          onClick={() => {
            setLanguage("java");
          }}
        >
          Java
        </LanguageButton>
        <LanguageButton
          active={language === "python"}
          onClick={() => {
            setLanguage("python");
          }}
        >
          Python
        </LanguageButton>
        <LanguageButton
          active={language === "javascript"}
          onClick={() => {
            setLanguage("javascript");
          }}
        >
          JavaScript
        </LanguageButton>
      </div>

      {/* Code Area */}
      <div className="flex-grow bg-[#282c34] text-white p-4 font-mono overflow-auto">
        {/* ## UPDATED ##: Use `value` and `onChange` to make this a controlled component */}

        <Editor
          width="100%"
          height="100%"
          // defaultLanguage={language}
          language={language}
          // onChange=""
          // defaultValue={initialCode}
          value={initialCode}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          // theme="hc-black"
          options={{
            scrollBeyondLastLine: false,
            wordWrap: "on",
            mouseWheelZoom: true,
            lineNumbersMinChars: 1,
            lineDecorationsWidth: 2,
          }}
        />
      </div>

      {/* Footer: Run/Submit Buttons */}
      <div className="flex items-center justify-end p-3 gap-3 border-t-2 border-dashed bg-slate-50">
        <button
          onClick={runCodeFunction}
          disabled={submitting}
          // className="px-5 py-2 bg-gray-600 text-white font-bold rounded-lg sketch-button"
          className={`px-5 py-2 ${
            submitting
              ? "bg-gray-500 text-white sketch-button-clicked"
              : "bg-gray-600 text-white "
          } font-bold rounded-lg sketch-button`}
        >
          {/* <button className="px-5 py-2 bg-gray-600 text-white font-bold rounded-lg sketch-button" > */}
          Run
        </button>
        {/* <button className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg sketch-button"> */}
        <button
          onClick={submitCodeFunction}
          disabled={submitting}
          className={`px-5 py-2 ${
            submitting
              ? "bg-gray-500 text-white sketch-button-clicked"
              : "bg-green-500 text-white "
          } font-bold rounded-lg sketch-button`}
        >
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
