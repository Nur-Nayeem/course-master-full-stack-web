import React from "react";
import { FaBookOpen, FaCheckCircle, FaClock } from "react-icons/fa";

const StatOverview = ({ totalCourses, inProgress, completedCourses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-primary`}>
          {/* <Icon className="w-6 h-6 text-white" /> */}
          <FaBookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Enrolled Courses</p>
          <h4 className="text-2xl font-bold text-secondary">{totalCourses}</h4>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-orange-500`}>
          {/* <Icon className="w-6 h-6 text-white" /> */}
          <FaClock className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">In Progress</p>
          <h4 className="text-2xl font-bold text-secondary">{inProgress}</h4>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-green-500`}>
          {/* <Icon className="w-6 h-6 text-white" /> */}
          <FaCheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Completed</p>
          <h4 className="text-2xl font-bold text-secondary">
            {completedCourses}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default StatOverview;
