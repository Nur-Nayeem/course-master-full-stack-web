import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray } from "react-hook-form";
const OptionList = ({ nestIndex, questionIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `lessons.${nestIndex}.quiz.questions.${questionIndex}.options`,
  });

  return (
    <div className="mt-2 ml-4">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Answer Options
      </label>
      {fields.map((item, k) => (
        <div key={item.id} className="flex gap-2 mb-2 items-center">
          <span className="text-sm text-gray-400 font-mono">{k + 1}.</span>
          <input
            {...register(
              `lessons.${nestIndex}.quiz.questions.${questionIndex}.options.${k}.value`,
              { required: true }
            )}
            placeholder={`Option ${k + 1}`}
            className="flex-1 p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
          />
          <button
            type="button"
            onClick={() => remove(k)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="text-xs flex items-center gap-1 text-primary/90 hover:text-primary font-medium mt-1"
      >
        <Plus size={12} /> Add Option
      </button>

      {/* correct answer Selection */}
      <div className="mt-3">
        <label className="text-xs font-semibold text-gray-500">
          Correct Answer (Index)
        </label>
        <select
          {...register(
            `lessons.${nestIndex}.quiz.questions.${questionIndex}.correctAnswer`,
            { required: true }
          )}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border"
        >
          <option value="">Select correct option...</option>
          {fields.map((_, idx) => (
            <option key={idx} value={idx}>
              Option {idx + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OptionList;
