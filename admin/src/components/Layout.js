import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiMap,
  FiBookOpen,
  FiMessageSquare,
  FiImage,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData, logout } from "../utils/auth";

const Layout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [router.pathname]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  // Navigation links
  const navLinks = [
    { href: "/dashboard", icon: <FiHome size={18} />, label: "Dashboard" },
    { href: "/destinations", icon: <FiMap size={18} />, label: "Destinations" },
    { href: "/tours", icon: <FiBookOpen size={18} />, label: "Tours" },
    {
      href: "/testimonials",
      icon: <FiMessageSquare size={18} />,
      label: "Testimonials",
    },
    { href: "/gallery", icon: <FiImage size={18} />, label: "Gallery" },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-slate-800 text-white p-2 rounded-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar transition-transform duration-300 ease-in-out ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } fixed md:static z-40 h-screen overflow-y-auto`}
      >
        <div className="sidebar-header">
          <h2 className="text-xl font-semibold tracking-tight">
            Odo Valley Admin
          </h2>
        </div>

        <nav className="sidebar-menu">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`sidebar-link ${
                    router.pathname === link.href ||
                    router.pathname.startsWith(link.href + "/")
                      ? "active"
                      : ""
                  }`}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              </li>
            ))}

            <li className="pt-4 mt-4 border-t border-slate-700">
              <a href="#" onClick={handleLogout} className="sidebar-link">
                <FiLogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content w-full md:ml-0">
        {user && (
          <header className="flex justify-end py-4 px-6 bg-white shadow-sm mb-6">
            <div className="text-sm font-medium">
              Logged in as:{" "}
              <span className="font-semibold text-blue-600">
                {user?.username || "Admin"}
              </span>
            </div>
          </header>
        )}

        <div className="px-6">{children}</div>
      </main>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Layout;
