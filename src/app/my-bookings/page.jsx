"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view your active bookings.");
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/my-bookings?email=${session.user.email}`,
          {
            credentials: "include",
          },
        );
        const result = await response.json();

        if (result.success) {
          setBookings(result.data);
        } else {
          toast.error("Failed to map user transaction logs.");
        }
      } catch (error) {
        console.error("Network connection failure:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchMyBookings();
  }, [session]);

  if (isPending || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0b0f19]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#0b0f19] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header Block Section */}
        <div className="mb-10 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            My Bookings{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Ledger
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Review live transaction receipts, booking schedules, and operational
            checkouts.
          </p>
        </div>

        {/* Presentation Grid Container Block node element array */}
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
            <p className="text-xl font-bold text-gray-400">
              No active bookings identified
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Browse our public fleet selection directory to schedule your first
              reservation entry.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const formattedDate = new Date(
                booking.bookingDate,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={booking._id}
                  className="bg-gradient-to-r from-[#131c30] to-[#1e293b] border-2 border-white/5 hover:border-primary/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch transition-all duration-300 relative"
                >
                  {/* Left Side: Thumbnail Preview Element Box module */}
                  <div className="w-full md:w-56 h-44 md:h-auto bg-black/20 flex-shrink-0 relative border-b md:border-b-0 md:border-r border-white/5">
                    <img
                      src={booking.imageUrl}
                      alt={booking.carName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right Side: High Contrast Receipt Form Ledger Breakdowns Info Panel container */}
                  <div className="p-6 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-md">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black tracking-tight text-white">
                          {booking.carName}
                        </h3>
                        <span className="text-[10px] bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-400 font-black uppercase tracking-widest">
                          {booking.status || "Confirmed"}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 font-semibold flex items-center gap-1.5">
                        📆 Reservation Date:{" "}
                        <span className="text-gray-200 font-bold">
                          {formattedDate}
                        </span>
                      </p>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-300 pt-3 border-t border-white/5 font-medium">
                        <p>
                          ⏱️ Rental Frame:{" "}
                          <span className="text-primary font-black">
                            {booking.rentalDays} Days
                          </span>
                        </p>
                        <p>
                          🤵 Driver Surcharge:{" "}
                          <span
                            className={
                              booking.driverNeeded === "Yes"
                                ? "text-purple-400 font-black"
                                : "text-gray-500 font-bold"
                            }
                          >
                            {booking.driverNeeded}
                          </span>
                        </p>
                        {booking.specialNote && (
                          <p className="col-span-2 text-[11px] text-gray-400 bg-black/20 px-3 py-2 rounded-xl mt-2 border border-white/5 truncate font-normal italic">
                            "{booking.specialNote}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 💰 EXTRA HIGH VISIBILITY RECEIPT TOTAL VALUE CONTAINER PILL */}
                    <div className="bg-black/30 border-2 border-white/10 px-6 py-4 rounded-xl flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-1 sm:text-center min-w-[140px] shadow-inner">
                      <span className="text-[10px] text-primary font-black uppercase tracking-widest">
                        Net Cost
                      </span>
                      <span className="text-3xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                        ${booking.totalPrice}
                      </span>
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
