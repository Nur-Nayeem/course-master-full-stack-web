import CouresCard from "../../components/CoursesComponents/CourseCard/CourseCard";
import { populerCourses } from "../../data/AllCourses";
import { IoSearchSharp } from "react-icons/io5";

const AllCoursesPage = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          All Courses
        </h2>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <label className="input bg-transparent max-w-2xs w-full px-4 h-12 rounded-xl border border-gray-300 outline-0 focus:ring focus:ring-primary">
            <IoSearchSharp className="text-xl text-gray-500" />
            <input
              type="search"
              placeholder="Search by title or instructor..."
            />
          </label>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <select className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-primary">
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>

            <select className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-primary">
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Business & Marketing">Business & Marketing</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {populerCourses.map((course) => (
            <CouresCard key={course._id} course={course} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700">Page 1 of 5</span>

          <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllCoursesPage;
