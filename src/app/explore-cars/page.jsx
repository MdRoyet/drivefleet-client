"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time filtering states connected to your backend query parameters
  const [search, setSearch] = useState("");
  const [carType, setCarType] = useState("");

  // Fetch cars from backend whenever search query or type changes
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // Constructing query string matching your backend route structure
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (carType) queryParams.append("carType", carType);

        const response = await fetch(
          `http://localhost:5000/api/cars?${queryParams.toString()}`,
        );
        const result = await response.json();

        if (result.success) {
          setCars(result.data);
        }
      } catch (error) {
        console.error("Failed to sync with vehicle backend registry:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce backend request slightly for performance optimizations
    const delayDebounceFn = setTimeout(() => {
      fetchCars();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, carType]);

  return (
    <div className="min-h-screen bg-[#0b0f19] bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#0b0f19] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Block Section */}
        <div className="text-center md:text-left mb-10 border-b border-white/5 pb-6">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Premium Fleet
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            Browse, filter, and lock in bookings for high-performance vehicles
            across standard, utility, and electric divisions.
          </p>
        </div>

        {/* 🛠️ Live Filter & Query Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-white/[0.02] border border-white/5 backdrop-blur-md p-4 rounded-2xl shadow-xl">
          {/* Input: Text Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by car model name... (e.g. Tesla)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          {/* Select: Dropdown Classification */}
          <div>
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1em",
              }}
            >
              <option value="" className="bg-[#111827]">
                All Categories
              </option>
              <option value="SUV" className="bg-[#111827]">
                SUV
              </option>
              <option value="Sedan" className="bg-[#111827]">
                Sedan
              </option>
              <option value="Hatchback" className="bg-[#111827]">
                Hatchback
              </option>
              <option value="Luxury" className="bg-[#111827]">
                Luxury
              </option>
              <option value="Electric" className="bg-[#111827]">
                Electric
              </option>
            </select>
          </div>
        </div>

        {/* 📦 Vehicle Cards Presentation Engine Grid */}
        {loading ? (
          /* Loading Core Grid Skeleton Frame */
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <span className="loading loading-spinner loading-lg text-primary mb-2"></span>
            <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">
              Querying active fleet entries...
            </p>
          </div>
        ) : cars.length === 0 ? (
          /* Empty Database Return Result Context Boundary */
          <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
            <p className="text-xl font-bold text-gray-400">
              No vehicle profiles identified
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Try relaxing your search terms or filter selection parameters.
            </p>
          </div>
        ) : (
          /* Render Active Responsive Data Matrix Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => {
              const isAvailable = car.availabilityStatus === "Available";

              return (
                <div
                  key={car._id}
                  className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:border-primary/40 hover:scale-[1.01] transition-all duration-300 relative"
                >
                  {/* CHANGE THE OLD SEMI-TRANSPARENT BADGE INSIDE EXPLORE CARS: */}
                  <div className="absolute top-4 right-4 z-20">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md backdrop-blur-md ${
                        isAvailable
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {car.availabilityStatus}
                    </span>
                  </div>

                  {/* TO THIS SOLID HIGH-CONTRAST BADGE SYSTEM: */}
                  <div className="absolute top-4 right-4 z-20">
                    <span
                      className={`text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xl border ${
                        isAvailable
                          ? "bg-emerald-600 text-white border-emerald-500"
                          : "bg-rose-600 text-white border-rose-500"
                      }`}
                    >
                      {car.availabilityStatus}
                    </span>
                  </div>

                  {/* Header Image Frame Preview */}
                  <div className="w-full h-52 relative overflow-hidden bg-white/5 border-b border-white/5">
                    <img
                      src={
                        car.imageUrl ||
                        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600"
                      }
                      alt={car.carName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600";
                      }}
                    />
                  </div>

                  {/* Internal Metadata Information Body Card Context */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Type Tag Heading row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h2 className="text-xl font-black text-white group-hover:text-primary transition-colors truncate">
                          {car.carName}
                        </h2>
                        <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded-md text-gray-400 font-bold border border-white/5 uppercase">
                          {car.carType}
                        </span>
                      </div>

                      {/* Displaying Core Metrics Breakdown parameters */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-400 font-medium my-4 border-y border-white/5 py-3">
                        <div className="flex items-center gap-1.5 truncate">
                          📍{" "}
                          <span className="truncate text-gray-300">
                            {car.pickupLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          👥{" "}
                          <span className="text-gray-300">
                            {car.seatCapacity} Seats
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          📊{" "}
                          <span className="text-gray-300">
                            {car.booking_count || 0} Bookings
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          💰{" "}
                          <span className="text-white font-bold">
                            ${car.dailyPrice}
                          </span>
                          /day
                        </div>
                      </div>

                      {/* Snippet Paragraph Excerpt description bounding */}
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-6">
                        {car.description}
                      </p>
                    </div>

                    {/* Operational Gateway Navigation Action Link Anchor */}
                    <div>
                      <Link
                        href={`/cars/${car._id}`}
                        className="w-full bg-white/5 hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 border border-white/10 hover:border-none text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md transform active:scale-[0.99]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
