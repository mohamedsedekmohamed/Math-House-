import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronDown, FiChevronUp, FiBookOpen, FiX } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [openChapter, setOpenChapter] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // <-- للكورس اللي هيتفتح في Modal

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    axios
      .get("https://login.mathshouse.net/api/courses_lists")
      .then((response) => {
        const categories = response.data.categories;
        const found = categories.find((cat) => cat.id === parseInt(id));
        setCategory(found);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const toggleChapter = (id) => {
    setOpenChapter(openChapter === id ? null : id);
  };

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
               <TfiReload className="animate-spin text-6xl text-one" />
             </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div
        className="flex flex-col md:flex-row items-center gap-6 p-2"
        data-aos="fade-up"
      >
        <img
          src={category.category_image}
          alt={category.category_name}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl  text-one font-bold mb-4">{category.category_name}</h1>
          <p className="text-gray-600 leading-relaxed">
            {category.category_description}
          </p>
        </div>
      </div>

      <div>
        {category.course?.length === 0 ? (
          <p className="text-center text-gray-500">No courses available.</p>
        ):( <h2 className="text-2xl text-one font-semibold mb-4" data-aos="fade-right">
          Courses
        </h2>)}
       
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.course?.map((course, i) => (
            <div
                              onClick={() => setSelectedCourse(course)}

              key={course.id}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={course.course_image}
                alt={course.course_name}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-semibold text-one  line-clamp-1">
                  {course.course_name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {course.course_description}
                </p>

                {/* Price */}
                <span className="inline-block bg-indigo-100 text-one  text-sm font-medium px-3 py-1 rounded-full w-fit">
                  ${course.price}
                </span>

                {/* Open Modal */}
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="mt-3 px-3 py-2 bg-one  text-white rounded-lg text-sm font-medium hover:bg-one/80  transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Course Details */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50 p-8">
          <div className="bg-white rounded-xl shadow-xl p-2 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <FiX size={36} />
            </button>

            {/* Course Header */}
            <img
              src={selectedCourse.course_image}
              alt={selectedCourse.course_name}
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-one">
                {selectedCourse.course_name}
              </h2>
              <p className="text-gray-600">{selectedCourse.course_description}</p>
              <div className="flex gap-10">
                  <a
        href={`https://login.mathshouse.net/my_login/course/${selectedCourse.id}`}
        className="block w-full px-4 py-2 border border-one rounded-md text-one font-medium hover:bg-gray-100 transition mt-2"
      >
Buy ALL Courses      </a>
        <a
        href={`https://login.mathshouse.net/my_login/course/${selectedCourse.id}`}
        className="block w-full px-4 py-2 border border-one rounded-md text-one font-medium hover:bg-gray-100 transition mt-2"
      >
Select   Chapters    </a>
              </div>
              <span className="inline-block bg-indigo-100 text-one text-sm font-medium px-3 py-1 rounded-full">
                ${selectedCourse.price}
              </span>
              

              {/* Chapters */}
              <div className="mt-4 space-y-2"> 
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  <FiBookOpen className="w-5 h-5 text-one" />
                  Chapters ({selectedCourse.chapters_count})
                </h4>

                <div className="space-y-3">
                  {selectedCourse.chapters?.map((chapter, j) => (
                    <div
                      key={chapter.id}
                      className={`rounded-lg border transition-all duration-300 ${
                        openChapter === chapter.id
                          ? "bg-indigo-50 border-indigo-300 shadow-sm"
                          : "bg-white border-gray-200 hover:shadow"
                      }`}
                    >
                      {/* Chapter Header */}
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex justify-between items-center p-3 text-left"
                      >
                        <span className="font-medium text-gray-800">
                          {chapter.chapter_name}{" "}
                          <span className="text-sm text-one">
                            (${chapter.chapter_price})
                          </span>
                              <a
        href={`https://login.mathshouse.net/my_login/course/${selectedCourse.id}`}
        className=" p-1 m-1 border border-white rounded-4xl underline text-one font-medium hover:bg-gray-100 transition mt-2"
      >
Buy Now    </a>
                        </span>
                        {openChapter === chapter.id ? (
                          <FiChevronUp className="w-5 h-5 text-indigo-500" />
                        ) : (
                          <FiChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      {/* Lessons */}
                      {openChapter === chapter.id && (
                        <div className="p-3 pt-0">
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {chapter.lessons?.map((lesson) => (
                              <li
                                key={lesson.id}
                                className="leading-relaxed"
                              >
                                {lesson.lesson_name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
