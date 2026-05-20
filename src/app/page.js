import AvailableCars from "@/components/AvailableCars";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div
      className="w-full min-h-screen bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay to make the background look transparent/watermarked and keep text readable */}
      <div className="absolute inset-0 bg-base-100/90 backdrop-blur-sm z-0"></div>

      {/* Content wrapper: relative and z-10 to sit above the dark overlay */}
      <div className="relative z-10">
        {/* Banner Section (Ensure its wrapper class is set to bg-transparent) */}
        <Banner />

        {/* Available Cars Section */}
        <AvailableCars />
      </div>
    </div>
  );
}
