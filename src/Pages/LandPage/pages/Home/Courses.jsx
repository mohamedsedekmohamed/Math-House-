import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaBookOpen, FaListUl, FaRegFileAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import piccourse from "../../../../assets/Images/OIP.webp"
import { TfiReload } from "react-icons/tfi";

const Courses = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setLoading(true)
    axios
      .get("https://login.mathshouse.net/api/courses_lists")
      .then((response) => {
        setCourses(response.data.categories);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false)
      });
  }, []);

  return (
    <section className="py-12 bg-white lg:py-20">
    <section className="pb-6 overflow-hidden sm:grid sm:grid-cols-2">
  <div
    className="p-8 md:p-12 lg:px-16 lg:py-24"
    data-aos="fade-right"
    data-aos-duration="1000"
  >
    <div className="max-w-xl mx-auto text-center ltr:sm:text-left rtl:sm:text-right">
      <h2
        className="text-2xl font-bold text-one md:text-3xl"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Expand Your Knowledge
      </h2>

      <p
        className="text-gray-500 md:mt-4 md:block"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Our courses are meticulously categorized within the educational system
        framework, allowing you to efficiently select the program that aligns
        with your specific learning objectives
      </p>

      <div
        className="mt-4 md:mt-8"
        data-aos="zoom-in"
        data-aos-delay="600"
      >
        <button
  onClick={() =>
    document.getElementById("Cour").scrollIntoView({ behavior: "smooth" })
  }
  className="inline-block px-12 py-3 text-sm font-medium text-white transition rounded-sm bg-one hover:bg-one/75 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
>
Systems
</button>
      </div>
    </div>
  </div>

  <img
    alt="expand knowledge"
    src={piccourse}
    className="object-cover w-full h-56 sm:h-full"
    data-aos="fade-left"
    data-aos-duration="1000"
  />
</section>

      <section id="Cour" className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mx-auto mb-10 text-center max-w-prose" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
            <strong className="text-one"> Systems
 </strong>
          </h1>
          <p className="mt-3 text-sm text-gray-600 sm:text-base lg:text-lg">
            Discover our top categories and explore detailed courses tailored for you.
          </p>
        </div>

{
  loading?(   <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <TfiReload className="text-6xl animate-spin text-one" />
          </div>):(    <div className="grid gap-6 sm:grid-cols-2 ">
          {courses.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`, { state: cat })}
              data-aos="zoom-in"
              data-aos-delay={index * 100} 
              className="flex flex-col overflow-hidden transition-transform duration-300 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-xl hover:scale-105"
            >
              <img
                src={cat.category_image}
                alt={cat.category_name}
                className="object-cover w-full h-48 sm:h-56"
              />

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <FaFolderOpen className="flex-shrink-0 text-2xl text-one" />
                  <h2 className="text-lg font-bold leading-snug text-gray-800 sm:text-xl">
                    {cat.category_name}
                  </h2>
                </div>

                <p className="flex-1 text-sm text-gray-600 sm:text-base line-clamp-3">
                  {cat.category_description}
                </p>

                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaBookOpen className="text-one" /> {cat.course?.length || 0} Courses
                  </span>
                  <span className="flex items-center gap-1">
                    <FaListUl className="text-one" /> {cat.course?.reduce((acc, c) => acc + (c.chapters_count || 0), 0)} Chapters
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>)
}
    

      </section>
    </section>
  );
};

export default Courses;
