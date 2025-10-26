import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { InputField, TextAreaField } from '../../../../common/formFields'; // Adjust path

// Helper component for array-level errors
const FieldArrayErrorMessage = ({ error }) => {
    if (!error) return null;
    if (error.message) {
        return <p className="text-red-600 text-xs font-semibold mt-1">{error.message}</p>;
    }
    if (error.root?.message) {
        return <p className="text-red-600 text-xs font-semibold mt-1">{error.root.message}</p>;
    }
    return null;
};

export default function TestCasesTab() {
  const { control, register, formState: { errors } } = useFormContext(); // Get register as well

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({ control, name: "visibleTestCases" });
  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({ control, name: "hiddenTestCases" });

  return (
    <div className="space-y-8">
      {/* --- Visible Test Cases --- */}
      <section className="space-y-4 p-4 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-bold border-b pb-2">Visible Test Cases *</h2>
        {visibleFields.map((field, index) => (
          <div key={field.id} className="p-3 bg-slate-50 rounded border relative">
            <h3 className="font-semibold text-gray-700 mb-2">Visible Case {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                id={`vis_inputMsg_${index}`} // Unique ID
                label="Input Message"
                register={register} // Pass register
                error={errors.visibleTestCases?.[index]?.inputMessage}
                required
                {...register(`visibleTestCases.${index}.inputMessage`)} // Register the field
              />
              <InputField
                id={`vis_outputMsg_${index}`}
                label="Output Message"
                register={register}
                error={errors.visibleTestCases?.[index]?.outputMessage}
                required
                {...register(`visibleTestCases.${index}.outputMessage`)}
              />
              <TextAreaField
                id={`vis_input_${index}`}
                label="Input"
                register={register}
                error={errors.visibleTestCases?.[index]?.input}
                required
                {...register(`visibleTestCases.${index}.input`)}
                rows={2}
              />
              <TextAreaField
                id={`vis_output_${index}`}
                label="Output"
                register={register}
                error={errors.visibleTestCases?.[index]?.output}
                required
                {...register(`visibleTestCases.${index}.output`)}
                rows={2}
              />
              <TextAreaField
                id={`vis_explanation_${index}`}
                label="Explanation (Optional)"
                register={register}
                error={errors.visibleTestCases?.[index]?.explanation}
                {...register(`visibleTestCases.${index}.explanation`)}
                rows={2}
              />
            </div>
            {/* Show remove button only if more than one item exists */}
            {visibleFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeVisible(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold p-1 rounded hover:bg-red-100"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendVisible({ input: '', output: '', inputMessage: '', outputMessage: '', explanation: '' })}
          className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded sketch-button hover:bg-blue-200"
        >
          + Add Visible Case
        </button>
        <FieldArrayErrorMessage error={errors.visibleTestCases} />
      </section>

      {/* --- Hidden Test Cases --- */}
      <section className="space-y-4 p-4 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-bold border-b pb-2">Hidden Test Cases *</h2>
        {hiddenFields.map((field, index) => (
          <div key={field.id} className="p-3 bg-slate-50 rounded border relative">
            <h3 className="font-semibold text-gray-700 mb-2 md:col-span-2">Hidden Case {index + 1}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextAreaField
                id={`hid_input_${index}`}
                label={`Input`}
                register={register}
                error={errors.hiddenTestCases?.[index]?.input}
                required
                {...register(`hiddenTestCases.${index}.input`)}
                rows={2}
              />
              <TextAreaField
                id={`hid_output_${index}`}
                label={`Output`}
                register={register}
                error={errors.hiddenTestCases?.[index]?.output}
                required
                {...register(`hiddenTestCases.${index}.output`)}
                rows={2}
              />
            </div>
            {/* Show remove button only if more than one item exists */}
            {hiddenFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeHidden(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold p-1 rounded hover:bg-red-100"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendHidden({ input: '', output: '' })}
          className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded sketch-button hover:bg-blue-200"
        >
          + Add Hidden Case
        </button>
        <FieldArrayErrorMessage error={errors.hiddenTestCases} />
      </section>
    </div>
  );
}