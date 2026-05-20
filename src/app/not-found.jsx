"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070a13] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden text-white">
      {/* Ambient Cyberpunk Background Blur Fields */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Glassmorphic 404 Card Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 w-full max-w-lg bg-white/[0.01] backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 sm:p-12 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
      >
        {/* Top Floating Glow Ring Indicator */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-rose-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-rose-500/30 mb-8 shadow-inner animate-bounce-slow">
          <span className="text-4xl select-none">🗺️</span>
        </div>

        {/* High-Contrast Graphic Text Headers */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 leading-none">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-black text-white mt-4 tracking-tight">
          Lost in the <span className="text-primary">Fleet Grid?</span>
        </h2>

        {/* Friendly Error Message Copy Segment */}
        <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed max-w-md mx-auto mt-3 mb-8">
          The vehicle profile path or ledger terminal route you are attempting
          to process does not exist or has been relocated within our deployment
          framework.
        </p>

        {/* High-Visibility Navigation Action Control Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-black tracking-widest rounded-xl px-8 py-4 text-xs uppercase transition-all shadow-lg shadow-primary/20"
          >
            ⚡ Return To Operations Hub
          </Link>
        </motion.div>

        {/* Minimal Bottom Watermark Tag */}
        <div className="mt-10 pt-6 border-t border-white/5 text-[9px] text-white/20 select-none uppercase tracking-widest font-bold">
          DriveFleet Protocol Fault System
        </div>
      </motion.div>
    </div>
  );
}
