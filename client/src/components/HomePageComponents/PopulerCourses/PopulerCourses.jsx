import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import CouresCard from "../../CoursesComponents/CourseCard/CourseCard";

const PopulerCourses = ({ courses = [] }) => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Featured Courses
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {courses.map((course, i) => (
            <CouresCard course={course} key={i} />
          ))}
        </div>

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
