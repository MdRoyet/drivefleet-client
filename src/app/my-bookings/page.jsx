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

  // 1. Route Guard: Block access for unauthenticated traffic
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view your active bookings.");
      router.push("/login");
    }
  }, [session, isPending, router]);

  // 2. Fetch bookings assigned to this user profile context email parameter
  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/my-bookings?email=${session.user.email}`,
          {
            credentials: "include", // Feeds authorization sessions forward
          },
        );
        const result = await response.json();

        if (result.success) {
          setBookings(result.data);
        } else {
          toast.error("Failed to map user transaction logs.");
        }
      } catch (error) {
        console.error("Network dashboard connection exception:", error);
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
    <div className="min-h-screen bg-[#0b0f19] bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#0b0f19] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Block Section */}
        <div className="mb-10 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            My Bookings{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Dashboard
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Track validation summaries, active execution parameters, and status
            receipts for your vehicle rentals.
          </p>
        </div>

        {/* Dynamic Card Presentation Grid Structure */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => {
              // ⚠️ NEW DATE EXPLORATION: Parsing string timestamps to produce beautiful, readable UI parameters
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
                  className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col sm:flex-row items-stretch transition-all duration-200 hover:border-white/20"
                >
                  {/* Left thumbnail subframe layout card partition */}
                  <div className="w-full sm:w-44 h-40 sm:h-auto bg-white/5 flex-shrink-0 relative border-b sm:border-b-0 sm:border-r border-white/5">
                    <img
                      src={booking.imageUrl}
                      alt={booking.carName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right metadata descriptive content layout card partition */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-black tracking-tight text-white">
                          {booking.carName}
                        </h3>
                        <span className="text-[9px] bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-emerald-400 font-bold uppercase tracking-widest">
                          {booking.status || "Confirmed"}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-400 font-medium mt-1">
                        🗓️ Booked:{" "}
                        <span className="text-gray-300 font-normal ml-0.5">
                          {formattedDate}
                        </span>
                      </p>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-gray-400 font-light mt-4 pt-3 border-t border-white/5">
                        <p>
                          ⏱️ Duration:{" "}
                          <span className="text-white font-medium">
                            {booking.rentalDays} Day(s)
                          </span>
                        </p>
                        <p>
                          🤵 Driver:{" "}
                          <span
                            className={`font-semibold ${booking.driverNeeded === "Yes" ? "text-primary" : "text-gray-400"}`}
                          >
                            {booking.driverNeeded}
                          </span>
                        </p>
                        <p className="col-span-2 truncate text-[11px] text-gray-500 mt-1 italic">
                          📝{" "}
                          {booking.specialNote
                            ? `"${booking.specialNote}"`
                            : "No custom notes designated."}
                        </p>
                      </div>
                    </div>

                    {/* Footer aggregate absolute validation row */}
                    <div className="flex justify-between items-center bg-white/[0.02] px-3 py-2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        Total Receipt
                      </span>
                      <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
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
