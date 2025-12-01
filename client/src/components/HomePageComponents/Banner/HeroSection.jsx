// HeroSection.jsx
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="w-full bg-linear-to-r from-primary/10 to-primary/5 py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Text Section */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-secondary">
            Learn Anything,
            <span className="text-primary"> Anytime,</span>
            Anywhere.
          </h1>

          <p className="text-gray-600 text-lg">
            Explore thousands of high-quality courses from expert instructors.
            Upgrade your skills and build your future.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white shadow-md rounded-xl px-4 py-3 w-full max-w-lg">
            <FaSearch className="text-gray-500 text-xl" />
            <input
              type="text"
              placeholder="Search courses..."
              className="flex-1 ml-3 outline-none text-gray-700"
            />
          </div>

          {/* CTA Button */}
          <Link
            to="/courses"
            className="inline-block px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200"
          >
            Browse Courses
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 hidden lg:flex justify-end">
          <img
            src="/books.png"
            alt="Learning Illustration"
            className="w-[420px] rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
