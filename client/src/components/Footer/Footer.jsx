import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Course Master</h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Learn anything, anytime. Join our community and boost your skills
            with high-quality online courses built by expert instructors.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white text-xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/courses?category=web" className="hover:text-white">
                Web Development
              </Link>
            </li>
            <li>
              <Link to="/courses?category=app" className="hover:text-white">
                App Development
              </Link>
            </li>
            <li>
              <Link to="/courses?category=design" className="hover:text-white">
                UI/UX Design
              </Link>
            </li>
            <li>
              <Link
                to="/courses?category=business"
                className="hover:text-white"
              >
                Business
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-4">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get the latest courses & updates in your inbox.
          </p>

          <div className="flex items-center bg-secondary rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 py-2 flex-1 outline-none text-gray-300"
            />
            <button className="bg-primary text-white px-4 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Course Master. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
