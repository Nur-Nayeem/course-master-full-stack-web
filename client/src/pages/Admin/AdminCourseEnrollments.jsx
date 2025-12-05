import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminCourseEnrollments() {
  const api = useAxiosSecure();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await api.get("/api/admin/courses");
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadCourses();
  }, [api]);

  // Load enrollments when selecting a course
  useEffect(() => {
    if (!selectedCourse) return;

    const loadEnrollments = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/admin/enrollments/course/${selectedCourse}`
        );
        setEnrollments(res.data.enrollments || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    loadEnrollments();
  }, [selectedCourse, api]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="ml-8">
          <h2 className="text-2xl font-bold text-secondary">
            Course-wise Enrolled Students
          </h2>
          <p className="text-secondary/70">
            Select a course to view enrolled students
          </p>
        </div>
      </div>

      {/* ourse selector */}
      <div className="mb-6 px-8">
        <label className="block mb-2 font-semibold text-slate-700">
          Select Course
        </label>
        <select
          className="border border-slate-300 rounded-lg px-4 py-2 w-80"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Choose Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-4">Loading students...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Enrollment Date</th>
                <th className="px-6 py-4">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrollments.map((e) => (
                <tr key={e._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {e.userId?.name}
                  </td>
                  <td className="px-6 py-4">{e.userId?.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  {/* ndjsnj */}
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            e.progress === 100
                              ? "bg-green-500"
                              : "bg-indigo-500"
                          }`}
                          style={{ width: `${e.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium w-8">
                        {e.progress}%
                      </span>
                    </div>
                  </td>

                  {/* lmdkfm  */}
                </tr>
              ))}

              {selectedCourse && enrollments.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-8 text-center text-slate-400"
                  >
                    No students enrolled in this course.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
