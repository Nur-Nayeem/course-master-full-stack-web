import { Link } from "react-router";
import CourseCard from "../../CoursesComponents/CourseCard/CourseCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import LoadingSimple from "../../Loading/LoadingSimple";

const PopulerCourses = () => {
  const axiosInstance = useAxios();
  const limit = 4; // courses per page

  // Fetch top-rated courses using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popularCourses", limit], // cache key
    queryFn: async () => {
      const res = await axiosInstance.get("/api/courses", {
        params: {
          limit,
          popular: true, // fetch top-rated courses
        },
      });
      return res.data.courses;
    },
    staleTime: 1000 * 60 * 5, // cache fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // keep in cache for 30 minutes
    refetchOnWindowFocus: true, // refetch if user focuses tab
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Featured Courses
        </h2>

        {isLoading && <LoadingSimple />}

        {isError && (
          <p className="text-center text-red-500 py-10">
            Failed to load courses: {error.message}
          </p>
        )}

        {!isLoading && data?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/courses" className="btn-primary px-4 py-3 font-medium">
            Browse All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopulerCourses;
