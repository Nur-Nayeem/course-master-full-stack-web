import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Image */}
      <div className="h-40 bg-gray-200 overflow-hidden">
        <img
          src={course?.thumbnail || "https://placehold.co/600x400"}
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-48">
        <h3 className="font-semibold text-lg text-secondary line-clamp-2">
          {course.title}
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{course.instructor}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="font-medium text-gray-700">
              {course.rating || "4.8"}
            </span>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">
              ${course.price}
            </span>

            <Link
              to={`/courses/${course._id}`}
              className="px-3 py-1 btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
