import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextAreaField } from '../../../../common/formFields'; // Adjust path

const LANGUAGES = ["cpp", "java", "python", "javascript"];

// Helper for array-level errors (can be reused or defined here)
const FieldArrayErrorMessage = ({ error }) => {
    if (!error) return null;
    if (error.message) { // e.g., length error
        return <p className="text-red-600 text-xs font-semibold mt-1">{error.message}</p>;
    }
    if (error.root?.message) { // Less common root error
        return <p className="text-red-600 text-xs font-semibold mt-1">{error.root.message}</p>;
    }
    // Individual field errors are handled by TextAreaField
    return null;
};

export default function CodeTab() {
  const { control, register, formState: { errors } } = useFormContext();

  // We still use useFieldArray, but treat them as fixed-length pairs
  const { fields: starterCodeFields } = useFieldArray({ control, name: "starterCode" });
  const { fields: solutionFields } = useFieldArray({ control, name: "referenceSolution" });

  return (
    <div className="space-y-8">
      {/* --- Code Pairs Section --- */}
      <section className="space-y-6 p-4 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-bold border-b pb-2">Code Snippets *</h2>
        <p className="text-sm text-gray-600">Provide the starter code and the complete reference solution for each language.</p>

        {/* Map over the languages to create pairs */}
        {LANGUAGES.map((language, index) => (
          <div key={language} className="p-4 bg-slate-50 rounded border border-gray-200">
            <h3 className="font-bold text-lg mb-3 text-gray-700 capitalize">{language}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* --- Starter Code --- */}
              <div>
                {/* Hidden input to ensure language is submitted (optional if defaultValues handle it) */}
                {/* <input type="hidden" {...register(`starterCode.${index}.language`)} value={language} /> */}
                <TextAreaField
                  id={`starter_${language}`}
                  label={`Starter Code`}
                  register={register}
                  // Access error for this specific starter code entry
                  error={errors.starterCode?.[index]?.initialCode}
                  required
                  {...register(`starterCode.${index}.initialCode`)}
                  rows={8} // Adjust rows as needed
                />
              </div>

              {/* --- Reference Solution --- */}
              <div>
                {/* Hidden input to ensure language is submitted (optional) */}
                {/* <input type="hidden" {...register(`referenceSolution.${index}.language`)} value={language} /> */}
                <TextAreaField
                  id={`solution_${language}`}
                  label={`Reference Solution`}
                  register={register}
                   // Access error for this specific reference solution entry
                  error={errors.referenceSolution?.[index]?.completeCode}
                  required
                  {...register(`referenceSolution.${index}.completeCode`)}
                  rows={8} // Adjust rows as needed
                />
              </div>
            </div>
          </div>
        ))}
        {/* Display general array errors if they exist (e.g., length mismatch) */}
        <FieldArrayErrorMessage error={errors.starterCode} />
        <FieldArrayErrorMessage error={errors.referenceSolution} />
      </section>
    </div>
  );
}