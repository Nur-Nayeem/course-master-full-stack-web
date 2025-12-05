import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminAssignments() {
  const api = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch assignments
  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["adminAssignments"],
    queryFn: async () => {
      const res = await api.get("/api/admin/assignments");
      return res.data.assignments || [];
    },
    staleTime: 1000 * 60 * 5, // cache 5 minutes
    refetchOnWindowFocus: false,
  });

  // Review mutation
  const reviewMutation = useMutation({
    mutationFn: async ({ enrollmentId, index, grade, comment }) => {
      return await api.post(
        `/api/admin/assignments/${enrollmentId}/${index}/review`,
        { grade, reviewerComment: comment }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAssignments"] });
      alert("Reviewed successfully!");
    },
    onError: (err) => {
      alert("Failed to review", err);
    },
  });

  const handleReview = (enrollmentId, index) => {
    const grade = parseInt(prompt("Enter grade (0-100)"));
    if (isNaN(grade) || grade < 0 || grade > 100) {
      alert("Invalid grade!");
      return;
    }
    const comment = prompt("Enter comment (optional)");
    reviewMutation.mutate({ enrollmentId, index, grade, comment });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary/80"></div>
        </div>
      ) : assignments.length === 0 ? (
        <p className="text-gray-500">No assignments found.</p>
      ) : (
        <div className="space-y-3">
          {assignments.map((a, idx) => (
            <div key={idx} className="p-3 bg-white rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div>
                    <span className="font-semibold">Student Name: </span>
                    {a.user?.name || "N/A"}
                  </div>
                  <div className="font-semibold">
                    {a.course?.title || "N/A"}
                  </div>
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
                    onClick={() =>
                      handleReview(a.enrollmentId, a.assignmentIndex)
                    }
                    className="px-3 py-1 border rounded"
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
