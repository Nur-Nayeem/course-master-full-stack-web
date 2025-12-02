import { Link } from "react-router";
import CourseCard from "../../CoursesComponents/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

const PopulerCourses = () => {
  const [courses, setCourses] = useState([]);
  const axiosInstanse = useAxios();

  const limit = 8; // courses per page

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);

      try {
        const res = await axiosInstanse.get("/api/courses", {
          params: {
            limit,
          },
        });

        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
        alert("Failed to load courses");
      }

      setLoading(false);
    };
    fetchCourses();
  }, [axiosInstanse]);
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Featured Courses
        </h2>

        {/* Courses Grid */}
        {loading && (
          <p className="text-center text-gray-500 py-10">Loading courses...</p>
        )}

        {!loading && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* CTA Button */}
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
