import LoadingSimple from "../../components/Loading/LoadingSimple";
import { useAuth } from "../../hooks/useAuth";
import AdminDashboard from "../Admin/AdminDashboard";
import StudentDashboard from "./StudentDashboard";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSimple />;
  }
  if (user?.role === "admin") {
    return <AdminDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

export default DashboardHome;
