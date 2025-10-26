import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
// import axiosClient from "../../axiosClient"; // Make sure this is uncommented for API calls

import BasicInfoTab from "./Tabs/BasicInfoTab.jsx";
import TestCasesTab from "./Tabs/TestCasesTab.jsx";
import CodeTab from "./Tabs/CodeTab.jsx";
import axiosClient from "../../../../axiosClient/index.js";

// --- Zod Schema (ensure it's correct) ---
const LANGUAGES = ["cpp", "java", "python", "javascript"];
const languageEnum = z.enum(LANGUAGES);
const difficultyEnum = z.enum(["easy", "medium", "hard"]);
const tagEnum = z.enum([
  "array",
  "linked-list",
  "tree",
  "graph",
  "dp",
  "recursion",
  "function",
  "divide-and-conquer",
  "other",
]);

const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required."),
  output: z.string().min(1, "Output is required."),
});
const visibleTestCaseSchema = testCaseSchema.extend({
  inputMessage: z.string().min(1, "Input message is required."),
  outputMessage: z.string().min(1, "Output message is required."),
  explanation: z.string().optional(),
});
const codeSchema = z.object({
  language: languageEnum,
  initialCode: z.string().min(1, "Initial code is required."),
});
const solutionSchema = z.object({
  language: languageEnum,
  completeCode: z.string().min(1, "Complete solution code is required."),
});
const problemFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  difficultyLevel: difficultyEnum,
  tags: z.array(z.string()).min(1, "At least one tag is required."),
  companies: z.array(z.string().trim().toLowerCase()).optional(),
  visibleTestCases: z
    .array(visibleTestCaseSchema)
    .min(1, "At least one visible test case is required."),
  hiddenTestCases: z
    .array(testCaseSchema)
    .min(1, "At least one hidden test case is required."),
  starterCode: z
    .array(codeSchema)
    .length(
      LANGUAGES.length,
      `Starter code for all ${LANGUAGES.length} languages is required.`
    ),
  referenceSolution: z
    .array(solutionSchema)
    .length(
      LANGUAGES.length,
      `Reference solution for all ${LANGUAGES.length} languages is required.`
    ),
});
// --- End Schema ---

// --- Main Component ---
const TABS = ["Basic Info", "Test Cases", "Code"];
const TAB_FIELDS = {
  "Basic Info": [
    "title",
    "description",
    "difficultyLevel",
    "tags",
    "companies",
  ],
  "Test Cases": ["visibleTestCases", "hiddenTestCases"],
  // No need to validate 'Code' tab separately if final submit validates all
};

export default function CreateProblemPanel() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver: zodResolver(problemFormSchema),
    mode: "onSubmit", // Validate primarily on submit
    reValidateMode: "onChange", // Re-validate on change after first submit attempt
    defaultValues: {
      difficultyLevel: "easy",
      tags: [],
      companies: [],
      visibleTestCases: [
        {
          input: "",
          output: "",
          inputMessage: "",
          outputMessage: "",
          explanation: "",
        },
      ],
      hiddenTestCases: [{ input: "", output: "" }],
      starterCode: LANGUAGES.map((lang) => ({
        language: lang,
        initialCode: "",
      })),
      referenceSolution: LANGUAGES.map((lang) => ({
        language: lang,
        completeCode: "",
      })),
    },
  });

  const {
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods; // Destructure errors

  // Final submission handler - called by handleSubmit
  const onFinalSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("Form Data Submitted:", data);
    try {
      // --- Replace with your actual API call ---
      const response = axiosClient.post("/problem/create", data);
      // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // ---
      toast.promise(response, {
        loading: "Validating your problem...",
        success: (response) => {
          console.log(response);
          return "Problem Created Successfully..😊";
        },
        error: (err) => `${err.message}`,
      });
      //   console.log(response.data);

      // methods.reset(); // Optionally reset form
      // setActiveTab(TABS[0]); // Go back to first tab
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(error.response?.data?.message || "Failed to create problem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for the "Next" button click
  const handleNextTab = async () => {
    const currentFields = TAB_FIELDS[activeTab];
    console.log(`Triggering validation for tab: ${activeTab}`, currentFields);
    const isValid = await trigger(currentFields, { shouldFocus: true });
    console.log(`Validation result for tab ${activeTab}:`, isValid);

    if (isValid) {
      const currentIndex = TABS.indexOf(activeTab);
      if (currentIndex < TABS.length - 1) {
        setActiveTab(TABS[currentIndex + 1]);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast.error("Please fix the errors on this tab before proceeding.");
      // Log errors to see what specifically failed
      console.log("Current Validation Errors:", errors);
    }
  };

  const isLastTab = activeTab === TABS[TABS.length - 1];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl sketch-border-1 font-['Comic_Neue']">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create New Problem
      </h1>

      {/* Tab Navigation */}
      <div className="border-b-2 border-dashed mb-6">
        <nav className="-mb-0.5 flex space-x-6 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button" // Ensure tabs don't submit
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 font-bold border-b-4 whitespace-nowrap ${
                activeTab === tab
                  ? "border-yellow-400 text-gray-800"
                  : "border-transparent text-gray-500 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <FormProvider {...methods}>
        {/* handleSubmit handles the final submission */}
        <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-8">
          {/* Tab Content */}
          <div
            style={{ display: activeTab === "Basic Info" ? "block" : "none" }}
          >
            <BasicInfoTab />
          </div>
          <div
            style={{ display: activeTab === "Test Cases" ? "block" : "none" }}
          >
            <TestCasesTab />
          </div>
          <div style={{ display: activeTab === "Code" ? "block" : "none" }}>
            <CodeTab />
          </div>

          {/* Dynamic Button */}
          {!isLastTab && ( // Render "Next" button
            <button
              type="button" // Explicitly type="button"
              onClick={handleNextTab} // Call validation handler
              className="w-full px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button"
            >
              Next
            </button>
          )}

          {isLastTab && ( // Render "Create Problem" button
            <button
              type="submit" // Explicitly type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <svg
                  className="animate-spin h-5 w-5 text-white" /* ...spinner svg... */
                ></svg>
              )}
              {isSubmitting ? "Creating..." : "Create Problem"}
            </button>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
