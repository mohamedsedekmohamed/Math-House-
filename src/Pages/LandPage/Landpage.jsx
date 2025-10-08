import React from "react";
import { Outlet } from "react-router-dom";
import Navbarhome from "../LandPage/pages/Nav/Navbarhome";
import Footer from "../LandPage/pages/Footer/Footer";
import { FaWhatsapp } from "react-icons/fa";

const Landpage = () => {
  return (
    <div className="overflow-hidden max-w-screen">
      <Navbarhome />

      <Outlet />

      <div className="fixed z-10 flex flex-col gap-5 p-2 rounded-full bottom-4 right-4">
        <a
          href="https://wa.me/01005203244"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="w-12 h-12 text-green-500 transition hover:text-green-600" />
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Landpage;
