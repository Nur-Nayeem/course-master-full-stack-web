import React from "react";
import { FaBars, FaLaptopCode } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
  ];
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full shadow-sm bg-gray-100 px-2.5 sm:px-0 py-3">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex flex-1 items-center gap-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <FaBars className="text-primary text-2xl hover:scale-105 cursor-pointer transition-all duration-300" />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-color bg-white rounded-box z-1 mt-3 w-52 p-4 space-y-3.5 shadow"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className="font-medium leading-normal text-secondary hover:text-primary"
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>
          <Link to={"/"} className="flex items-center gap-3 ">
            <FaLaptopCode className="text-3xl text-primary" />
            <h2 className="text-2xl font-bold hidden sm:block text-primary">
              Course Master
            </h2>
          </Link>
        </div>
        <div className="hidden flex-1  lg:flex items-center justify-center gap-9 ">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="font-medium leading-normal text-secondary hover:text-primary"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex-1 flex items-center gap-3.5 justify-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu className="hidden lg:block" />
                <div className="">
                  {/* Avatar */}
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={"/avater.svg"}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
              >
                {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="px-4 py-3 hover:text-primary transition font-semibold"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="px-4 py-3 hover:text-primary transition font-semibold"
                  >
                    Dashboard
                  </Link>
                )}

                <div
                  onClick={logout}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer hover:text-primary"
                >
                  Logout
                </div>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-white active:scale-95 transition-all duration-200 shadow-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
