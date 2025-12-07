import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayoute = () => {
  return (
    <div className="bg-gray-100">
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>
      <main className="pt-16 min-h-[calc(100vh-409px)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayoute;
