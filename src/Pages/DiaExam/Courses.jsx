// import React, { useEffect, useState } from 'react';
// import { useGet } from '../../Hooks/useGet';
// import { Link } from 'react-router-dom';
// import mainLogo from '../../assets/Images/mainLogo.png';

// const Courses = () => {
//     const apiUrl = import.meta.env.VITE_API_BASE_URL;
//     const { refetch: refetchList, loading: loadingList, data: dataList } = useGet({ url: `${apiUrl}/user/dia_exam/lists` });
//     const [diaList, setDiaList] = useState([]);

//     // Refetch courses when component mounts
//     useEffect(() => {
//         refetchList();
//     }, [refetchList]);

//     // Store the data in state
//     useEffect(() => {
//         if (dataList && !loadingList) {
//             setDiaList(dataList.courses || []);
//         }
//     }, [dataList, loadingList]);

//     // Show loading state
//     if (loadingList) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
//                 <div className="relative">
//           <div className="w-16 h-16 mx-auto mb-4 border-t-4 border-b-4 rounded-full animate-spin border-mainColor"></div>
//                     <p className="mt-4 font-medium text-gray-600">Loading Courses...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Show empty state if no courses are available
//     if (!diaList || diaList.length === 0) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
//                 <div className="p-6 text-center bg-white shadow-lg rounded-xl animate-fade-in">
//                     <img src={mainLogo} alt="Main Logo" className="h-24 mx-auto mb-4 opacity-80" />
//                     <p className="text-xl font-semibold text-gray-600">No Diagnostic Exams Available</p>
//                     <p className="mt-2 text-gray-500">Check back later for new courses!</p>
//                     <Link
//                         to="/"
//                         className="inline-block px-6 py-2 mt-4 text-white transition-colors rounded-lg bg-mainColor hover:bg-mainColor/90"
//                     >
//                         Back to Home
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-200 sm:px-6 lg:px-8">
//             <div className="mx-auto max-w-7xl">
//                 <h1 className="mb-12 text-3xl font-extrabold text-center md:text-4xl text-mainColor animate-fade-in">
//                     Explore Our Diagnostic Exam Courses
//                 </h1>
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                     {diaList.map((course) => (
//                         <Link
//                             key={course.id}
//                             to={`/exam/${course.id}`}
//                             className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg group rounded-2xl hover:-translate-y-2 hover:shadow-2xl"
//                         >
//                             <div className="relative h-56">
//                                 <img
//                                     src={course.image_link || mainLogo}
//                                     alt={course.course_name}
//                                     className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
//                                 />
//                                 <div className="absolute inset-0 flex items-end transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70">
//                                     <div className="w-full p-4">
//                                         <p className="text-lg font-semibold text-white line-clamp-2">
//                                             {course.course_name}
//                                         </p>
//                                         <p className="mt-1 text-sm text-gray-200 line-clamp-2">
//                                             Explore {course.course_name}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>

//             {/* Tailwind animation classes */}
//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fade-in {
//                     animation: fadeIn 0.6s ease forwards;
//                 }
//                 .line-clamp-2 {
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                     overflow: hidden;
//                 }
//                 .group:hover .text-mainColor {
//                     color: #1e40af; /* Slightly darker shade for hover */
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Courses;


import React, { useEffect, useState } from 'react';
import { useGet } from '../../Hooks/useGet';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/Images/mainLogo.png';
import Select from 'react-select';
import {
    FiSearch, FiCheck, FiHome, FiArrowRight
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const Courses = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchList, loading: loadingList, data: dataList } = useGet({ url: `${apiUrl}/user/dia_exam/lists` });
    const [diaList, setDiaList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const mainColor = '#cf202f';
    const secondColor = "#f7c6c5";

    useEffect(() => {
        refetchList();
    }, [refetchList]);

    useEffect(() => {
        if (dataList && !loadingList) {
            setDiaList(dataList.courses || []);
        }
    }, [dataList, loadingList]);

    const courseOptions = diaList.map(course => ({
        value: course.id,
        label: course.course_name,
        image: course.image_link || mainLogo,
    }));

    const CustomOption = ({ innerProps, label, data, isSelected }) => (
        <div
            {...innerProps}
            className={`p-4 flex items-center space-x-4 cursor-pointer transition-all duration-200 ${isSelected
                    ? 'bg-red-50 border-l-4'
                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                }`}
            style={{ borderLeftColor: isSelected ? mainColor : 'transparent' }}
        >
            <div className="relative flex-shrink-0">
                <img
                    src={data.image}
                    alt={label}
                    className="object-contain w-12 h-12 shadow-sm rounded-xl"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{label}</h3>
            </div>
            {isSelected && (
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-pink-200">
                    <FiCheck size={12} className="text-white" />
                </div>
            )}
        </div>
    );

    const handleCourseSelect = (selectedOption) => {
        setSelectedCourse(selectedOption);
    };

    if (loadingList) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-red-50">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-20 h-20 mx-auto border-t-4 border-b-4 rounded-full animate-spin border-mainColor"></div>
                    </div>
                    <p className="mt-4 font-medium text-gray-600">Loading Courses</p>
                    <p className="mt-1 text-sm text-gray-400">Preparing your learning experience</p>
                </div>
            </div>
        );
    }

    if (!diaList || diaList.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-red-50">
                <div className="max-w-md p-8 text-center">
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-3xl">
                        <HiOutlineAcademicCap size={48} className="text-red-600" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-800">No Courses Available</h3>
                    <p className="mb-6 leading-relaxed text-gray-500">
                        We're working on bringing you new diagnostic exams. Please check back soon for updates.
                    </p>
                    <Link
                        to="/courses"
                        className="inline-flex items-center px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-red-600 to-pink-200 rounded-xl hover:shadow-xl hover:scale-105"
                    >
                        <FiHome size={18} className="mr-2" />
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen px-4 py-8 overflow-hidden bg-gradient-to-br from-gray-50 to-red-50 sm:px-6 lg:px-8">
            <div className="flex flex-col h-full max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-mainColor">
                        Diagnostic Exams
                    </h1>
                    <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-600 md:text-md">
                        "Select a course to begin your diagnostic assessment and discover your learning path"
                    </p>
                </div>

                {/* Main Selection Card */}
                <div className="p-4 mb-4 bg-white border border-gray-100 shadow-xl rounded-2xl md:p-8">
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 shadow-md bg-gradient-to-r from-red-600 to-pink-200 rounded-xl">
                            <FiSearch size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Find Your Course</h2>
                            <p className="text-gray-500">Browse {diaList.length} available diagnostic exams</p>
                        </div>
                    </div>

                    <Select
                        options={courseOptions}
                        value={selectedCourse}
                        onChange={handleCourseSelect}
                        components={{
                            Option: CustomOption,
                        }}
                        placeholder={
                            <div className="flex items-center text-gray-400">
                                <FiSearch size={20} className="mr-3" />
                                Search for a course...
                            </div>
                        }
                        isSearchable={true}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>

                {/* Selected Course Card */}
                {selectedCourse && (
                    <div className="bg-gradient-to-r from-red-600 to-pink-200 rounded-2xl shadow-2xl p-4 mb-8 transform transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex flex-col justify-between space-y-6 lg:flex-row lg:items-center lg:space-y-0">
                            <div className="flex items-center space-x-6">
                                <div className="relative bg-white">
                                    <img
                                        src={selectedCourse.image}
                                        alt={selectedCourse.label}
                                        className="object-contain w-16 h-16 border-4 border-white shadow-2xl rounded-2xl border-opacity-20"
                                    />
                                    <div className="absolute bg-white -inset-2 bg-opacity-10 rounded-2xl blur-sm"></div>
                                </div>
                                <div className="text-white">
                                    <h3 className="mb-2 text-2xl font-bold">{selectedCourse.label}</h3>
                                </div>
                            </div>
                            <Link
                                to={`/exam/${selectedCourse.value}`}
                                className="inline-flex items-center px-8 py-4 text-lg font-bold text-red-600 transition-all duration-300 bg-white shadow-2xl rounded-xl hover:shadow-3xl hover:scale-105 group"
                            >
                                Start Exam
                                <FiArrowRight size={20} className="ml-2 transition-transform transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom styles for react-select */}
            <style jsx>{`
        :global(.react-select__control) {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 8px 12px;
          min-height: 60px;
          transition: all 0.3s ease;
          background: white;
          font-size: 16px;
        }
        :global(.react-select__control:hover) {
          border-color: #cf202f;
          box-shadow: 0 4px 20px rgba(207, 32, 47, 0.1);
        }
        :global(.react-select__control--is-focused) {
          border-color: #cf202f !important;
          box-shadow: 0 4px 25px rgba(207, 32, 47, 0.15) !important;
        }
        :global(.react-select__menu) {
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        :global(.react-select__option--is-selected) {
          background-color: #fef2f2 !important;
        }
        :global(.react-select__option--is-focused) {
          background-color: #f8fafc !important;
        }
      `}</style>
        </div>
    );
};

export default Courses;
