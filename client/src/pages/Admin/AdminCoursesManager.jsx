import { Link } from "react-router";
import { Edit2, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminCourses() {
  const api = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch courses
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminCourses"],
    queryFn: async () => {
      const res = await api.get("/api/admin/courses");
      return res.data.courses || res.data;
    },
    staleTime: 1000 * 60 * 5, // cache 5 minutes
    refetchOnWindowFocus: true,
  });

  // Delete course mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/admin/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
    },
  });

  const remove = (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    deleteMutation.mutate(id, {
      onError: (err) => {
        alert(err.response?.data?.message || "Failed to delete");
      },
    });
  };

  const courses = data || [];

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="ml-8">
          <h2 className="text-2xl font-bold text-secondary">
            Courses Management
          </h2>
          <p className="text-secondary/70">Manage your course catalog</p>
        </div>
        <Link
          to="/admin/courses/create"
          className="bg-primary/90 text-white px-5 py-2.5 rounded-lg hover:bg-primary transition font-medium shadow-sm"
        >
          + New
        </Link>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary/80"></div>
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center py-10">{error.message}</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-900 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Lessons</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={c.thumbnail || "/placeholder.jpg"}
                      alt={c.title}
                      className="w-14 h-14 rounded object-cover border border-slate-200"
                    />
                    <span className="font-semibold text-secondary">
                      {c.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">{c.category || "N/A"}</td>
                  <td className="px-6 py-4">
                    {c.lessons?.length || 0} Lessons
                  </td>
                  <td className="px-6 py-4">${c.price}</td>
                  <td className="px-6 py-4">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                    <Link
                      to={`/admin/courses/edit/${c._id}`}
                      className="px-3 py-1.5 text-primary border border-indigo-200 rounded hover:bg-indigo-50 transition"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => remove(c._id)}
                      className="px-3 py-1.5 text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-400 text-sm"
                  >
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
