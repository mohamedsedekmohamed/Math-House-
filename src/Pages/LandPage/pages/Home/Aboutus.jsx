import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Aboutus = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-12 bg-gray-50 min-h-screen max-w-screen ">
      {/* Header */}
      <div className="text-center mb-12 p-2" data-aos="fade-down">
        <h1 className="text-4xl md:text-5xl font-bold text-one mb-4">
          About Us
        </h1>
        <p className="text-gray-600 lg:max-w-2xl mx-auto">
          Welcome to our online learning platform, where education meets
          innovation. We provide high-quality courses designed to inspire,
          engage, and empower learners worldwide.
        </p>
      </div>

      {/* Mission & Vision */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-8 lg:px-16">
  {/* النص */}
  <div className="space-y-6" data-aos="fade-right">
    <h2 className="text-2xl md:text-3xl font-semibold text-one">
      Our Mission
    </h2>
    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
      Our mission is to make learning accessible for everyone by offering
      a wide variety of courses across different subjects. We believe that
      education is the key to personal growth, career development, and
      creating new opportunities in life.
    </p>

    <h2 className="text-2xl md:text-3xl font-semibold text-one">
      Our Vision
    </h2>
    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
      Our vision is to build a global community of learners and educators
      who share knowledge without boundaries. By combining technology and
      education, we aim to break barriers and ensure that high-quality
      learning is available anytime, anywhere.
    </p>
  </div>

  {/* الصورة */}
  <div className="flex justify-center" data-aos="fade-left">
    <img
      src="https://img.freepik.com/free-vector/business-team-concept-illustration_114360-6669.jpg"
      alt="About us"
      className="rounded-xl shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg"
    />
  </div>
</div>


      {/* Values */}
      <div className="mt-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center text-one mb-8">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-one mb-3">
              Innovation
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We constantly update and improve our content and teaching methods
              to deliver the best learning experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-one mb-3">
              Accessibility
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We believe education should be affordable and reachable for every
              student, regardless of their location.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-one mb-3">
              Quality
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our courses are designed by experienced educators to ensure
              accuracy, depth, and real-world relevance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-one mb-3">
              Community
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We strive to connect learners with teachers and peers, fostering
              collaboration and support throughout the learning journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
