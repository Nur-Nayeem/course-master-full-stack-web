import { FaPlayCircle, FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function LessonSidebar({
  lessons,
  selectedLesson,
  setSelectedLesson,
  setActiveTab,
  completedLessons,
}) {
  const handleClick = (idx) => {
    setSelectedLesson(idx);
    setActiveTab("overview");
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {lessons.map((lesson, idx) => {
        const isActive = selectedLesson === idx;
        const isDone = completedLessons.includes(idx);

        return (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={`group p-4 flex gap-4 cursor-pointer transition-colors border-b border-gray-50 hover:bg-gray-50 ${
              isActive
                ? "bg-indigo-50 border-l-4 border-l-primary"
                : "border-l-4 border-l-transparent"
            }`}
          >
            <div className="mt-1">
              {isDone ? (
                <FaCheckCircle className="text-green-500 text-lg" />
              ) : isActive ? (
                <FaPlayCircle className="text-primary text-lg" />
              ) : (
                <FaRegCircle className="text-gray-300 text-lg" />
              )}
            </div>
            <div className="flex-1">
              <h4
                className={`text-sm font-medium mb-1 ${
                  isActive ? "text-indigo-900" : "text-gray-700"
                }`}
              >
                {idx + 1}. {lesson.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FaPlayCircle size={10} /> {lesson.duration}
                </span>
                {lesson.quiz && (
                  <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-[10px]">
                    Quiz
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
