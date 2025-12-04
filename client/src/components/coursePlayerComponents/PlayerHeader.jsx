import { Link } from "react-router";
import { IoIosArrowBack } from "react-icons/io";

export default function PlayerHeader({ course }) {
  return (
    <div className="px-6 py-4 flex items-center gap-4">
      <Link to="/dashboard" className="hover:text-primary/80 transition">
        <IoIosArrowBack size={24} />
      </Link>
      <div>
        <h1 className="text-lg font-bold leading-tight">{course.title}</h1>
        <p className="text-xs text-gray-400">Instructor: {course.instructor}</p>
      </div>
    </div>
  );
}
