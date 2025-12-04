import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";

export default function AdminAnalytics({ days = 30 }) {
  const api = useAxiosSecure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/admin/analytics/enrollments?days=${days}`
        );
        // expected: [{ date: '2025-12-01', count: 5 }, ...]
        setData(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
      setLoading(false);
    };
    fetch();
  }, [api, days]);

  if (loading) return <div className="p-6 text-center">Loading chart...</div>;

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
