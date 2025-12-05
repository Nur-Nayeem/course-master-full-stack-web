import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";
import LoadingSimple from "../Loading/LoadingSimple";

export default function AdminAnalytics({ days = 30 }) {
  const api = useAxiosSecure();

  // TanStack Query
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminAnalytics", days],
    queryFn: async () => {
      const res = await api.get(
        `/api/admin/analytics/enrollments?days=${days}`
      );
      return res.data.data || res.data;
    },
    staleTime: 1000 * 60 * 20, // cache for 20 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingSimple />;
  if (isError) return <p className="text-red-500">Failed to load analytics.</p>;

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
