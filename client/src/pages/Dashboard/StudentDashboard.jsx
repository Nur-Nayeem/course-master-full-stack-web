import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BiPlayCircle } from "react-icons/bi";
import StatOverview from "../../components/StudentDashBoardComponents/StatOverview";
import DashBoardCourseCards from "../../components/StudentDashBoardComponents/DashBoardCourseCards";
import EmptyState from "../../components/StudentDashBoardComponents/EmptyState";
import DashBoardSceletonLoading from "../../components/StudentDashBoardComponents/DashBoardSceletonLoading";

const StudentDashboard = () => {
  const axiosSecureInstance = useAxiosSecure();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get("/api/enrollments/me");
        setEnrollments(res.data.enrollments);
      } catch (err) {
        console.error("Failed to fetch enrollments", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [axiosSecureInstance]);

  // calculate stats
  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter(
    (en) => en.progress === 100
  ).length;
  const inProgress = totalCourses - completedCourses;

  return (
    <section className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here is your learning progress.
          </p>
        </div>

        {loading ? (
          <DashBoardSceletonLoading />
        ) : (
          <>
            {/* stats overview */}
            {enrollments.length > 0 && (
              <StatOverview
                totalCourses={totalCourses}
                inProgress={inProgress}
                completedCourses={completedCourses}
              />
            )}

            {/* enrolled course list */}
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BiPlayCircle className="w-5 h-5 text-primary" />
              My Courses
            </h2>

            {enrollments.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((en) => {
                  const course = en.courseId;
                  const isCompleted = en.progress === 100;

                  return (
                    <DashBoardCourseCards
                      key={en}
                      en={en}
                      course={course}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default StudentDashboard;
