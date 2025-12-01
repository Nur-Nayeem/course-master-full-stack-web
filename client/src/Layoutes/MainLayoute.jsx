import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayoute = () => {
  return (
    <div className="bg-gray-100">
      <header>
        <Navbar />
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayoute;
