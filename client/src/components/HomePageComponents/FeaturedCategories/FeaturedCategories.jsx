import { FaCode, FaPaintBrush, FaMobileAlt, FaChartLine } from "react-icons/fa";

const FeaturedCategories = () => {
  const categories = [
    {
      name: "Web Development",
      icon: <FaCode className="text-3xl text-primary" />,
    },
    {
      name: "App Development",
      icon: <FaMobileAlt className="text-3xl text-primary" />,
    },
    {
      name: "Design & UI/UX",
      icon: <FaPaintBrush className="text-3xl text-primary" />,
    },
    {
      name: "Business & Marketing",
      icon: <FaChartLine className="text-3xl text-primary" />,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Featured Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-xl shadow hover:shadow-md transition-all p-6 flex flex-col items-center gap-3 cursor-pointer hover:-translate-y-1"
            >
              {cat.icon}
              <span className="text-gray-800 font-semibold text-lg">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
