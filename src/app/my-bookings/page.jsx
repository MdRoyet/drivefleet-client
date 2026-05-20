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
  const [cancelSubmitLoading, setCancelSubmitLoading] = useState(false);

  // ⚡ NEW STATE: Tracks which booking is actively loaded into the cancellation form modal
  const [cancellingBooking, setCancellingBooking] = useState(null);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view your active bookings.");
      router.push("/login");
    }
  }, [session, isPending, router]);

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

  useEffect(() => {
    if (session) fetchMyBookings();
  }, [session]);

  // ⚡ UPDATED: Final execution pipeline called exclusively from the confirmation modal form
  const executeCancellation = async (e) => {
    e.preventDefault(); // Intercept form submission
    if (!cancellingBooking) return;

    setCancelSubmitLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${cancellingBooking._id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );
      const result = await response.json();

      if (result.success) {
        // 🌟 TOAST NOTIFICATION: Triggered dynamically right after a successful cancel event
        toast.success(
          `Successfully cancelled reservation for ${cancellingBooking.carName}!`,
          {
            duration: 5000,
            position: "top-center",
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #f43f5e",
            },
          },
        );

        // Reactively update client state arrays
        setBookings((prev) =>
          prev.map((b) =>
            b._id === cancellingBooking._id
              ? { ...b, status: "Cancelled", refundStatus: "Fully Refunded" }
              : b,
          ),
        );

        // Dismiss the modal form
        setCancellingBooking(null);
      } else {
        toast.error(result.message || "Cancellation sequence rejected.");
      }
    } catch (error) {
      toast.error("Network communication interface fault.");
    } finally {
      setCancelSubmitLoading(false);
    }
  };

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
            Review live transaction receipts, booking schedules, or manage
            reservation cancellation procedures.
          </p>
        </div>

        {/* Presentation Grid List */}
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
              const isCancelled = booking.status === "Cancelled";

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
                  className={`bg-gradient-to-r from-[#131c30] to-[#1e293b] border-2 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch transition-all duration-300 relative ${
                    isCancelled
                      ? "border-rose-500/20 opacity-80"
                      : "border-white/5 hover:border-primary/40"
                  }`}
                >
                  {/* Left Side: Thumbnail Preview */}
                  <div className="w-full md:w-56 h-44 md:h-auto bg-black/20 flex-shrink-0 relative border-b md:border-b-0 md:border-r border-white/5">
                    <img
                      src={booking.imageUrl}
                      alt={booking.carName}
                      className={`w-full h-full object-cover ${isCancelled && "grayscale opacity-50"}`}
                    />
                  </div>

                  {/* Right Side: Information Controls Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2 max-w-md">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-black tracking-tight text-white">
                            {booking.carName}
                          </h3>

                          <span
                            className={`text-[10px] border px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest ${
                              isCancelled
                                ? "bg-rose-500/20 border-rose-400/40 text-rose-400"
                                : "bg-emerald-500/20 border-emerald-400/40 text-emerald-400"
                            }`}
                          >
                            {booking.status || "Confirmed"}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 font-semibold flex items-center gap-1.5">
                          {isCancelled
                            ? "❌ Cancelled Transaction Date:"
                            : "📆 Reservation Date:"}
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

                      {/* Action Trigger Elements */}
                      <div className="flex items-start md:justify-end">
                        {!isCancelled ? (
                          <button
                            /* ⚡ UPDATED: Pops up the modal state container instead of a block prompt alert */
                            onClick={() => setCancellingBooking(booking)}
                            className="btn btn-outline btn-error btn-xs rounded-xl px-4 h-9 min-h-0 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] transition-transform"
                          >
                            🚫 Cancel Trip
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-rose-400/60 flex items-center gap-1 bg-rose-500/5 px-3 py-1.5 rounded-xl border border-rose-500/10 select-none">
                            Unavailable for changes
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cost / Refund Summaries */}
                    {!isCancelled ? (
                      <div className="bg-black/30 border-2 border-white/10 px-6 py-3.5 rounded-xl flex items-center justify-between shadow-inner">
                        <span className="text-[10px] text-primary font-black uppercase tracking-widest">
                          Net Cost
                        </span>
                        <span className="text-2xl font-black text-white">
                          ${booking.totalPrice}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-rose-500/15 via-rose-500/5 to-rose-500/15 border-2 border-rose-500/40 px-6 py-3.5 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                        <div>
                          <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest flex items-center gap-1">
                            💰 Automatic Refund Issued
                          </p>
                          <p className="text-[11px] text-gray-400 font-normal mt-0.5">
                            Credited back to account wallet ledger
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-rose-400">
                            +${booking.totalPrice}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 🛠️ NEW: HIGH-CONTRAST INTERACTIVE CANCELLATION FORM MODAL */}
        {cancellingBooking && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[250] animate-fade-in">
            <div className="bg-[#111827] border-2 border-rose-500/30 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Top ambient alarming decorative red glow spot */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="mb-4 text-center sm:text-left">
                <span className="text-2xl mb-1 block">⚠️</span>
                <h3 className="text-xl font-black text-white">
                  Cancel Reservation for{" "}
                  <span className="text-rose-400">
                    {cancellingBooking.carName}
                  </span>
                  ?
                </h3>
              </div>

              {/* 📖 REFUND POLICY DETAIL SUMMARY TEXT BOX BOX */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 my-4 space-y-2 text-xs leading-relaxed text-gray-300">
                <p className="font-bold uppercase tracking-wider text-rose-400 text-[10px]">
                  Official Fleet Refund Policy:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>
                    A full 100% refund value of{" "}
                    <span className="text-white font-bold">
                      ${cancellingBooking.totalPrice}
                    </span>{" "}
                    will be instantly reversed.
                  </li>
                  <li>
                    Funds are returned directly to your associated platform
                    digital wallet profile ledger.
                  </li>
                  <li>
                    This operational withdrawal action is immediate, permanent,
                    and{" "}
                    <span className="text-rose-400 font-bold">
                      cannot be undone
                    </span>
                    .
                  </li>
                </ul>
              </div>

              {/* Action Form Confirmation Pipeline wrapper */}
              <form onSubmit={executeCancellation} className="space-y-4 pt-2">
                <p className="text-xs text-gray-400 text-center sm:text-left">
                  Are you certain you want to release this vehicle configuration
                  slot?
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setCancellingBooking(null)}
                    disabled={cancelSubmitLoading}
                    className="btn btn-ghost btn-sm rounded-xl normal-case h-11 min-h-0 text-gray-400 hover:bg-white/5 font-medium"
                  >
                    Keep Booking
                  </button>
                  <button
                    type="submit"
                    disabled={cancelSubmitLoading}
                    className="btn btn-error btn-sm rounded-xl normal-case h-11 min-h-0 text-white font-black tracking-wide shadow-md shadow-rose-900/40"
                  >
                    {cancelSubmitLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Yes, Cancel Trip"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
