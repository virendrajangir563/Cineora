import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiFilm,
  FiHeart,
  FiChevronRight,
} from "react-icons/fi";

function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Create Account", path: "/signup" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://www.youtube.com/",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://www.facebook.com/",
    },
    {
      name: "X",
      icon: FaXTwitter,
      url: "https://x.com/",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#211547] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-6 pb-8 pt-12 sm:px-10 lg:px-14 lg:pt-16">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Logo and About */}
          <div>
            <NavLink to="/" className="inline-flex items-center">
              <img
                src="/cineora-logo-white.svg"
                alt="Cineora"
                className="h-10 w-auto object-contain"
              />
            </NavLink>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
              Your next movie experience awaits. Discover movies,
              explore theatres, and enjoy your favourite stories with Cineora.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-purple-500 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
              <FiFilm className="text-purple-300" size={16} />
              <span>Your movie night starts here</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-base font-semibold tracking-wide">
              Quick Links
            </h2>
            <div className="mb-5 mt-3 h-1 w-10 rounded-full bg-purple-400" />

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:translate-x-1 hover:text-purple-300"
                  >
                    <FiChevronRight
                      size={15}
                      className="text-purple-300 transition group-hover:translate-x-1"
                    />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-base font-semibold tracking-wide">
              Support
            </h2>
            <div className="mb-5 mt-3 h-1 w-10 rounded-full bg-purple-400" />

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:translate-x-1 hover:text-purple-300"
                  >
                    <FiChevronRight
                      size={15}
                      className="text-purple-300 transition group-hover:translate-x-1"
                    />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-base font-semibold tracking-wide">
              Get in Touch
            </h2>
            <div className="mb-5 mt-3 h-1 w-10 rounded-full bg-purple-400" />

            <div className="space-y-5 text-sm">
              <a
                href="mailto:support@cineora.com"
                className="group flex items-start gap-3 text-white/65 transition hover:text-purple-300"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-purple-300 transition group-hover:bg-purple-500/20">
                  <FiMail size={18} />
                </span>
                <span className="pt-1">
                  <span className="block text-xs text-white/40">Email us</span>
                  <span className="mt-1 block break-all">
                    support@cineora.com
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3 text-white/65">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-purple-300">
                  <FiPhone size={18} />
                </span>
                <span className="pt-1">
                  <span className="block text-xs text-white/40">
                    Customer support
                  </span>
                  <span className="mt-1 block">Here to help you</span>
                </span>
              </div>

              <div className="flex items-start gap-3 text-white/65">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-purple-300">
                  <FiMapPin size={18} />
                </span>
                <span className="pt-1">
                  <span className="block text-xs text-white/40">
                    Our experience
                  </span>
                  <span className="mt-1 block">
                    Movies, theatres &amp; memories
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter-style CTA */}
        <div className="mt-12 flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:p-7 lg:mt-16">
          <div>
            <h3 className="text-lg font-semibold">
              Ready for your next movie?
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Explore the latest movies and plan your next cinema experience.
            </p>
          </div>

          <NavLink
            to="/"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
          >
            Explore Movies
            <FiArrowUpRight size={18} />
          </NavLink>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-white/45">
            © {new Date().getFullYear()} Cineora. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-1.5 text-xs text-white/45">
            Made with <FiHeart className="text-pink-400" size={14} /> for movie lovers
            <span aria-hidden="true">🎬</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;