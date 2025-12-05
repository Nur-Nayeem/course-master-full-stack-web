import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminAssignments() {
  const api = useAxiosSecure();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/assignments");
      setAssignments(res.data.assignments || []);
    } catch (err) {
      alert("Failed", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const review = async (enrollmentId, index) => {
    const grade = parseInt(prompt("Enter grade (0-100)"));
    const comment = prompt("Enter comment (optional)");
    try {
      await api.post(`/api/admin/assignments/${enrollmentId}/${index}/review`, {
        grade,
        reviewerComment: comment,
      });
      alert("Reviewed");
      fetch();
    } catch (err) {
      alert("Failed to review", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 px-8 py-1">Assignments</h2>
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary/80"></div>
          </div>
        ) : (
          assignments.map((a, idx) => (
            <div key={idx} className="p-3 bg-white rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div>
                    <span className="font-semibold">Student Name: </span>
                    {a.user?.name}
                  </div>
                  <div className="font-semibold">{a.course?.title}</div>
                  <div className="text-sm text-gray-600">
                    Lesson: {a.lessonIndex}
                  </div>
                  <div className="text-sm mt-2">{a.answerText}</div>
                  {a.driveLink && (
                    <a
                      href={a.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary block mt-2"
                    >
                      Drive link
                    </a>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    Submitted: {new Date(a.submittedAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm">
                    {a.reviewed ? `Grade: ${a.grade}` : "Not reviewed"}
                  </div>
                  <button
                    onClick={() => review(a.enrollmentId, a.assignmentIndex)}
                    className="px-3 py-1 border rounded"
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
