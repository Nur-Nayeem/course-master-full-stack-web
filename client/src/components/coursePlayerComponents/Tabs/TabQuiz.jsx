import { FaClipboardList } from "react-icons/fa";

export default function TabQuiz({
  lesson,
  answers,
  setAnswers,
  onSubmit,
  previousScore,
}) {
  if (!lesson?.quiz || lesson.quiz.questions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <FaClipboardList className="mx-auto text-4xl mb-3 opacity-30" />
        <p>No quiz available for this lesson.</p>
      </div>
    );
  }

  const handleChange = (qIdx, value) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: value }));
  };

  return (
    <div className="animate-fade-in space-y-8 max-w-2xl">
      {lesson.quiz.questions.map((q, qIdx) => (
        <div
          key={qIdx}
          className="p-5 border border-gray-200 rounded-xl bg-gray-50"
        >
          <p className="font-bold text-gray-800 mb-4">
            {qIdx + 1}. {q.questionText}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oIdx) => (
              <label
                key={oIdx}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  answers[qIdx] === opt
                    ? "bg-indigo-50 border-indigo-300 ring-1 ring-indigo-300"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${qIdx}`}
                  checked={answers[qIdx] === opt}
                  onChange={() => handleChange(qIdx, opt)}
                  className="w-4 h-4 text-primary focus:ring-indigo-500"
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {previousScore === undefined ? (
        <button
          onClick={onSubmit}
          className="px-8 py-3 bg-primary/90 text-white font-bold rounded-lg shadow-lg hover:bg-primary transition"
        >
          Submit Quiz Answers
        </button>
      ) : (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-yellow-800 font-bold text-lg">
            Previous Score: {previousScore} / {lesson.quiz.questions.length}
          </p>
        </div>
      )}
    </div>
  );
}
