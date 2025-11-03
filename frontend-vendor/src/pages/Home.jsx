import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 text-gray-800">
      {/* Top Navigation */}
      <Navbar />

      <main className="mt-24">
        {/* ---------------- HOME SECTION ---------------- */}
        <section
          id="home"
          className="min-h-[530px] flex flex-col justify-center items-center text-center"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Colombo International Book Fair 2025
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mb-8">
            Welcome to the official online stall reservation portal for
            publishers and vendors. Reserve your stall, complete payments
            securely, and receive your QR confirmation instantly!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#registration"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Vendor Login
            </a>
            <a
              href="#registration"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Register
            </a>
          </div>
        </section>

        {/* ---------------- ABOUT SECTION ---------------- */}
        <section
          id="about"
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 text-center px-4"
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            About the Fair
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            The Colombo International Book Fair is Sri Lanka’s largest literary
            event, uniting authors, publishers, and book enthusiasts. Since its
            inception, it has become a hub for creativity, education, and
            culture — celebrating the written word in all its forms.
          </p>
        </section>

        {/* ---------------- EVENTS SECTION ---------------- */}
        <section
          id="events"
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100 text-center px-4"
        >
          <h2 className="text-4xl font-bold text-purple-700 mb-4">
            Events & Workshops
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Discover interactive sessions, panel discussions, and workshops
            featuring international and local authors. Join book launches,
            storytelling sessions, and art exhibitions that celebrate creativity
            and imagination.
          </p>
        </section>

        {/* ---------------- REGISTRATION SECTION ---------------- */}
        <section
          id="registration"
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-yellow-100 text-center px-4"
        >
          <h2 className="text-4xl font-bold text-pink-700 mb-4">
            Stall Registration
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-6">
            Interested in showcasing your books, art, or educational materials?
            Register now to book your stall at the Book Fair 2025. Limited slots
            available — secure yours early!
          </p>

          <a
            href="#"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Register Now
          </a>
        </section>

        {/* ---------------- CONTACT SECTION ---------------- */}
        <section
          id="contact"
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-100 to-blue-100 text-center px-4"
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-4">
            For inquiries, partnerships, or support, get in touch with our
            organizing team. We're here to assist you with any questions about
            stall reservations or event participation.
          </p>

          <div className="text-gray-700">
            <p>📧 info@bookfair2025.lk</p>
            <p>📞 +94 11 234 5678</p>
            <p>📍 BMICH, Colombo 07, Sri Lanka</p>
          </div>

          <footer className="mt-8 text-sm text-gray-500">
            © 2025 Colombo International Book Fair | Department of Electrical &
            Information Engineering
          </footer>
        </section>
      </main>
    </div>
  );
}
