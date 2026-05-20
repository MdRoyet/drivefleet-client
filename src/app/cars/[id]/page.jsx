"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function CarDetailsPage({ params: paramsPromise }) {
  // Unwrap the dynamic route params safely
  const params = use(paramsPromise);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Booking specific form input states
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");
  const [rentalDays, setRentalDays] = useState(1);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cars/${params.id}`,
        );
        const result = await response.json();
        if (result.success) {
          setCar(result.data);
        } else {
          toast.error("Vehicle listing could not be found.");
        }
      } catch (error) {
        toast.error("Error communicating with data cluster.");
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [params.id]);

  // Dynamic cost aggregation logic helper
  const calculateTotalPrice = () => {
    if (!car) return 0;
    const baseCost = car.dailyPrice * rentalDays;
    const driverSurcharge = driverNeeded === "Yes" ? 25 * rentalDays : 0; // Flat $25/day driver addition fee
    return baseCost + driverSurcharge;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Verification check: force login execution loop if anonymous clicks submit
    if (!session) {
      toast.error("You must be logged in to execute a vehicle booking.");
      router.push("/login");
      return;
    }

    if (car.availabilityStatus !== "Available") {
      toast.error("This vehicle is currently un-operational or checked out.");
      return;
    }

    setBookingLoading(true);

    const bookingPayload = {
      carId: car._id,
      carName: car.carName,
      imageUrl: car.imageUrl,
      dailyPrice: car.dailyPrice,
      pickupLocation: car.pickupLocation,
      driverNeeded,
      specialNote,
      rentalDays: parseInt(rentalDays, 10),
      totalPrice: calculateTotalPrice(),
      userEmail: session.user.email,
      // Explore new Date() handling to format timestamps cleanly for standard UI presentation
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
        credentials: "include", // Carries cookie payload to verify ownership layers
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Reservation locked in for ${car.carName}!`);
        router.push("/my-bookings");
      } else {
        toast.error(
          result.message || "Booking sequence rejected by server node.",
        );
      }
    } catch (error) {
      toast.error("Transaction communication interface failure.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0b0f19]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0b0f19] text-gray-400">
        <p>Target vehicle configuration profile does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#0b0f19] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Visual Showcase and Metadata specifications Display card */}
        <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 rounded-3xl space-y-6">
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-white/5 relative">
            <img
              src={car.imageUrl}
              alt={car.carName}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute top-4 right-4 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md ${
                car.availabilityStatus === "Available"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
              }`}
            >
              {car.availabilityStatus}
            </span>
          </div>

          <div>
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-white/5 pb-4">
              <h1 className="text-3xl font-black tracking-tight">
                {car.carName}
              </h1>
              <span className="badge badge-primary font-bold px-4 py-3 text-white uppercase text-xs tracking-wider">
                {car.carType}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-400 my-6">
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                📍 Location{" "}
                <p className="text-white font-bold mt-1 truncate">
                  {car.pickupLocation}
                </p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                👥 Capacity{" "}
                <p className="text-white font-bold mt-1">
                  {car.seatCapacity} Seats
                </p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                💰 Base Rate{" "}
                <p className="text-primary font-black mt-1">
                  ${car.dailyPrice}/Day
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Description Overview
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {car.description}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Transactional Booking Processing Form */}
        <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-2xl font-black mb-1">
            Book This <span className="text-primary">Vehicle</span>
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Complete the routing configuration parameters below to execute
            rental files.
          </p>

          <form onSubmit={handleBookingSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Input: Select Driver Needed option */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Driver Needed?
                </label>
                <select
                  value={driverNeeded}
                  onChange={(e) => setDriverNeeded(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="No" className="bg-[#111827]">
                    No (Self Drive)
                  </option>
                  <option value="Yes" className="bg-[#111827]">
                    Yes (+$25/day)
                  </option>
                </select>
              </div>

              {/* Input: Rental Duration Horizon days counter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Rental Duration
                </label>
                <input
                  type="number"
                  min="1"
                  value={rentalDays}
                  onChange={(e) =>
                    setRentalDays(
                      Math.max(1, parseInt(e.target.value, 10) || 1),
                    )
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Input: Special Instructions Notes free-text box */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Special Instructions / Notes
              </label>
              <textarea
                placeholder="Specify preferred pickup arrival timing adjustments, optional child safety seats extensions, etc..."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary h-24 resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Dynamic Real-time Cost Estimation Dashboard Block display row */}
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center justify-between mt-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  Estimated Aggregates
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {rentalDays} Day(s) {driverNeeded === "Yes" && "+ Driver"}
                </p>
              </div>
              <p className="text-2xl font-black text-white">
                <span className="text-xs font-normal text-gray-400 mr-1">
                  Total:
                </span>
                ${calculateTotalPrice()}
              </p>
            </div>

            {/* Operational Form Trigger Submission Node action element button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={
                  bookingLoading || car.availabilityStatus !== "Available"
                }
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold tracking-widest rounded-xl py-3.5 text-xs uppercase transition-all shadow-lg active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
              >
                {bookingLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : car.availabilityStatus !== "Available" ? (
                  "Vehicle Unavailable"
                ) : (
                  "Confirm & Book Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
