import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InputField, TextAreaField, SelectField } from '../../../../common/formFields'; // Adjust path
import TagAutocompleteInput from '../../../../common/tagAutoCompleteInput'; // Adjust path

const PREDEFINED_TAGS = ["array", "linked-list", "tree", "graph", "dp", "recursion", "function", "divide-and-conquer", "other"];

export default function BasicInfoTab() {
  const { control, formState: { errors } } = useFormContext(); // Get methods from provider

  return (
    <section className="space-y-4">
      <InputField id="title" label="Title" register={control.register} error={errors.title} required />
      <TextAreaField id="description" label="Description" register={control.register} error={errors.description} required />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <SelectField id="difficultyLevel" label="Difficulty" register={control.register} error={errors.difficultyLevel} required>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </SelectField>

        {/* Controller for Tags Autocomplete */}
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagAutocompleteInput
              {...field} // Passes value, onChange, etc.
              label="Tags *"
              placeholder="Type or select tags..."
              predefinedTags={PREDEFINED_TAGS}
              error={errors.tags}
            />
          )}
        />
        
        {/* Controller for Companies Autocomplete */}
        <Controller
          name="companies"
          control={control}
          render={({ field }) => (
            <TagAutocompleteInput
              {...field}
              label="Companies"
              placeholder="Add company tags..."
              // You can pass predefined companies here if you have them
              error={errors.companies}
            />
          )}
        />
      </div>
    </section>
  );
}