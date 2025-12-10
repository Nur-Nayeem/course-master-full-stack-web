import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Save, List, Tag } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonList from "../../components/AdminComponents/CourseFormComponents/LessionList";
import { imageUpload } from "../../lib";

export default function CourseForm({ initialData = null, isEditMode = false }) {
  const [submitting, setSubmitting] = useState(false);
  const axiosSecureInstance = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    mode: "onSubmit",
  });
  //  Populate form with initialData when in edit mode
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

    try {
      const image = await imageUpload(data.image[0]);
      console.log(image);

      const payload = {
        ...data,
        thumbnail: image,
        price: Number(data.price),
        tags: data.tags
          ? data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== "")
          : [],
        lessons: data.lessons.map((lesson) => ({
          ...lesson,
          quiz:
            lesson.quiz && lesson.quiz.questions.length > 0
              ? {
                  questions: lesson.quiz.questions.map((q) => ({
                    ...q,
                    correctAnswer: Number(q.correctAnswer),
                    options: q.options.map((opt) => opt.value),
                  })),
                }
              : undefined,
        })),
      };

      // API call
      if (isEditMode) {
        await axiosSecureInstance.put(
          `/api/admin/courses/${initialData._id}`,
          payload
        );
        await queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
        await queryClient.invalidateQueries({
          queryKey: ["adminCourse", initialData._id],
        });
        await queryClient.invalidateQueries({ queryKey: ["courses"] });
      } else {
        await axiosSecureInstance.post(`/api/admin/courses`, payload);
        await queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
        await queryClient.invalidateQueries({ queryKey: ["courses"] });
      }

      // Success SweetAlert
      Swal.fire({
        position: "center",
        icon: "success",
        title: isEditMode
          ? "Course updated successfully!"
          : "Course created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => navigate("/admin/courses"), 1500);
    } catch (error) {
      const errors = error.response?.data?.errors;
      const message =
        errors && Array.isArray(errors) && errors.length > 0
          ? errors.join(", ")
          : error.response?.data?.message || error.message;

      // Error SweetAlert
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">
          {isEditMode ? "Edit Course" : "Create New Course"}
        </h1>
        <p className="text-gray-500 mt-2">
          Manage course details, lessons, and embedded quizzes.
        </p>
      </div>

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
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructor Name
              </label>
              <input
                {...register("instructor", { required: true })}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
              {errors.instructor && (
                <span className="text-red-500 text-xs">
                  {errors.instructor.message}
                </span>
              )}
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
                {...register("category", { required: "Category is required" })}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="">Select Category</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Data Science">Data Science</option>
                <option value="Business and Marketing">
                  Business and Marketing
                </option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-xs">
                  {errors.category.message}
                </span>
              )}
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
                Thumbnail
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  {...register("image")}
                  className="file-input w-full h-12 pr-4 rounded-lg border-2 border-primary/50  bg-gray-200/10 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-400">
                  PNG, JPG or JPEG (max 2MB)
                </p>
              </div>
              {/* <input
                {...register("thumbnail", {
                  required: "thumbnail is required",
                })}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="https://example.com/image.jpg"
              /> */}

              {errors.thumbnail && (
                <span className="text-red-500 text-xs">
                  {errors.thumbnail.message}
                </span>
              )}
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
