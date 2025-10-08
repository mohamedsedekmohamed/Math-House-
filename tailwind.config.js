/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   TextFontLight: ["Light"],
      //   TextFontRegular: ["Regular"],
      //   TextFontMedium: ["Medium"],
      //   TextFontSemiBold: ["SemiBold"],
      //   TextFontBold: ["Bold"],
      // },
      colors: {
        mainColor: '#cf202f ',
        secoundColor: "#f7c6c5",
        thirdColor: "var(--color-third)",
        fourthColor: "#5E5E5E",

        one:"#BB2D3B",
two: "rgba(245, 245, 245, 1)",
three: "rgba(255, 255, 255, 1)",
four: "rgba(53, 53, 53, 1)",
  five:"#191D23",
  six:"#353535",
  seven:"#444444",
  eight:"#686868",
  nine:"#F5F5F5",

      },
      backgroundColor: {
        mainBgColor: "#E5E5E5",
        secoundBgColor: "#F5F5F5",
        thirdBgColor: "#F4F4F4",
        AddButton: "#ffffff",
      },
      screens: {
        sm: "320px", // Small devices (e.g., phones)
        md: "640px", // Medium devices (e.g., tablets)
        lg: "740px", // Large devices (small laptops)
        xl: "1280px", // Extra large devices (desktops)
        "2xl": "1536px", // Double extra large devices (larger desktops)
      },
    },
  },
  plugins: [],
};
