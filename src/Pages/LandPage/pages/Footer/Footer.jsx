import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTiktok,
  FaFacebookSquare,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {/* CONTACT */}
      <div data-aos="fade-up">
        <h3 className="text-lg font-bold mb-4">CONTACT</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3 hover:text-one transition">
            <FaPhoneAlt className="text-one" />
            <a href="tel:01005203244">+201005203244</a>
          </li>
          <li className="flex items-center gap-3 hover:text-one transition">
            <FaWhatsapp className="text-one" />
            <a href="https://wa.me/201005203244" target="_blank" rel="noopener noreferrer">
              WhatsApp Chat
            </a>
          </li>
          <li className="flex items-center gap-3 hover:text-one transition">
            <FaEnvelope className="text-one" />
            <a href="mailto:info@mathshouse.net">info@mathshouse.net</a>
          </li>
          <li className="flex items-center gap-3 hover:text-one transition">
            <FaMapMarkerAlt className="text-one" />
            <span>Egypt,ALex,Janklees</span>
          </li>
        </ul>
      </div>

      {/* COMPANY */}
      <div data-aos="fade-up" data-aos-delay="100">
        <h3 className="text-lg font-bold mb-4">COMPANY</h3>
        <ul className="space-y-3 text-sm">
          {[
            { name: "Exams", path: "/exams" },
            { name: "Questions", path: "/questions" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact-us" },
          ].map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-one hover:pl-1 transition block"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SOCIAL LINKS */}
      <div data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-lg font-bold mb-4">JOIN US</h3>
        <div className="space-y-3 text-sm">
          <a
            href="https://www.tiktok.com/@mramirhemaida"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <FaTiktok className="text-one w-5 h-5 md:w-6 md:h-6" />
            <span>TikTok</span>
          </a>

          <a
            href="https://www.facebook.com/people/Maths-House-SAT-WAY/61577409492649/?sk=reels_tab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FaFacebookSquare className="text-one w-5 h-5 md:w-6 md:h-6" />
            <span>Facebook</span>
          </a>

          <a
            href="https://wa.me/201005203244"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-500 transition"
          >
            <FaWhatsapp className="text-one w-5 h-5 md:w-6 md:h-6" />
            <span>WhatsApp</span>
          </a>

          <a
            href="https://www.youtube.com/@MathsHouse244/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-red-600 transition"
          >
            <FaYoutube className="text-one w-5 h-5 md:w-6 md:h-6" />
            <span>YouTube</span>
          </a>
        </div>
      </div>

      {/* MOBILE APPS */}
      <div data-aos="fade-up" data-aos-delay="400">
        <h3 className="text-lg font-bold mb-4">MOBILE</h3>
        <div className="space-y-4">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-red-200 shadow-md px-5 py-3 text-one hover:bg-red-50 transition"
          >
            <FaApple className="text-2xl" />
            <div>
              <p className="font-semibold">App Store</p>
              <p className="text-sm text-gray-500">Available now</p>
            </div>
          </a>

          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-red-200 shadow-md px-5 py-3 text-one hover:bg-red-50 transition"
          >
            <FaGooglePlay className="text-2xl" />
            <div>
              <p className="font-semibold">Google Play</p>
              <p className="text-sm text-gray-500">Available now</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
