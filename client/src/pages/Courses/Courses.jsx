import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CourseCard from "../../components/CoursesComponents/CourseCard/CourseCard";
import useAxios from "../../hooks/useAxios";
import ListingSceletonLoading from "../../components/CoursesComponents/ListingSceletonLoading";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const axiosInstance = useAxios();

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 12;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/courses", {
          params: { page, limit, search, category, sort },
        });

        // Ensure courses is an array
        const courseList = Array.isArray(res.data.courses)
          ? res.data.courses
          : [];

        setCourses(courseList);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
        alert("Failed to load courses");
      }
      setLoading(false);
    };

    fetchCourses();
  }, [axiosInstance, page, search, category, sort]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          All Courses
        </h2>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <label className="flex items-center bg-transparent max-w-md w-full px-4 h-12 rounded-xl border border-gray-300 focus-within:ring focus-within:ring-primary">
            <IoSearchSharp className="text-xl text-gray-500" />
            <input
              type="search"
              placeholder="Search by title or instructor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="ml-2 outline-none w-full"
            />
          </label>

          {/* Filters */}
          <div className="flex flex-col max-w-md w-full md:flex-row items-center gap-4">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl w-full border border-gray-300 focus:outline-none focus:ring focus:ring-primary"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl w-full border border-gray-300 focus:outline-none focus:ring focus:ring-primary"
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Business & Marketing">Business & Marketing</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && <ListingSceletonLoading />}

        {/* Courses Grid */}
        {!loading && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {courses.map((course, idx) => (
              <CourseCard key={course._id || idx} course={course} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <p className="text-center text-gray-500 py-10">No courses found.</p>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCoursesPage;
