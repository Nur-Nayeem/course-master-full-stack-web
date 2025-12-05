import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Plus,
  Trash2,
  Save,
  BookOpen,
  HelpCircle,
  List,
  Video,
  Tag,
  CheckCircle,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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

// 2. Question List Component
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
        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              videoUrl: "",
              duration: "",
              quiz: { questions: [] },
            })
          }
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary/90 hover:bg-primary focus:outline-none"
        >
          <Plus size={16} className="mr-2" /> Add Lesson
        </button>
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
                  {...register(`lessons.${index}.title`, { required: true })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. Introduction to React"
                />
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
    </div>
  );
};

export default function CourseForm({ initialData = null, isEditMode = false }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const axiosSecureInstance = useAxiosSecure();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      price: 0,
      category: "",
      tags: "",
      lessons: [],
    },
  });
  console.log(initialData);

  useEffect(() => {
    if (initialData && isEditMode) {
      const formattedData = {
        ...initialData,
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(", ")
          : "",

        lessons: (initialData.lessons || []).map((lesson) => ({
          ...lesson,
          quiz: {
            questions: (lesson.quiz?.questions || []).map((q) => ({
              ...q,
              options: (q.options || []).map((opt) => ({ value: opt })),
            })),
          },
        })),
      };

      reset(formattedData);
    }
  }, [initialData, isEditMode, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitMessage(null);

    // 1. transform Form Data back to Schema format
    const payload = {
      ...data,
      price: Number(data.price),
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      lessons: data.lessons.map((lesson) => ({
        ...lesson,
        quiz: {
          questions: lesson.quiz.questions.map((q) => ({
            ...q,
            correctAnswer: Number(q.correctAnswer),
            options: q.options.map((opt) => opt.value),
          })),
        },
      })),
    };

    console.log("Submitting Payload:", payload);

    // 2. Simulate API Call
    try {
      isEditMode
        ? await axiosSecureInstance.put(
            `/api/admin/courses/${initialData._id}`,
            payload
          )
        : await axiosSecureInstance.post(`/api/admin/courses`, payload);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitMessage({
        type: "success",
        text: isEditMode
          ? "Course updated successfully!"
          : "Course created successfully!",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: `"Something went wrong." ${error}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? "Edit Course" : "Create New Course"}
        </h1>
        <p className="text-gray-500 mt-2">
          Manage course details, lessons, and embedded quizzes.
        </p>
      </div>

      {submitMessage && (
        <div
          className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
            submitMessage.type === "success"
              ? "bg-green-50 text-success"
              : "bg-red-50 text-error"
          }`}
        >
          {submitMessage.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <HelpCircle size={20} />
          )}
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* --- General Information Section --- */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
            <List size={20} /> General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary/90">
                Course Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Complete Web Development Bootcamp"
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Enter a detailed description of the course..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructor Name
              </label>
              <input
                {...register("instructor", { required: true })}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true, min: 0 })}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="">Select Category</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Tag size={14} /> Tags (comma separated)
              </label>
              <input
                {...register("tags")}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="React, Frontend, API"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail URL
              </label>
              <input
                {...register("thumbnail")}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* --- Lessons & Quizzes Section --- */}
        <LessonList control={control} register={register} errors={errors} />

        {/* --- Submit Actions --- */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`flex items-center gap-2 px-6 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              submitting
                ? "bg-primary/80 cursor-not-allowed"
                : "bg-primary/90 hover:bg-primary"
            }`}
          >
            <Save size={18} />
            {submitting ? "Saving..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
