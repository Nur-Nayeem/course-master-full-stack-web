import { useFieldArray } from "react-hook-form";
import QuestionList from "./QuestionList";
import { BookOpen, Plus, Trash2, Video } from "lucide-react";

// 3. Lesson List Component
const LessonList = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-medium text-secondary flex items-center gap-2">
          <BookOpen size={20} /> Curriculum
        </h3>
      </div>

      {fields.map((item, index) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <span className="font-semibold text-secondary/90">
              Lesson {index + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary/90">
                  Lesson Title
                </label>
                <input
                  {...register(`lessons.${index}.title`, {
                    required: "lassion title is required",
                  })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. Introduction to React"
                />
                {errors?.lessons?.[index]?.title && (
                  <p className="text-red-500 text-xs mt-1">
                    Lesson title is required
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary/80">
                  Duration
                </label>
                <input
                  {...register(`lessons.${index}.duration`)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. 15:30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-secondary/80">
                  Video URL
                </label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <Video size={16} />
                  </span>
                  <input
                    {...register(`lessons.${index}.videoUrl`)}
                    className="flex-1 w-full p-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <QuestionList
              nestIndex={index}
              control={control}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          append({
            title: "",
            videoUrl: "",
            duration: "",
            quiz: { questions: [] },
          });
        }}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary/90 hover:bg-primary focus:outline-none"
      >
        <Plus size={16} className="mr-2" /> Add Lesson
      </button>
    </div>
  );
};

export default LessonList;
