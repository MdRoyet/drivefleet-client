"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddCarPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    carName: "",
    dailyPrice: "",
    carType: "SUV",
    imageUrl: "",
    seatCapacity: "",
    pickupLocation: "",
    description: "",
    availabilityStatus: "Available",
  });

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to access the Add Car panel.");
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const carPayload = {
      ...formData,
      dailyPrice: parseFloat(formData.dailyPrice),
      seatCapacity: parseInt(formData.seatCapacity, 10),
      userEmail: session?.user?.email,
      booking_count: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carPayload),
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Car listing published successfully!");
        setFormData({
          carName: "",
          dailyPrice: "",
          carType: "SUV",
          imageUrl: "",
          seatCapacity: "",
          pickupLocation: "",
          description: "",
          availabilityStatus: "Available",
        });
        router.push("/explore-cars");
      } else {
        toast.error(result.message || "Failed to add vehicle profile.");
      }
    } catch (error) {
      toast.error("Network interface connection failure.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Common styling for our glassmorphism text fields (updated to dynamic, highly readable theme-aware styles)
  const inputClass =
    "w-full bg-base-100 border border-base-content/15 rounded-xl px-4 py-3 text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-inner";

  return (
    <div className="min-h-screen bg-base-100 bg-gradient-to-br from-base-100 via-base-200 to-base-100 py-12 px-4 sm:px-6 lg:px-8 text-base-content">
      <div className="max-w-3xl mx-auto bg-base-200/50 backdrop-blur-xl shadow-2xl rounded-3xl border border-base-content/10 p-6 sm:p-10 relative overflow-hidden">
        {/* Glow Effects Behind Form */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Block */}
        <div className="mb-10 border-b border-base-content/10 pb-6 relative z-10">
          <h1 className="text-3xl font-black tracking-tight text-base-content sm:text-4xl">
            Add a New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Car Listing
            </span>
          </h1>
          <p className="text-sm text-base-content/70 mt-2">
            Fill out the operational metrics below to publish a vehicle listing
            under your fleet portfolio.
          </p>
        </div>

        {/* Input Interactive Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field: Car Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
                Car Name
              </label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                placeholder="e.g., Tesla Model S"
                className={inputClass}
                required
              />
            </div>

            {/* Field: Daily Rent Price */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
                Daily Rent Price ($)
              </label>
              <input
                type="number"
                name="dailyPrice"
                value={formData.dailyPrice}
                onChange={handleChange}
                placeholder="e.g., 89"
                min="1"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field: Car Type */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
                Car Type
              </label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1em",
                }}
              >
                <option value="SUV" className="bg-base-200 text-base-content">
                  SUV
                </option>
                <option value="Sedan" className="bg-base-200 text-base-content">
                  Sedan
                </option>
                <option value="Hatchback" className="bg-base-200 text-base-content">
                  Hatchback
                </option>
                <option value="Luxury" className="bg-base-200 text-base-content">
                  Luxury
                </option>
                <option value="Crossover" className="bg-base-200 text-base-content">
                  Crossover
                </option>
                <option value="Electric" className="bg-base-200 text-base-content">
                  Electric
                </option>
              </select>
            </div>

            {/* Field: Seat Capacity */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
                Seat Capacity
              </label>
              <input
                type="number"
                name="seatCapacity"
                value={formData.seatCapacity}
                onChange={handleChange}
                placeholder="e.g., 5"
                min="1"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Field: Image URL */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Paste image address from imgbb or postimage hosting platforms"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field: Pickup Location */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="e.g., LAX Airport, Terminal 2"
                className={inputClass}
                required
              />
            </div>

            {/* Field: Availability Status */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
                Availability Status
              </label>
              <select
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1em",
                }}
              >
                <option value="Available" className="bg-base-200 text-base-content">
                  Available
                </option>
                <option value="Unavailable" className="bg-base-200 text-base-content">
                  Unavailable
                </option>
              </select>
            </div>
          </div>

          {/* ⚠️ FIXED & STYLIZED CONTAINER: Explicit vertical stacking layout ensures 0% overlap */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide information detailing performance characteristics, special rules, or extra amenities included..."
              className="w-full bg-base-100 border border-base-content/15 rounded-xl px-4 py-3 text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-inner h-32 resize-none leading-relaxed"
              required
            ></textarea>
          </div>

          {/* Glowing Action Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold tracking-wider rounded-xl py-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 transform active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center uppercase text-xs"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Publish Vehicle Listing"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
