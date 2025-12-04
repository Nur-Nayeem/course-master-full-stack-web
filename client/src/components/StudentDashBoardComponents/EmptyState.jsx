import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { Link } from "react-router";

const EmptyState = () => (
  <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
    <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-4">
      <FaBookOpen className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-secondary">No courses yet</h3>
    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
      You haven't enrolled in any courses. Start your learning journey today!
    </p>
    <Link
      to="/courses"
      className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/30"
    >
      Browse Courses
    </Link>
  </div>
);

export default EmptyState;
