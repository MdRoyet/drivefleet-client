"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cars");
        const result = await response.json();

        if (result.success) {
          // ⚡ CRITICAL FILTER: Extract only cars whose status is explicitly "Available"
          const readyToRent = result.data.filter(
            (car) => car.availabilityStatus === "Available",
          );

          // Show up to the top 6 or 8 featured available cars on the homepage grid
          setCars(readyToRent.slice(0, 6));
        }
      } catch (error) {
        console.error("Error communicating with vehicle cluster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCars();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center bg-[#0b0f19]">
        <span className="loading loading-spinner loading-lg text-primary mb-2"></span>
        <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">
          Loading available fleet...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#0b0f19] bg-gradient-to-b from-[#0f172a] to-[#0b0f19] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Live Fleet Inventory
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mt-3">
              Vehicles Ready{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                For The Road
              </span>
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              No wait times, no reservation delays. These high-performance
              configurations are fully prepped and available right now.
            </p>
          </div>

          <Link
            href="/explore-cars"
            className="text-sm font-bold text-primary hover:text-white transition-colors flex items-center gap-1 group mt-4 md:mt-0"
          >
            Browse Full Fleet{" "}
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Dynamic Presentation Grid Layout */}
        {cars.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
            <p className="text-lg font-bold text-gray-400">
              All vehicles are currently checked out
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Check back shortly or explore upcoming reservation tiers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-primary/40 hover:scale-[1.01] transition-all duration-300"
              >
                {/* Upper Thumbnail Image Frame */}
                <div>
                  <div className="w-full h-52 relative bg-white/5 overflow-hidden border-b border-white/5">
                    <img
                      src={car.imageUrl}
                      alt={car.carName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-md backdrop-blur-md">
                      Instant Rent
                    </span>
                  </div>

                  {/* Core Vehicle Specifications Module */}
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors truncate">
                        {car.carName}
                      </h3>
                      <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded-md text-gray-400 font-bold border border-white/5 uppercase">
                        {car.carType}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-gray-400 font-medium my-4 border-y border-white/5 py-3">
                      <div className="flex items-center gap-1 truncate">
                        📍{" "}
                        <span className="truncate text-gray-300">
                          {car.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        👥{" "}
                        <span className="text-gray-300">
                          {car.seatCapacity} Seats
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Interactive Footer Bar */}
                <div className="p-6 pt-0 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">
                      Daily Rental
                    </span>
                    <span className="text-2xl font-black text-white">
                      ${car.dailyPrice}
                    </span>
                    <span className="text-xs text-gray-400">/day</span>
                  </div>

                  <Link
                    href={`/cars/${car._id}`}
                    className="bg-primary hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
