import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import math1 from "../../../../assets/Images/op.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import ParticlesBackground from "../../../Ui/ParticlesBackground";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Systems", path: "/systems" },
    { name: "Diagnostic", path: "/login" },
    { name: "Exams", path: "/exams" },
    { name: "Questions", path: "/questions" },
    { name: "Live", path: "https://login.mathshouse.net/my_login/live/my" },
    { name: "About ", path: "/About" },
    { name: "Contact us ", path: "/ContactUs" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 shadow-md " data-aos="fade-down">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div data-aos="fade-right">
            <Link to="/">
              <img src={math1} alt="Logo" className="h-20 pt-2 w-28 sm:w-36 md:w-40 lg:48 sm:h-24 md:h-28 lg:h-32" />
            </Link>
          </div>

          <div className="justify-center flex-1 hidden px-2 space-x-6 md:flex lg:space-x-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium  md:text-[11px] lg:text-[14px] transition duration-300 
                  ${
                    isActive(link.path)
                      ? "text-one after:w-full"
                      : "text-gray-700 hover:text-one after:w-0 hover:after:w-full"
                  }
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-one after:rounded after:transition-all after:duration-300
                `}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden space-x-3 md:flex " data-aos="fade-left">
            <a
              href="https://login.mathshouse.net/login"
              className="px-3 py-1 font-medium transition duration-300 border rounded-lg lg:px-5 lg:py-2 border-one text-one hover:bg-gray-100"
            >
              Login
            </a>
            <a
              href="https://login.mathshouse.net/sign_up"
              className="px-3 py-1 font-medium text-white transition duration-300 rounded-lg lg:px-5 lg:py-2 bg-one hover:bg-red-700"
            >
              Signup
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden" data-aos="fade-left">

<button
  onClick={() => setIsOpen(!isOpen)}
  className="text-gray-700 focus:outline-none"
>
  <AnimatePresence mode="wait" initial={false}>
    {isOpen ? (
      <motion.div
        key="close"
        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <HiX size={28} className="text-one" />
      </motion.div>
    ) : (
      <motion.div
        key="menu"
        initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <HiMenu size={28} className="text-one" />
      </motion.div>
    )}
  </AnimatePresence>
</button>

          </div>
        </div>
      </div>

    {isOpen && (
  <div
    className="absolute top-20 right-0 h-screen w-[80%] md:hidden shadow-lg overflow-hidden bg-transparent z-50"
  >
    {/* خلفية Particles */}
    <div className="absolute inset-0">
      <ParticlesBackground />
    </div>

    {/* المحتوى */}
    <div className="relative z-10 px-5 py-4 space-y-3">

      {navLinks.map((link, index) => (
        <Link
          key={link.name}
          to={link.path}
          onClick={() => setIsOpen(false)}
          className={`block px-3 py-2 rounded-md transition duration-300 relative font-medium 
            ${
              isActive(link.path)
                ? "text-one after:w-full"
                : "text-white hover:text-one after:w-0 hover:after:w-full"
            }
            after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-one after:rounded after:transition-all after:duration-300
          `}
        >
          {link.name}
        </Link>
      ))}

      <a
        href="https://login.mathshouse.net/login"
        className="block w-full px-4 py-2 mt-2 font-medium transition border border-white rounded-md text-one hover:bg-gray-100"
      >
        Log in
      </a>
      <a
        href="https://login.mathshouse.net/sign_up"
        className="block w-full px-4 py-2 mt-2 font-medium text-white transition rounded-md bg-one hover:bg-red-700"
      >
        Sign up
      </a>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
