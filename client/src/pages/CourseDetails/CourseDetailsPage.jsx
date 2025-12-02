import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import {
  FaPlayCircle,
  FaStar,
  FaUser,
  FaTag,
  FaGlobe,
  FaClock,
  FaCertificate,
} from "react-icons/fa";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/courses/${id}`);
        setCourse(res.data.course);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [axiosInstance, id]);

  const handleEnroll = () => {};

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  if (!course)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Course not found.
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-sans text-secondary">
      <div className="bg-gray-800 text-white py-12 px-4 lg:py-16">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="lg:w-2/3 space-y-4">
            {/*  Category */}
            <div className="flex items-center gap-2 text-primary/90 text-sm font-semibold uppercase tracking-wide">
              <Link to={"/courses"}>Courses</Link>
              <span>/</span>
              <span>{course.category}</span>
            </div>

            {/* title */}
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              {course.title}
            </h1>

            {/* description */}
            <p className="text-gray-300 text-lg max-w-2xl">
              {course.description.substring(0, 100)}...
            </p>

            {/* ratings and instructor */}
            <div className="flex flex-wrap items-center gap-6 text-sm pt-2">
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="font-bold text-lg">{course.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(course.rating)
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400" />
                <span>
                  Instructor{" "}
                  <span className="text-primary/90 underline cursor-pointer">
                    {course.instructor}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <FaGlobe />
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main section */}
      <div className="container mx-auto max-w-6xl px-4 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* about course */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {course.description}
              </p>

              {/* tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {course.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <FaTag className="text-xs text-primary" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/*  Lessons */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Course Lessons
              </h2>
              <div className="text-sm text-gray-500 mb-3">
                {course.lessons?.length || 0} lessons • Total Duration:{" "}
                {course.lessons?.reduce(
                  (acc, curr) => acc + parseInt(curr.duration),
                  0
                )}{" "}
                mins (est)
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                {course.lessons?.map((lesson, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 hover:bg-gray-50 transition ${
                      idx !== course.lessons.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <FaPlayCircle className="text-primary text-xl shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {lesson.title}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements / Features (Static for design friendly) */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                This course includes:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <FaPlayCircle className="text-gray-400" />
                  <span>Lifetime access to lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCertificate className="text-gray-400" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-400" />
                  <span>Self-paced learning</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar Card */}
          <div className="relative">
            <div className="lg:absolute lg:-top-64 lg:right-0 w-full lg:w-[350px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-20">
              {/* Thumbnail */}
              <div className="relative h-48 w-full">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {/* Play icon */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 cursor-pointer">
                  <FaPlayCircle className="text-white text-5xl opacity-80" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-secondary">
                      ${course.price}
                    </span>
                    <span className="text-gray-400 line-through text-lg">
                      ${course.price * 2}
                    </span>
                    <span className="text-green-600 font-semibold text-sm">
                      50% Off
                    </span>
                  </div>
                  <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                    <FaClock /> 2 days left at this price!
                  </p>
                </div>

                <button
                  onClick={handleEnroll}
                  className="btn-primary py-3 px-4 w-full"
                >
                  Enroll Now
                </button>

                <p className="text-center text-xs text-gray-500">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
