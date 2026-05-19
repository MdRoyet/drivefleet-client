import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div
      className="w-full min-h-screen bg-fixed bg-cover bg-center relative"
      // Using a gorgeous, wide angle shot of a car for the background
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop')",
      }}
    >
      {/* Main wrapper with fixed background image */}

      {/* Dark overlay to make the background look transparent/watermarked and keep text readable */}
      <div className="absolute inset-0 bg-base-100/90 backdrop-blur-sm z-0"></div>

      {/* Content wrapper: relative and z-10 to sit above the dark overlay */}
      <div className="relative z-10">
        {/* Banner Section */}
        {/* Note: In Banner.jsx, make sure its main wrapper has 'bg-transparent' instead of 'bg-base-100' so it shows this new background! */}
        <Banner />

        {/* Available Cars Section Wrapper */}
        <div className="w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
                Available Cars
              </h2>
              <p className="text-base-content/70 max-w-2xl mx-auto">
                Choose from our premium selection of vehicles. Find the perfect
                ride for your next adventure.
              </p>
            </div>

            {/* Grid Container for the 6 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cards will populate here shortly... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
