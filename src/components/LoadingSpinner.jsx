"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner({
  message = "Syncing with data registry...",
}) {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-transparent relative overflow-hidden z-50">
      {/* Ambient background glow behind the spinner */}
      <div className="absolute w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="relative flex flex-col items-center gap-4">
        {/* Dual-ring highly scannable animated loading container */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary scale-125"></span>
          <span className="absolute inset-0 border-2 border-white/5 rounded-full scale-110"></span>
        </div>

        {/* Dynamic Descriptive Text Loader Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-xs font-black uppercase tracking-widest text-gray-400 drop-shadow-md select-none mt-2"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
