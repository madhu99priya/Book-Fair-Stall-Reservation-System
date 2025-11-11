import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPinned,
  BookOpen,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content - 5 Columns in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo and Branding Section */}
          <div>
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg transition-all duration-500 flex-shrink-0 mb-4 w-fit">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Colombo International <br />
              <span className="text-blue-400">Book Fair</span>
            </h3>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Colombo - Sri Lanka.</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/event"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Event
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Photo Gallery
                </a>
              </li>
              <li>
                <a
                  href="/map"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Map
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Have a Questions Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Have a Questions?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">SLBPA</p>
                  <p className="text-gray-300">No: 83 New Parliament Rd,</p>
                  <p className="text-gray-300">Battaramulla, Sri Lanka.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+94112785480"
                  className="text-gray-300 hover:text-blue-400"
                >
                  +94 112 785 480
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:srilankabookpublishers@gmail.com"
                  className="text-gray-300 hover:text-blue-400 break-all"
                >
                  srilankabookpublishers@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Event Details Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Event Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    27<sup>th</sup> September to 06<sup>th</sup> October 2025
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">9.00 AM to 9.00 PM</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPinned className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">BMICH,</p>
                  <p className="text-gray-300">Bauddhaloka Mawatha,</p>
                  <p className="text-gray-300">Colombo 07.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us & Map Section - 5th Column */}
          <div>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.62976482633!2d79.872709!3d6.901672!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597f9d09a467%3A0xee0b9455e960eba5!2sBMICH%20(Bandaranaike%20Memorial%20International%20Conference%20Hall)!5e0!3m2!1sen!2sus!4v1762882020638!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#151d2b] py-4">
        <div className="container mx-auto px-6 text-center text-sm text-gray-400">
          <p>Copyright ©2025 All rights reserved | This web is made by SLBPA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
