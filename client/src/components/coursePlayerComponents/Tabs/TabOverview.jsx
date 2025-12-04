const TabOverview = ({ lesson }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold text-secondary">{lesson?.title}</h2>
      </div>

      <p className="text-secondary/80 leading-relaxed">
        {lesson?.description || "No description available for this lesson."}
      </p>

      <div className="p-4 bg-gray-100 rounded-lg border border-gray-100">
        <h4 className="font-semibold text-sm text-secondary/60 uppercase mb-2">
          Lesson Details
        </h4>
        <p className="text-gray-800">Duration: {lesson?.duration}</p>
      </div>
    </div>
  );
};

export default TabOverview;
