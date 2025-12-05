// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBookOpen, FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";
import AdminAnalytics from "./AdminAnalytics";

const AdminDashboard = () => {
  const axiosSecureInstance = useAxiosSecure();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalEnrollments: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get("/api/admin/stats");
        setStats(res.data.stats || res.data);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [axiosSecureInstance]);

  return (
    <section className="space-y-6 container mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of platform activity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FaBookOpen className="w-5 h-5 text-white" />}
          label="Courses"
          value={stats.totalCourses}
          loading={loading}
        />
        <StatCard
          icon={<FaUsers className="w-5 h-5 text-white" />}
          label="Enrollments"
          value={stats.totalEnrollments}
          loading={loading}
        />
        <StatCard
          icon={<FaClock className="w-5 h-5 text-white" />}
          label="In Progress"
          value={stats.inProgress}
          loading={loading}
        />
        <StatCard
          icon={<FaCheckCircle className="w-5 h-5 text-white" />}
          label="Completed"
          value={stats.completed}
          loading={loading}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-secondary mb-4">
          Enrollments Over Time
        </h2>
        <AdminAnalytics days={7} />
      </div>
    </section>
  );
};

function StatCard({ icon, label, value, loading }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
      <div className="p-3 rounded-lg bg-primary">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <div className="text-2xl font-bold text-slate-900">
          {loading ? "..." : value}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
