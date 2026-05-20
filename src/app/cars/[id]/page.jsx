"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function CarDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");
  const [rentalDays, setRentalDays] = useState(1);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${params.id}`,
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

  const calculateTotalPrice = () => {
    if (!car) return 0;
    const baseCost = car.dailyPrice * rentalDays;
    const driverSurcharge = driverNeeded === "Yes" ? 25 * rentalDays : 0;
    return baseCost + driverSurcharge;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
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
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        toast.success(`Reservation locked in for ${car.carName}!`);
        router.push("/my-bookings");
      } else {
        toast.error(result.message || "Booking sequence rejected.");
      }
    } catch (error) {
      toast.error("Transaction interface failure.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-base-100 text-base-content">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 bg-gradient-to-br from-base-100 via-base-200 to-base-100 py-12 px-4 sm:px-6 lg:px-8 text-base-content">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Car Profile Details Visual Layout */}
        <div className="lg:col-span-7 bg-base-200/50 border border-base-content/10 p-6 rounded-3xl space-y-6">
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden relative border border-base-content/10">
            <img
              src={car.imageUrl}
              alt={car.carName}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute top-4 right-4 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md ${
                car.availabilityStatus === "Available"
                  ? "bg-success/20 text-success border border-success/30"
                  : "bg-error/20 text-error border border-error/30"
              }`}
            >
              {car.availabilityStatus}
            </span>
          </div>

          <div>
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-base-content/10 pb-4">
              <h1 className="text-3xl font-black tracking-tight">
                {car.carName}
              </h1>
              <span className="badge badge-primary font-bold px-4 py-3 text-primary-content uppercase text-xs tracking-wider">
                {car.carType}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-base-content/60 my-6">
              <div className="bg-base-200 border border-base-content/5 p-3 rounded-xl">
                📍 Location{" "}
                <p className="text-base-content font-bold mt-1 truncate">
                  {car.pickupLocation}
                </p>
              </div>
              <div className="bg-base-200 border border-base-content/5 p-3 rounded-xl">
                👥 Capacity{" "}
                <p className="text-base-content font-bold mt-1">
                  {car.seatCapacity} Seats
                </p>
              </div>
              <div className="bg-base-200 border border-base-content/5 p-3 rounded-xl">
                💰 Base Rate{" "}
                <p className="text-primary font-black mt-1">
                  ${car.dailyPrice}/Day
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-base-content/60">
                Description Overview
              </h3>
              <p className="text-sm text-base-content/85 leading-relaxed font-light">
                {car.description}
              </p>
            </div>
          </div>
        </div>

        {/* ⚡ RIGHT SIDE: EYE-CATCHING NEON ACCENTED BOOKING FORM CONTAINER */}
        <div className="lg:col-span-5 bg-base-200 border-2 border-primary shadow-[0_0_30px_rgba(59,130,246,0.15)] p-6 sm:p-8 rounded-3xl relative overflow-hidden">
          {/* Ambient Inner Light Cone glow element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="mb-6 relative z-10">
            <h2 className="text-2xl font-black text-base-content flex items-center gap-2">
              🚀 Secure <span className="text-primary">Instant Booking</span>
            </h2>
            <p className="text-xs text-base-content/60 mt-1">
              Configure your trip logs to verify rental processing files.
            </p>
          </div>

          <form
            onSubmit={handleBookingSubmit}
            className="space-y-6 relative z-10"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Selector: Driver Request parameter option element */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-base-content/80">
                  Driver Needed?
                </label>
                <select
                  value={driverNeeded}
                  onChange={(e) => setDriverNeeded(e.target.value)}
                  className="w-full bg-base-100 border-2 border-base-content/10 rounded-xl px-4 py-3 text-sm text-base-content font-bold focus:border-primary focus:outline-none transition-all cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1em",
                  }}
                >
                  <option value="No">
                    No (Self Drive)
                  </option>
                  <option value="Yes">
                    Yes (+$25/day)
                  </option>
                </select>
              </div>

              {/* Number Input: Trip Rental Time frame counter slider node */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-base-content/80">
                  Duration (Days)
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
                  className="w-full bg-base-100 border-2 border-base-content/10 rounded-xl px-4 py-3 text-sm text-base-content font-black text-center focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Custom Description Text Input field area box container */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-base-content/80">
                Special Instructions / Notes
              </label>
              <textarea
                placeholder="E.g. drop times, car seat configuration adjustments..."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full bg-base-100 border-2 border-base-content/10 rounded-xl px-4 py-3 text-sm text-base-content placeholder-base-content/30 focus:border-primary focus:outline-none h-24 resize-none leading-relaxed transition-all"
              ></textarea>
            </div>

            {/* 💰 DYNAMIC EYE-CATCHING COST SUMMARY CARD PANEL CONTAINER */}
            <div className="bg-gradient-to-r from-primary/20 via-purple-500/10 to-primary/20 border-2 border-primary/30 p-5 rounded-2xl flex items-center justify-between shadow-inner animate-pulse-slow">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-black">
                  Estimated Billing
                </p>
                <p className="text-[11px] text-base-content/60 mt-0.5 font-medium">
                  {rentalDays} Day(s) {driverNeeded === "Yes" && "• Driver Service Addon"}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-base-content/60 block -mb-1">
                  Amount Due:
                </span>
                <span className="text-3xl font-black tracking-tight text-base-content drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                  ${calculateTotalPrice()}
                </span>
              </div>
            </div>

            {/* Pulsing Action Gateway Action submission button pipeline node */}
            <div>
              <button
                type="submit"
                disabled={
                  bookingLoading || car.availabilityStatus !== "Available"
                }
                className="w-full bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-black tracking-widest rounded-xl py-4 text-xs uppercase transition-all shadow-xl shadow-primary/30 transform active:scale-[0.99] disabled:opacity-30 disabled:pointer-events-none"
              >
                {bookingLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : car.availabilityStatus !== "Available" ? (
                  "Vehicle Profile Unavailable"
                ) : (
                  "⚡ Complete Secure Booking Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
