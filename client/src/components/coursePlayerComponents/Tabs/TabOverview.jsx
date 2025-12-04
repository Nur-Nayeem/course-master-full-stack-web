import { FaCheckCircle } from "react-icons/fa";

const TabOverview = ({ lesson, isCompleted, onMarkComplete }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold text-gray-900">{lesson?.title}</h2>
        <button
          onClick={onMarkComplete}
          disabled={isCompleted}
          className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition ${
            isCompleted
              ? "bg-green-100 text-green-700 cursor-default"
              : "bg-primary/90 text-white hover:bg-primary shadow-lg"
          }`}
        >
          {isCompleted ? (
            <>
              <FaCheckCircle /> Completed
            </>
          ) : (
            "Mark as Complete"
          )}
        </button>
      </div>

      <p className="text-gray-600 leading-relaxed">
        {lesson?.description || "No description available for this lesson."}
      </p>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <h4 className="font-semibold text-sm text-gray-500 uppercase mb-2">
          Lesson Details
        </h4>
        <p className="text-gray-800">Duration: {lesson?.duration}</p>
      </div>
    </div>
  );
};

export default TabOverview;
