import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import OptionList from "./OptionList";

const QuestionList = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `lessons.${nestIndex}.quiz.questions`,
  });

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <h4 className="flex items-center gap-2 text-sm font-bold text-secondary/80 mb-3">
        <HelpCircle size={16} /> Quiz Questions
      </h4>

      {fields.length === 0 && (
        <p className="text-sm text-gray-400 italic mb-3">
          No questions added yet.
        </p>
      )}

      <div className="space-y-4">
        {fields.map((item, k) => (
          <div
            key={item.id}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative"
          >
            <button
              type="button"
              onClick={() => remove(k)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>

            <div className="mb-3 pr-8">
              <label className="block text-sm font-medium text-secondary/80 mb-1">
                Question Text
              </label>
              <input
                {...register(
                  `lessons.${nestIndex}.quiz.questions.${k}.questionText`,
                  { required: "Question text is required" }
                )}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g., What is the capital of France?"
              />
            </div>

            <OptionList
              nestIndex={nestIndex}
              questionIndex={k}
              control={control}
              register={register}
              errors={errors}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            questionText: "",
            options: [{ value: "" }, { value: "" }],
            correctAnswer: 0,
          })
        }
        className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-indigo-100 hover:bg-indigo-200"
      >
        <Plus size={14} className="mr-1" /> Add Question
      </button>
    </div>
  );
};

export default QuestionList;
