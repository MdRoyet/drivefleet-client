"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AISearch() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  // Quick suggestion prompts to kickstart user interactions
  const suggestions = [
    "Electric models under $150 with 5 seats",
    "Luxury SUVs available for checkout",
    "Find a Sedan over in New York",
  ];

  const handleAISearchSubmit = async (e, forcedPrompt = null) => {
    if (e) e.preventDefault();
    const queryText = forcedPrompt || prompt;
    if (!queryText.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch("http://localhost:5000/api/cars/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: queryText }),
      });
      const result = await response.json();
      if (result.success) {
        setResults(result.data);
      }
    } catch (error) {
      console.error("AI Endpoint communication exception:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-transparent py-24 px-4 sm:px-8 border-t border-base-content/10 relative text-white text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header Row Content */}
        <div className="text-center md:text-left mb-12 max-w-2xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block">
            Next-Gen Discovery Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4">
            AI Fleet Concierge Search
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 font-medium">
            Skip manual dropdown filtering entirely. Type your exact travel
            goals, budget parameters, or spacing criteria in natural plain text.
          </p>
        </div>

        {/* 🛠️ THE AI TERMINAL INPUT BAR BOX PANEL */}
        <div className="w-full max-w-4xl bg-neutral-900/40 backdrop-blur-xl border-2 border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-2xl relative mb-12">
          {/* Cyan/Blue ambient corner light flare leak */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

          <form
            onSubmit={(e) => handleAISearchSubmit(e)}
            className="flex flex-col sm:flex-row gap-4 items-stretch"
          >
            <div className="relative flex-1">
              {/* Pulsing AI processing orb visual cue icon */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg animate-pulse">
                🤖
              </span>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask our concierge... (e.g., Show me high-end electric models under 200 dollars)"
                className="w-full bg-[#111827]/70 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary to-blue-600 text-white font-black tracking-widest rounded-xl px-8 py-4 text-xs uppercase shadow-lg shadow-primary/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-40"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>✨ Process Prompt</>
              )}
            </button>
          </form>

          {/* Quick-select click suggestion prompt pills row */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Quick Prompts:
            </span>
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(s);
                  handleAISearchSubmit(null, s);
                }}
                className="text-[11px] bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 rounded-lg px-3 py-1.5 font-medium transition-all text-gray-300 hover:text-white"
              >
                "{s}"
              </button>
            ))}
          </div>
        </div>

        {/* ==========================================
            AI SEARCH RESULTS SECTION DYNAMIC GRID
            ========================================== */}
        <AnimatePresence mode="wait">
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <span>🎯</span> Concierge Match Return ({results.length}{" "}
                  Profiles Identified)
                </h3>
                {results.length > 0 && (
                  <button
                    onClick={() => {
                      setResults([]);
                      setSearched(false);
                      setPrompt("");
                    }}
                    className="text-[10px] uppercase font-black tracking-wider text-rose-400 hover:underline"
                  >
                    Clear Workspace
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                /* No matching profiles empty boundary case state */
                <div className="text-center py-16 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
                  <p className="text-md font-bold text-gray-400">
                    The AI model couldn't pinpoint matching parameters
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Try relaxing terms (e.g., mention broad category names like
                    'SUV' or 'Electric').
                  </p>
                </div>
              ) : (
                /* Responsive Result Cards Array Layout Mapping */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((car) => {
                    const available = car.availabilityStatus === "Available";
                    return (
                      <motion.div
                        key={car._id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group bg-neutral-900/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-primary/40 transition-colors"
                      >
                        <div className="w-full h-44 relative bg-white/5 overflow-hidden border-b border-white/5">
                          <img
                            src={car.imageUrl}
                            alt={car.carName}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <span
                            className={`absolute top-3 right-3 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border shadow-md ${
                              available
                                ? "bg-emerald-600 text-white border-emerald-500"
                                : "bg-rose-600 text-white border-rose-500"
                            }`}
                          >
                            {car.availabilityStatus}
                          </span>
                        </div>

                        <div className="p-5 text-left flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <h4 className="text-md font-black text-white group-hover:text-primary transition-colors truncate">
                                {car.carName}
                              </h4>
                              <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded border border-white/5 text-gray-400 font-bold uppercase">
                                {car.carType}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] text-gray-400 border-y border-white/5 py-2 mb-3">
                              <span>📍 {car.pickupLocation}</span>
                              <span className="font-bold text-white">
                                ${car.dailyPrice}/day
                              </span>
                            </div>
                          </div>

                          <Link
                            href={`/cars/${car._id}`}
                            className="w-full bg-white/5 hover:bg-primary border border-white/10 hover:border-none text-white text-center font-black text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-all"
                          >
                            View Matching Spec Terminal
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
