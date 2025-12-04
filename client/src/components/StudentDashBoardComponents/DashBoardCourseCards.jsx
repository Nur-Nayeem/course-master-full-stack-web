import React from "react";
import { FaAward } from "react-icons/fa";
import { Link } from "react-router";

const DashBoardCourseCards = ({ course, isCompleted, en }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col">
      {/* course thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail || "https://placehold.co/600x400"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        {isCompleted && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <FaAward className="w-3 h-3" /> Completed
          </div>
        )}
      </div>

      {/* content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4 flex-1">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            {course.category || "Course"}
          </p>
          <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            By {course.instructor}
          </p>
        </div>

        {/* progress bar */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs font-bold text-gray-900">
              {en.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                isCompleted ? "bg-green-500" : "bg-primary"
              }`}
              style={{ width: `${en.progress}%` }}
            ></div>
          </div>

          <Link
            to={`/courses/${course._id}/player`}
            className="block w-full text-center py-2.5 rounded-lg font-medium text-sm transition-colors border border-gray-200 hover:border-primary hover:text-primary active:bg-gray-50"
          >
            {isCompleted ? "Learn Again" : "Continue Learning"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCourseCards;
