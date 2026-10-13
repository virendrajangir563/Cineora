
import React, { useState } from "react";
import { Signup } from "../../services/Authapi";
import {
  TicketPercent,
  CreditCard,
  Crown,
  UserRound,
} from "lucide-react";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Input values handle karna
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Signup API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Confirm password backend ko nahi bhejna
      const data = {
        name,
        email,
        password: formData.password,
      };

      const response = await Signup(data);

      setSuccess(response.message || "Signup successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-bg-lavender p-3 sm:p-5">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-white sm:min-h-[calc(100dvh-2.5rem)]">

        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-subtle px-5 sm:px-8">
          <img
            src="/cineora-logo.svg"
            alt="Cineora"
            className="h-9 w-auto object-contain"
          />

          <a
            href="#"
            className="text-14 font-medium text-text-charcoal hover:text-text-purple"
          >
            Help
          </a>
        </header>

        {/* Main Content */}
        <main className="grid flex-1 grid-cols-1 items-center gap-8 px-6 py-6 lg:grid-cols-2 lg:gap-12 lg:px-12">

          {/* Left Section */}
          <section className="mx-auto w-full max-w-[500px]">
            <h1 className="text-28 font-semibold text-text-dark">
              Cineora Signup
            </h1>

            <p className="mt-1 text-16 text-text-charcoal">
              Join the Cineora community
            </p>

            {/* Offer 1 */}
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-text-purple/30 bg-bg-lavender/60 p-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-bg-white text-text-purple">
                <TicketPercent size={28} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-12 font-semibold tracking-wide text-text-purple">
                  WELCOME OFFER
                </p>
                <h2 className="mt-1 text-18 font-semibold text-text-dark">
                  Get 20% OFF on Your First Booking
                </h2>
                <p className="mt-1 text-13 leading-5 text-text-charcoal">
                  Book your first movie ticket and enjoy an exclusive welcome
                  discount. New users only!
                </p>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="mt-3 flex items-center gap-4 rounded-xl border border-border-muted bg-bg-white p-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-bg-lavender text-text-purple">
                <CreditCard size={28} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-12 font-semibold tracking-wide text-text-purple">
                  BANK CARD DEALS
                </p>
                <h2 className="mt-1 text-18 font-semibold text-text-dark">
                  Extra Savings on Movie Tickets
                </h2>
                <p className="mt-1 text-13 leading-5 text-text-charcoal">
                  Unlock eligible instant discounts and special deals with
                  participating bank credit and debit cards.
                </p>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="mt-3 flex items-center gap-4 rounded-xl border border-text-purple/30 bg-bg-lavender/60 p-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-bg-white text-text-purple">
                <Crown size={28} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-12 font-semibold tracking-wide text-text-purple">
                  CINEORA CLUB REWARDS
                </p>
                <h2 className="mt-1 text-18 font-semibold text-text-dark">
                  Every Booking Brings Rewards
                </h2>
                <p className="mt-1 text-13 leading-5 text-text-charcoal">
                  Earn reward points on eligible bookings and enjoy member-only
                  perks, exclusive offers, and special movie experiences.
                </p>
              </div>
            </div>
          </section>

          {/* Right Section: Signup Form */}
          <section className="mx-auto w-full max-w-[440px]">
            <div className="rounded-2xl border border-border-subtle bg-bg-white p-5 shadow-[0_8px_30px_rgba(35,18,104,0.10)] lg:p-6">

              <div className="mb-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-bg-lavender text-text-purple">
                  <UserRound size={24} strokeWidth={1.8} />
                </div>

                <h2 className="text-24 font-semibold text-text-dark">
                  Create your account
                </h2>

                <p className="mt-1 text-14 text-text-charcoal">
                  Join Cineora and make every movie special.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-14 font-medium text-text-charcoal"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="h-10 w-full rounded-lg border border-border-slate bg-bg-white px-3 text-14 text-text-dark outline-none placeholder:text-text-gray focus:border-text-purple focus:ring-2 focus:ring-text-purple/15"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-14 font-medium text-text-charcoal"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    required
                    className="h-10 w-full rounded-lg border border-border-slate bg-bg-white px-3 text-14 text-text-dark outline-none placeholder:text-text-gray focus:border-text-purple focus:ring-2 focus:ring-text-purple/15"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-14 font-medium text-text-charcoal"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-10 w-full rounded-lg border border-border-slate bg-bg-white px-3 text-14 text-text-dark outline-none placeholder:text-text-gray focus:border-text-purple focus:ring-2 focus:ring-text-purple/15"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-14 font-medium text-text-charcoal"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-10 w-full rounded-lg border border-border-slate bg-bg-white px-3 text-14 text-text-dark outline-none placeholder:text-text-gray focus:border-text-purple focus:ring-2 focus:ring-text-purple/15"
                  />
                </div>

                {/* API Error */}
                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}

                {/* API Success */}
                {success && (
                  <p role="status" className="text-sm text-green-600">
                    {success}
                  </p>
                )}

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-11 w-full rounded-lg bg-text-purple text-16 font-semibold text-text-white shadow-md shadow-text-purple/20 transition-colors hover:bg-text-deep-purple disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              <p className="mt-4 text-center text-14 text-text-charcoal">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-text-purple hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SignupPage;
