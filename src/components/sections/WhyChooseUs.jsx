"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhyChooseUs() {
  // Active state to drive the premium interactive policy matrix tabs
  const [activeTab, setActiveTab] = useState("insurance");

  // Comprehensive detailed feature payload data logs
  const features = [
    {
      id: "insurance",
      icon: "🛡️",
      tag: "Guaranteed Protection",
      title: "Zero-Deductible Fleet Liability Framework",
      shortDesc:
        "Comprehensive asset protection backed by top-tier underwritten physical damage collision waivers.",
      longDesc:
        "When handling ultra-high performance vehicles, liability clarity is non-negotiable. Every contract executed on our framework features a true zero-deductible model. This covers complete physical damage waivers (CDW), direct atmospheric damage protection, vector-theft mitigation protocols, and a baseline $1,000,000 corporate third-party liability shield. No hidden processing surcharges, no premium adjustments, and zero out-of-pocket tracking claims if an incident occurs.",
      metrics: [
        { label: "Deductible Balance", value: "$0.00" },
        { label: "Third-Party Shield", value: "$1.0M" },
        { label: "Underwriting Tier", value: "A++ Premium" },
      ],
    },
    {
      id: "roadside",
      icon: "🚑",
      tag: "Tactical Logistics",
      title: "24/7 Autonomous Roadside Assistance",
      desc: "Instant telemetry monitoring paired with emergency hardware dispatch capabilities everywhere on the map.",
      shortDesc:
        "Real-time fleet telemetry connection paired with automated physical roadside rescue mechanics.",
      longDesc:
        "Our vehicles remain connected to an active operational dispatch hub via telemetry sync loops. If you encounter a localized hardware failure—ranging from standard tire pressure deflations to a critical battery charge drop—our system immediately isolates your GPS vectors. Within minutes, a dedicated field rescue crew is deployed to handle flat-tire switches, emergency high-voltage jumps, contactless lockouts, or immediate luxury mechanical replacement drop-offs.",
      metrics: [
        { label: "Average Response Time", value: "19 Mins" },
        { label: "Coverage Radius", value: "Nationwide" },
        { label: "Support Availablity", value: "365 Days" },
      ],
    },
    {
      id: "refunds",
      icon: "💰",
      tag: "Financial Freedom",
      title: "100% Immutable Instant Refund Ledger",
      shortDesc:
        "Automated real-time transactional clearing arrays processing cancellation credits instantly.",
      longDesc:
        "Traditional rental models capture consumer funds inside complex multi-week processing loops when trips are cancelled. DriveFleet utilizes smart transactional clearing workflows. If you cancel your scheduled reservation entry up to 24 hours prior to your pickup timestamp, the cancellation node triggers an immediate database state modification. The corresponding financial payload is instantly reversed back into your digital profile wallet ledger or original bank account wire.",
      metrics: [
        { label: "Processing Latency", value: "Instant" },
        { label: "Cancellation Fee", value: "0%" },
        { label: "Retention Rate", value: "100%" },
      ],
    },
    {
      id: "access",
      icon: "🔑",
      tag: "Modern Protocol",
      title: "Contactless Biometric NFC Security Access",
      shortDesc:
        "Bypass rental desks entirely via cryptographically signed keyless entry networks.",
      longDesc:
        "We have completely eliminated physical check-in lines and manual rental counters. Your verified user profile acts as a hardware key interface. Upon booking confirmation, our backend issues an encrypted cryptographic pass signature directly to your application profile. Simply approach the vehicle placement zone and verify your biometric lock via face-ID/NFC link. The secure access system unlocks the door anchors, verifies cabin parameters, and activates ignition systems automatically.",
      metrics: [
        { label: "Counter Wait Time", value: "0.0 Sec" },
        { label: "Key Encryption", value: "AES-256" },
        { label: "Hardware Unlock", value: "NFC Pulse" },
      ],
    },
  ];

  // Animation variants configuration blocks
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const currentFeature = features.find((f) => f.id === activeTab);

  return (
    <section className="bg-transparent py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/10 relative text-base-content overflow-hidden">
      {/* 🔮 Background Atmospheric Deep Ambient Light Flares */}
      <div className="absolute top-1/4 -left-60 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none select-none"></div>
      <div className="absolute bottom-1/4 -right-60 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none select-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ==========================================
            SECTION HEADER BLOCK
            ========================================== */}
        <div className="text-center md:text-left mb-20 max-w-3xl border-b border-base-content/5 pb-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block"
          >
            Core Institutional Architecture
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-base-content mt-4 tracking-tighter leading-tight"
          >
            Engineered Beyond Traditional <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400">
              Rental Friction Frameworks
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-base-content/60 mt-4 leading-relaxed font-medium"
          >
            We dismantled the legacy operational paradigms of car rentals—hidden
            micro-insurance deductibles, predatory refund holding sequences, and
            counter waiting lines—to construct a bulletproof, automated tech
            ecosystem.
          </motion.p>
        </div>

        {/* ==========================================
            UPGRADED HIGH-CONTRAST FEATURE CARDS GRID
            ========================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {features.map((item) => {
            const isSelected = activeTab === item.id;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`cursor-pointer text-left p-6 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between min-h-[280px] relative overflow-hidden ${
                  isSelected
                    ? "bg-base-100/60 border-primary shadow-[0_20px_40px_-15px_rgba(var(--p),0.15)] ring-1 ring-primary/30"
                    : "bg-base-100/20 backdrop-blur-md border-base-content/10 hover:border-base-content/30 hover:bg-base-100/30 shadow-xl"
                }`}
              >
                {/* Visual Ambient Spot inside the active state card selection layout */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                )}

                <div>
                  {/* Top Header Card row info */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-base-content/10 ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-base-content/5"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                        isSelected
                          ? "bg-primary/20 border-primary/40 text-primary"
                          : "bg-base-content/5 border-base-content/5 text-base-content/40"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Core copy specs content labels */}
                  <h3 className="text-md font-black tracking-tight text-base-content mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-base-content/60 leading-relaxed font-medium">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Bottom Interactive CTA Indicator bar row */}
                <div className="mt-6 pt-4 border-t border-base-content/5 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? "text-primary" : "text-base-content/30"}`}
                  >
                    {isSelected
                      ? "● System Inspected"
                      : "Explore Technical Spec"}
                  </span>
                  <span
                    className={`text-xs transform transition-transform duration-300 ${isSelected ? "translate-x-1 text-primary" : "text-base-content/30"}`}
                  >
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ==========================================
            INTERACTIVE DEEP-DIVE SPOTLIGHT MATRICES PANEL
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full bg-base-100/30 backdrop-blur-xl border border-base-content/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-left"
        >
          {/* Inner accent top illumination light node leak decoration */}
          <div className="absolute top-0 left-1/4 w-96 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Extensive Detailed Prose Text Blocks */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary font-black px-3 py-1 rounded-md uppercase tracking-widest">
                    {currentFeature.tag} Blueprint Technical Docs
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight mt-3">
                    {currentFeature.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed font-medium">
                  {currentFeature.longDesc}
                </p>

                {/* Grid subrow presenting nested feature metrics maps */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-base-content/5">
                  {currentFeature.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-base-content/[0.02] border border-base-content/5 p-4 rounded-xl"
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider text-base-content/40 block">
                        {m.label}
                      </span>
                      <span className="text-xl font-black text-base-content block mt-1">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Comparative Institutional Platform Matrix Table */}
              <div className="lg:col-span-5 bg-base-content/[0.02] border border-base-content/10 p-6 sm:p-8 rounded-3xl">
                <h4 className="text-xs font-black uppercase tracking-widest text-base-content mb-4 flex items-center gap-2">
                  <span>📊</span> Operational Paradigm Comparison
                </h4>

                <div className="space-y-4">
                  {/* Row 1: Traditional System Weaknesses */}
                  <div className="border-b border-base-content/5 pb-4 space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 inline-block">
                      Legacy Standard Car Rental Agencies
                    </span>
                    <p className="text-xs text-base-content/60 font-medium">
                      High-deductible coverage traps up to $2,500, manual
                      check-in waiting scripts, and multi-week cancellation
                      refund block delays.
                    </p>
                  </div>

                  {/* Row 2: Optimized DriveFleet System Strength */}
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
                      DriveFleet Autonomous Gateway Infrastructure
                    </span>
                    <p className="text-xs text-base-content/90 font-bold leading-relaxed">
                      True zero-liability parameters, encrypted instant data
                      clearings, real-time telemetry error dispatch tracking,
                      and keyless biometric system validation.
                    </p>
                  </div>
                </div>

                {/* Micro-legal disclaimer baseline note */}
                <div className="mt-6 pt-4 border-t border-base-content/5 text-[9px] text-base-content/30 leading-normal">
                  *All metrics logs are verified continuously across our
                  deployment server nodes. Insurance policies are issued under
                  corporate platform umbrella listings.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ==========================================
            ADDITIONAL BRAND INTEGRATION GRID ACCENT LINES
            ========================================== */}
        <div className="mt-20 border-t border-base-content/5 pt-8 flex flex-wrap items-center justify-center lg:justify-between gap-6 text-base-content/30 select-none text-xs font-bold uppercase tracking-widest">
          <div>🛡️ Underwriting Clearance Approved</div>
          <div className="hidden sm:inline">
            ⚡ Real-time Fleet Telemetry Streaming
          </div>
          <div>🔒 AES-256 Crypto Key Handshake Lock</div>
        </div>
      </div>
    </section>
  );
}
