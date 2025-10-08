import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contect = () => {
  const [form, setForm] = useState({
    title: "",
    email: "",
    phone: "",
    description: "",
  });

  const [status, setStatus] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://login.mathshouse.net/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ title: "", email: "", phone: "", description: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="relative" data-aos="fade-right">
          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=80"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">Get in Touch</h2>
          </div>
        </div>

        <div className="p-8 sm:p-12 flex flex-col justify-center" data-aos="fade-left">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Contact Us</h2>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Fill in the form below and we’ll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Your Name"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="phone" 
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Your Description"
              value={form.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-one text-white py-3 rounded-md font-medium hover:bg-one/85 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-green-600 mt-4 text-center">
              ✅ Your message has been sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 mt-4 text-center">
              ❌ Something went wrong. Please try again later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contect;
