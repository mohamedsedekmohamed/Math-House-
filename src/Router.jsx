import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Courses from "./Pages/DiaExam/Courses";
import Login from "./Pages/Authentication/Login";
import ProtectedLogin from "./ProtectedData/ProtectedLogin";
import Exam from "./Pages/DiaExam/Exam";
import ExamResult from "./Pages/DiaExam/ExamResult";
import SignUp from "./Pages/Authentication/SignUp";
import BuyChapter from "./Pages/DiaExam/BuyChapter";
import ForgetPassword from "./Pages/Authentication/ForgetPassword";

import Home from "./Pages/LandPage/pages/Home/Home";
import Aboutus from "./Pages/LandPage/pages/Home/Aboutus";
import Category from "./Pages/LandPage/pages/Home/Category";
import Contact from "./Pages/LandPage/pages/Home/Contect";
import Cou from "./Pages/LandPage/pages/Home/Courses";
import Exams from "./Pages/LandPage/pages/Home/Exams";
import Questions from "./Pages/LandPage/pages/Home/Questions";
import Landpage from "./Pages/LandPage/Landpage";
export const router = createBrowserRouter([
  {
    path: "",
    element: <Landpage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "About", element: <Aboutus /> },
      { path: "ContactUs", element: <Contact /> },
      { path: "category/:id", element: <Category /> },
      { path: "Systems", element: <Cou /> },
      { path: "exams", element: <Exams /> },
      { path: "questions", element: <Questions /> },
    ],
  },
  {
    path: "",
    element: <App />,
    children: [
      // Guest-only (auth pages)
      {
        path: "",
        element: <ProtectedLogin />, // checks if user exists → redirect to "/"
        children: [
          { path: "/login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
          { path: "forget_password", element: <ForgetPassword /> },
        ],
      },

      // Protected routes (require user login)
      {
        path: "",
        element: <ProtectedLogin />, // checks if !user → redirect to "/login"
        children: [
          {
            path: "courses",
            element: <Courses />,
          },
          {
            path: "exam/:courseId",
            element: <Exam />,
          },
          {
            path: "exam/results/:examId",
            element: <ExamResult />,
          },
          {
            path: "buy_chapters",
            element: <BuyChapter />,
          },
        ],
      },
    ],
  },
]);
