import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-transparent py-12 lg:py-0">
      {/* CHANGED: Replaced bg-base-100 with bg-transparent on the wrapper above! */}

      {/* Animated Background Glows */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-primary mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary mix-blend-multiply filter blur-[128px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          {/* Small Top Badge */}
          <div className="inline-block px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
            <span className="text-primary font-bold tracking-wider text-sm uppercase">
              🚀 Redefining Mobility
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-base-content leading-[1.1]">
            Unleash Your <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-pulse">
              Ultimate Drive
            </span>
          </h1>

          <p className="text-lg text-base-content/75 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Experience the thrill of the open road with our exclusive fleet of
            top-tier vehicles. From luxury sedans to sleek sports cars, your
            perfect ride awaits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
            <Link
              href="/explore-cars"
              className="btn btn-primary btn-lg rounded-full px-10 border-none text-white shadow-[0_0_20px_rgba(var(--tw-colors-primary),0.4)] hover:scale-105 transition-all duration-300"
            >
              Explore Cars
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/login"
              className="btn btn-outline btn-lg rounded-full px-10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Right Content - Hero Image with Floating Glass Elements */}
        <div className="flex-1 relative w-full flex justify-center mt-10 lg:mt-0">
          {/* Main Image Container */}
          <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-lg aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group border border-base-content/10">
            <img
              src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop"
              alt="Luxury Black Car"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
            />
            {/* Subtle inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent"></div>
          </div>

          {/* Floating Glassmorphism Badge 1 (Top Left) */}
          <div className="absolute top-10 sm:top-16 lg:top-24 -left-4 sm:-left-12 lg:-left-16 bg-base-100/30 backdrop-blur-xl border border-base-content/10 p-4 rounded-2xl shadow-xl z-20 transition-transform hover:-translate-y-2 duration-300 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <p className="text-base-content font-extrabold text-lg">
                  4.9/5
                </p>
                <p className="text-base-content/70 text-[10px] font-bold uppercase tracking-widest">
                  Top Rated
                </p>
              </div>
            </div>
          </div>

          {/* Floating Glassmorphism Badge 2 (Bottom Right) */}
          <div className="absolute bottom-16 sm:bottom-24 lg:bottom-32 -right-4 sm:-right-8 lg:-right-12 bg-base-100/30 backdrop-blur-xl border border-base-content/10 p-4 rounded-2xl shadow-xl z-20 transition-transform hover:-translate-y-2 duration-300 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-xl">
                🚘
              </div>
              <div>
                <p className="text-base-content font-extrabold text-lg">150+</p>
                <p className="text-base-content/70 text-[10px] font-bold uppercase tracking-widest">
                  Premium Cars
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
