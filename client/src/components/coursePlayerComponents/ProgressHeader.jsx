const ProgressHeader = ({ enrollment, totalLessons }) => {
  const progress = enrollment.progress ?? 0;
  const completed = enrollment.lessonsCompleted?.length || 0;

  return (
    <div className="p-6 border-b border-gray-100">
      <h2 className="font-bold text-lg text-gray-800 mb-2">Course Content</h2>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>{progress}% Completed</span>
        <span>
          {completed}/{totalLessons}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressHeader;
