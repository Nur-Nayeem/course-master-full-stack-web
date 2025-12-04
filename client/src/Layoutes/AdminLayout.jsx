import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  ClipboardListIcon,
  LogOutIcon,
} from "lucide-react";
import { FaLaptopCode } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const nav = [
    { to: "/admin", label: "Overview", icon: <HomeIcon size={16} /> },
    {
      to: "/admin/courses",
      label: "Courses",
      icon: <BookOpenIcon size={16} />,
    },
    {
      to: "/admin/enrollments",
      label: "Enrollments",
      icon: <UsersIcon size={16} />,
    },
    {
      to: "/admin/assignments",
      label: "Assignments",
      icon: <ClipboardListIcon size={16} />,
    },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white border-r border-slate-100 transition-all duration-200 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-100">
          <Link to={"/"} className="flex items-center gap-3 ">
            <FaLaptopCode className="text-3xl text-primary" />
            {!collapsed && (
              <h2 className="text-2xl font-bold hidden sm:block text-primary">
                Course Master
              </h2>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-2 py-2 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                isActive(n.to)
                  ? "bg-indigo-50 text-primary font-medium"
                  : "text-secondary/90 hover:bg-slate-100"
              }`}
            >
              <div>{n.icon}</div>
              {!collapsed && <span>{n.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <button
            onClick={logout}
            className="my-3 w-full inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-sm text-secondary/60"
          >
            <LogOutIcon size={14} /> {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-2 py-6">
        <div className="max-w-full mx-auto relative">
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="absolute transition top-1 left-0"
          >
            <TbLayoutSidebarLeftCollapse className="text-3xl" />
          </button>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
