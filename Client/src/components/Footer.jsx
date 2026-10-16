
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-[#211547] text-white">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">

        {/* Logo and About */}
        <div>
          <NavLink to="/Home" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wide">
              🎬 CINEORA
            </span>
          </NavLink>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-300">
            Your next movie experience awaits. Discover movies,
            explore theatres, and enjoy your favourite stories with Cineora.
          </p>

          {/* Social Links */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-purple-600"
            >
              Instagram
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-purple-600"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-5 text-lg font-semibold">Quick Links</h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <NavLink to="/Home" className="hover:text-purple-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="hover:text-purple-300">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="hover:text-purple-300">
                Create Account
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="mb-5 text-lg font-semibold">Support</h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <NavLink to="/help" className="hover:text-purple-300">
                Help Center
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-purple-300">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy" className="hover:text-purple-300">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" className="hover:text-purple-300">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="mb-5 text-lg font-semibold">Get in Touch</h2>

          <div className="space-y-4 text-sm text-gray-300">
            <p>
              <span className="mr-2 text-purple-300">Email:</span>
              <a
                href="mailto:support@cineora.com"
                className="break-all hover:text-purple-300"
              >
                support@cineora.com
              </a>
            </p>

            <p>
              <span className="mr-2 text-purple-300">Phone:</span>
              Customer Support
            </p>

            <p>
              <span className="mr-2 text-purple-300">Location:</span>
              Movie experiences, all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-6 py-5 text-center text-sm text-gray-300 sm:flex-row sm:px-12">
          <p>
            &copy; {new Date().getFullYear()} Cineora. All rights reserved.
          </p>

          <p>Made for movie lovers 🎬</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
