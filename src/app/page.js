import AvailableCars from "@/components/AvailableCars";
import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

import SubscriptionPlans from "@/components/sections/SubscriptionPlans";
import AISearch from "@/components/sections/AISearch";

export default function Home() {
  return (
    <div
      className="w-full min-h-screen bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop')",
      }}
    >
      {/* Dark tint wallpaper overlay protection filter mask */}
      <div className="absolute inset-0 bg-base-100/90 backdrop-blur-sm z-0"></div>

      {/* Content Layer container stack */}
      <div className="relative z-10">
        {/* Hero Branding Area */}
        <Banner />

        {/* Live Inventory Operations Component Matrix */}
        <AvailableCars />

        {/* AI Search */}

        <AISearch></AISearch>

        {/* Static Feature Breakdown Component */}
        <WhyChooseUs />

        {/* Subscription Plan */}
        <SubscriptionPlans></SubscriptionPlans>
      </div>
    </div>
  );
}
