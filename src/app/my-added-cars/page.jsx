"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyAddedCarsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // State to track which car is currently loaded into the editor modal
  const [editCar, setEditCar] = useState(null);

  // 1. Route Guard: Block unauthorized traffic
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to manage your fleet inventory.");
      router.push("/login");
    }
  }, [session, isPending, router]);

  // 2. Query data and filter by user email ownership parameters
  const fetchMyCars = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/cars");
      const result = await response.json();

      if (result.success) {
        const userOwnedInventory = result.data.filter(
          (car) => car.userEmail === session.user.email,
        );
        setCars(userOwnedInventory);
      }
    } catch (error) {
      toast.error("Failed to sync personal vehicle records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchMyCars();
  }, [session]);

  // 3. Delete Pipeline Handler
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you certain you want to permanently delete this car listing?",
    );
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Listing removed successfully.");
        setCars((prev) => prev.filter((car) => car._id !== id));
      } else {
        toast.error(result.message || "Failed to drop entry.");
      }
    } catch (error) {
      toast.error("Network interface connection error.");
    }
  };

  // 4. Update Save Handler
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPayload = {
        ...editCar,
        dailyPrice: parseFloat(editCar.dailyPrice),
        seatCapacity: parseInt(editCar.seatCapacity, 10),
      };

      const response = await fetch(
        `http://localhost:5000/api/cars/${editCar._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload),
          credentials: "include",
        },
      );
      const result = await response.json();

      if (result.success) {
        toast.success("Vehicle metrics updated successfully!");
        setCars((prev) =>
          prev.map((c) => (c._id === editCar._id ? editCar : c)),
        );
        setEditCar(null);
      } else {
        toast.error(result.message || "Update sequence rejected.");
      }
    } catch (error) {
      toast.error("Network communication failure.");
    }
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setEditCar((prev) => ({ ...prev, [name]: value }));
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0b0f19]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#0b0f19] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Block Section */}
        <div className="mb-10 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            My Added{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Cars Manager
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Supervise, update pricing parameters, or withdraw fleet entries you
            have published under your account profile.
          </p>
        </div>

        {/* Inventory Matrix Display Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
            <p className="text-xl font-bold text-gray-400">
              No managed listings identified
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Vehicles you publish inside the "Add Car" link interface appear
              here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-48 relative bg-white/5">
                    <img
                      src={car.imageUrl}
                      alt={car.carName}
                      className="w-full h-full object-cover"
                    />
                    {/* CHANGE THE OLD WEAK-CONTRAST TAG INSIDE MY ADDED CARS: */}
                    <span
                      className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        car.availabilityStatus === "Available"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {car.availabilityStatus}
                    </span>

                    {/* TO THIS IMMACULATE SOLID CONFIGURATION: */}
                    <span
                      className={`absolute top-4 right-4 text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xl border z-20 ${
                        car.availabilityStatus === "Available"
                          ? "bg-emerald-600 text-white border-emerald-500"
                          : "bg-rose-600 text-white border-rose-500"
                      }`}
                    >
                      {car.availabilityStatus}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="text-xl font-black text-white truncate">
                        {car.carName}
                      </h2>
                      <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded-md text-gray-400 font-bold border border-white/5 uppercase">
                        {car.carType}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mt-4 pt-3 border-t border-white/5">
                      <p>
                        💰 Price:{" "}
                        <span className="text-white font-bold">
                          ${car.dailyPrice}/day
                        </span>
                      </p>
                      <p className="text-right">
                        👥 Capacity:{" "}
                        <span className="text-white font-bold">
                          {car.seatCapacity} Seats
                        </span>
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-3">
                      📍 Location: {car.pickupLocation}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setEditCar(car)}
                    className="btn btn-outline btn-primary btn-sm rounded-xl font-bold tracking-wider uppercase text-xs h-10 min-h-0"
                  >
                    ✏️ Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="btn btn-error btn-outline btn-sm rounded-xl font-bold tracking-wider uppercase text-xs h-10 min-h-0"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🛠️ UPDATED INLINE EDITING MODAL LAYER */}
        {editCar && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[200]">
            <div className="bg-[#111827] border border-white/10 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-black mb-1">
                Update <span className="text-primary">Vehicle Metrics</span>
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Modify any parameters of your car listing below.
              </p>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                {/* Row 1: Car Name & Car Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Car Model Name
                    </label>
                    <input
                      type="text"
                      name="carName"
                      value={editCar.carName}
                      onChange={handleModalInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  {/* 🆕 Field Added: Car Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Car Type
                    </label>
                    <select
                      name="carType"
                      value={editCar.carType || "SUV"}
                      onChange={handleModalInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none cursor-pointer"
                    >
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
                      <option value="Crossover" className="bg-[#111827]">
                        Crossover
                      </option>
                      <option value="Electric" className="bg-[#111827]">
                        Electric
                      </option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Price & Seat Capacity */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Daily Rental Price ($)
                    </label>
                    <input
                      type="number"
                      name="dailyPrice"
                      value={editCar.dailyPrice}
                      onChange={handleModalInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Seat Capacity
                    </label>
                    <input
                      type="number"
                      name="seatCapacity"
                      value={editCar.seatCapacity}
                      onChange={handleModalInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Pickup Location & Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={editCar.pickupLocation}
                      onChange={handleModalInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Availability Status
                    </label>
                    <select
                      name="availabilityStatus"
                      value={editCar.availabilityStatus}
                      onChange={handleModalInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none cursor-pointer"
                    >
                      <option value="Available" className="bg-[#111827]">
                        Available
                      </option>
                      <option value="Unavailable" className="bg-[#111827]">
                        Unavailable
                      </option>
                    </select>
                  </div>
                </div>

                {/* 🆕 Row 4 Field Added: Image URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={editCar.imageUrl || ""}
                    onChange={handleModalInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                {/* Row 5: Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    Listing Description
                  </label>
                  <textarea
                    name="description"
                    value={editCar.description}
                    onChange={handleModalInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm h-24 resize-none focus:border-primary focus:outline-none"
                    required
                  ></textarea>
                </div>

                {/* Modal Controller Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setEditCar(null)}
                    className="btn btn-ghost btn-sm rounded-xl normal-case px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm rounded-xl normal-case px-6 text-white font-bold"
                  >
                    Save Changes
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
