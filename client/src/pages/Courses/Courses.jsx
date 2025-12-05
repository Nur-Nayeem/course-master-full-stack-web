import { use, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CourseCard from "../../components/CoursesComponents/CourseCard/CourseCard";
import ListingSceletonLoading from "../../components/CoursesComponents/ListingSceletonLoading";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { QueryContext } from "../../context/Contexts";

const AllCoursesPage = () => {
  const axiosInstance = useAxios();
  const { search, setSearch, category, setCategory } = use(QueryContext);

  // Filters
  const [sort, setSort] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 12;

  // Fetch courses using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", page, search, category, sort],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/courses", {
        params: { page, limit, search, category, sort },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 30, // 30 minute
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  });

  const courses = data?.courses || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="py-16">
      <title>All Courses</title>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          All Courses
        </h2>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <label className="flex items-center bg-transparent max-w-md w-full px-4 h-12 rounded-xl border border-primary/50 focus-within:ring focus-within:ring-primary">
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

          <div className="flex flex-col max-w-md w-full md:flex-row items-center gap-4">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl w-full border border-primary/50 focus:outline-none focus:ring focus:ring-primary"
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
              className="px-4 py-2 rounded-xl w-full border border-primary/50 focus:outline-none focus:ring focus:ring-primary"
            >
              <option value="">Select Category</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Business and Marketing">
                Business and Marketing
              </option>{" "}
            </select>
          </div>
        </div>

        {/* Loading */}
        {isLoading && <ListingSceletonLoading />}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-500 py-10">
            Failed to load courses: {error.message || "Unknown error"}
          </p>
        )}

        {/* Courses Grid */}
        {!isLoading && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && courses.length === 0 && (
          <p className="text-center text-gray-500 py-10">No courses found.</p>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-primary/60 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-primary/60 hover:bg-gray-100 disabled:opacity-50"
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
