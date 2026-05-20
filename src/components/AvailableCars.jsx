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
          // 1. Filter out unavailable profiles
          const readyToRent = result.data.filter(
            (car) => car.availabilityStatus === "Available",
          );

          // 2. ⚡ REMOVED THE SLICE: Stores all available listings from MongoDB
          setCars(readyToRent);
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
      <div className="py-24 flex flex-col items-center justify-center bg-transparent">
        <span className="loading loading-spinner loading-lg text-primary mb-2"></span>
        <p className="text-xs text-base-content/50 font-medium tracking-wider uppercase">
          Syncing live database inventory...
        </p>
      </div>
    );
  }

  return (
    /* ⚠️ SET TO bg-transparent: Blends beautifully into your page.jsx watermark layout background */
    <section className="bg-transparent py-16 px-4 sm:px-8 text-base-content">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-base-content/10 pb-6">
          <div className="text-left">
            <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Live Fleet Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight mt-3">
              Available Cars
            </h2>
            <p className="text-sm text-base-content/70 mt-2 max-w-xl">
              Choose from our premium selection of vehicles. Find the perfect
              ride for your next adventure.
            </p>
          </div>

          <Link
            href="/explore-cars"
            className="text-sm font-bold text-primary hover:text-primary-focus transition-colors flex items-center gap-1 group mt-4 md:mt-0"
          >
            Browse Full Fleet{" "}
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Dynamic Presentation Grid Mapping */}
        {cars.length === 0 ? (
          <div className="text-center py-16 bg-base-content/[0.02] border border-dashed border-base-content/10 rounded-3xl backdrop-blur-sm">
            <p className="text-lg font-bold text-base-content/60">
              All vehicles are currently checked out
            </p>
            <p className="text-xs text-base-content/40 mt-1">
              Check back shortly or explore upcoming reservation tiers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="group bg-base-100/40 backdrop-blur-md border border-base-content/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-primary/40 hover:scale-[1.01] transition-all duration-300"
              >
                {/* Upper Thumbnail Card Partition */}
                <div>
                  <div className="w-full h-52 relative bg-base-content/5 overflow-hidden border-b border-base-content/10">
                    <img
                      src={car.imageUrl}
                      alt={car.carName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-md backdrop-blur-md">
                      Instant Rent
                    </span>
                  </div>

                  {/* Core Specifications */}
                  <div className="p-6 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xl font-black text-base-content group-hover:text-primary transition-colors truncate">
                        {car.carName}
                      </h3>
                      <span className="text-[10px] bg-base-content/5 px-2.5 py-1 rounded-md text-base-content/60 font-bold border border-base-content/10 uppercase">
                        {car.carType}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-base-content/60 font-medium my-4 border-y border-base-content/10 py-3">
                      <div className="flex items-center gap-1 truncate">
                        📍{" "}
                        <span className="truncate text-base-content/80">
                          {car.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        👥{" "}
                        <span className="text-base-content/80">
                          {car.seatCapacity} Seats
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-base-content/60 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>
                </div>

                {/* Footer Dynamic Actions */}
                <div className="p-6 pt-0 flex items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] text-base-content/40 block uppercase font-bold tracking-wider">
                      Daily Rental
                    </span>
                    <span className="text-2xl font-black text-base-content">
                      ${car.dailyPrice}
                    </span>
                    <span className="text-xs text-base-content/60">/day</span>
                  </div>

                  <Link
                    href={`/cars/${car._id}`}
                    className="btn btn-primary btn-sm h-11 min-h-0 text-white font-bold text-xs uppercase tracking-wider px-5 rounded-xl transition-all shadow-md active:scale-[0.98]"
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
