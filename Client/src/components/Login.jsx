
import { NavLink } from 'react-router-dom';
import {
  UserRound,
  TicketPercent,
  CreditCard,
  Crown,
  ArrowRight,
  LockKeyhole,
} from 'lucide-react';

function Login() {
  return (
    <div className="h-dvh overflow-hidden bg-bg-lavender p-3 sm:p-5">
      <div className="mx-auto flex h-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-white">


        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-subtle px-5 sm:px-8">
          <img
            src="/cineora-logo.svg"
            alt="Cineora"
            className="h-9 w-auto object-contain"
          />

          <NavLink
            to="/help"
            className="text-14 font-medium text-text-charcoal hover:text-text-purple"
          >
            Help
          </NavLink>
        </header>


        <main className="grid min-h-0 flex-1 grid-cols-2 items-center gap-6 overflow-hidden px-6 py-4 lg:gap-12 lg:px-12">


          <section className="mx-auto w-full max-w-[500px]">
            <h1 className="text-28 font-semibold text-text-dark">
              Welcome Back!
            </h1>

            <p className="mt-2 text-16 text-text-charcoal">
              Your next movie experience awaits.
            </p>

            
            <div className="mt-6 flex items-center gap-4 rounded-xl border border-text-purple/30 bg-bg-lavender/60 p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-bg-white text-text-purple">
                <TicketPercent size={28} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-12 font-semibold tracking-wide text-text-purple">
                  CINEORA EXCLUSIVE
                </p>
                <h2 className="mt-1 text-18 font-semibold text-text-dark">
                  Get 20% OFF on First Booking
                </h2>
                <p className="mt-1 text-13 leading-5 text-text-charcoal">
                  Enjoy special discounts on your first movie ticket booking.
                </p>
              </div>
            </div>


            <div className="mt-4 flex items-center gap-4 rounded-xl border border-border-muted bg-bg-white p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-bg-lavender text-text-purple">
                <CreditCard size={28} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-18 font-semibold text-text-dark">
                  FLAT CASHBACK
                </h2>
                <p className="text-14 font-medium text-text-charcoal">
                  on Bank Cards
                </p>
                <p className="mt-1 text-13 leading-5 text-text-charcoal">
                  Save more with offers on leading credit and debit cards.
                </p>
              </div>
            </div>

            
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-text-purple/30 bg-bg-lavender/60 p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-bg-white text-text-purple">
                <Crown size={28} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-12 font-semibold tracking-wide text-text-purple">
                  CINEORA CLUB REWARDS
                </p>
                <h2 className="mt-1 text-18 font-semibold text-text-dark">
                  Rewards Await!
                </h2>
                <p className="mt-1 text-13 leading-5 text-text-charcoal">
                  Earn points, unlock exclusive access, and enjoy early bookings.
                </p>
              </div>
            </div>
          </section>

          
          <section className="mx-auto w-full max-w-[440px]">
            <div className="rounded-2xl border border-border-subtle bg-bg-white p-6 shadow-[0_8px_30px_rgba(35,18,104,0.10)] lg:p-8">

              
              <div className="mb-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-lavender text-text-purple">
                  <UserRound size={25} strokeWidth={1.8} />
                </div>

                <h2 className="text-28 font-semibold text-text-dark">
                  Login to your account
                </h2>

                <p className="mt-2 text-14 text-text-charcoal">
                  Welcome back! Enter your details to continue.
                </p>
              </div>

              
              <div className="space-y-5">

                {/* Email */}
                <div>
                  <label className="mb-2 block text-14 font-medium text-text-charcoal">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-lg border border-border-slate bg-bg-white px-4 text-14 text-text-dark outline-none transition placeholder:text-text-gray focus:border-text-purple focus:ring-2 focus:ring-text-purple/15"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-14 font-medium text-text-charcoal">
                      Password
                    </label>

                    <a
                      href="#"
                      className="text-13 font-medium text-text-purple hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-lg border border-border-slate bg-bg-white px-4 pr-12 text-14 text-text-dark outline-none transition placeholder:text-text-gray focus:border-text-purple focus:ring-2 focus:ring-text-purple/15"
                    />

                    <LockKeyhole
                      size={18}
                      strokeWidth={1.7}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-gray"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <label className="flex cursor-pointer items-center gap-2 text-14 text-text-charcoal">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#6444e4]"
                  />
                  Remember me
                </label>

                {/* Login Button */}
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-text-purple text-16 font-semibold text-text-white shadow-md shadow-text-purple/20 transition-colors hover:bg-text-deep-purple"
                >
                  Login
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Register Link */}


              <p className="mt-4 text-center text-14 text-text-charcoal">
                Don't have an account?{' '}
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `font-semibold transition-colors ${isActive
                      ? 'text-text-deep-purple'
                      : 'text-text-purple hover:underline'
                    }`
                  }
                >
                  Sign up
                </NavLink>
              </p>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Login;