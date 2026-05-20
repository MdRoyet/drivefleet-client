"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubscriptionPlans() {
  // ⚙️ Core Subscription Configuration State Management Engine
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "annual"
  const [activeTier, setActiveTier] = useState("apex"); // "cruiser" | "apex" | "syndicate"
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [checkoutModal, setCheckoutModal] = useState(null);

  // 💎 Premium Multi-Tier Subscription Structure Layout Dataset
  const tiers = [
    {
      id: "cruiser",
      name: "Cruiser Membership",
      tagline: "Essential Access Tier",
      badge: "Popular Value",
      icon: "🚗",
      priceMonthly: 599,
      priceAnnualFactor: 0.8, // 20% Discount factor
      description:
        "Perfect for premium daily commuting and weekend urban exploration runs.",
      fleetAccess:
        "Standard Division (Tesla Model 3, Toyota Camry, Honda Civic Type R)",
      features: [
        "15 Total Active Rental Days Per Month",
        "3 Rolling Vehicle Exchange Allowances",
        "Standard Tier Comprehensive CDW Insurance",
        "Contactless NFC App Access Authentication",
        "Free Delivery Within 10-Mile Radius Hubs",
      ],
      gradient: "from-blue-500 via-indigo-500 to-blue-600",
      accentGlow: "rgba(59,130,246,0.15)",
    },
    {
      id: "apex",
      name: "Apex Executive Syndicate",
      tagline: "The Benchmark Experience",
      badge: "Most Selected",
      icon: "🦅",
      priceMonthly: 1299,
      priceAnnualFactor: 0.8, // 20% Discount factor
      description:
        "Uncompromised premium execution providing absolute utility across performance and luxury frames.",
      fleetAccess:
        "Luxury & SUV Division (BMW M4, Range Rover Sport, Tesla Model S Plaid)",
      features: [
        "Unlimited Calendar Access Rental Days",
        "Unlimited On-Demand Fleet Swaps",
        "Elite $0-Deductible Liability Underwriting Shield",
        "Guaranteed 2-Hour Hot-Drop Priority Delivery",
        "Complimentary Regional Private Chauffeur Hours (5h/mo)",
        "Exclusive Access to Airport Valet Swap Nodes",
      ],
      gradient: "from-primary via-purple-500 to-indigo-600",
      accentGlow: "rgba(168,85,247,0.2)",
    },
    {
      id: "syndicate",
      name: "Hypercar Syndicate",
      tagline: "The Pinnacle of Flight",
      badge: "Ultra Premium",
      icon: "👑",
      priceMonthly: 2999,
      priceAnnualFactor: 0.8, // 20% Discount factor
      description:
        "Ultimate absolute status tracking access. Command track-ready elite configurations globally.",
      fleetAccess:
        "Hypercar Division (Porsche 911 Carrera, Corvette C8, Nissan GT-R Nismo)",
      features: [
        "Unrestricted Global Hyper-Fleet Access Allocation",
        "Priority Access to Brand New Annual Vehicle Drop Deployments",
        "Full Global Custom Underwritten Insurance Security Clearings",
        "Dedicated VIP Concierge Fleet Logistics Manager Allocation",
        "Unlimited Complementary Nationwide Destination Transport Lines",
        "Track Day Telemetry Engineering & Track Support Passes",
      ],
      gradient: "from-amber-500 via-orange-500 to-yellow-600",
      accentGlow: "rgba(245,158,11,0.15)",
    },
  ];

  // 🛠️ Dynamic Enterprise Grade Optional Add-on Modules Configuration Array
  const addOnModules = [
    {
      id: "telemetry",
      icon: "📊",
      title: "Advanced Track Telemetry",
      cost: 49,
      desc: "Unlocks real-time track diagnostics metrics logging overlay displays.",
    },
    {
      id: "concierge",
      icon: "🤵",
      title: "Personalized Cabin Concierge",
      cost: 99,
      desc: "Tailored climate controls, pre-filled micro-bar configurations, and favorite media profile boots.",
    },
    {
      id: "carbon",
      icon: "🌱",
      title: "100% Carbon Neutral Footprint",
      cost: 29,
      desc: "Verified offset credits matched matching your exact dynamic engine usage.",
    },
  ];

  // 📋 Cross Platform Operational Paradigm Feature Comparison Data Table Maps
  const comparisonMatrix = [
    {
      feature: "Zero-Deductible CDW Shield",
      cruiser: "Included",
      apex: "Included",
      syndicate: "Included",
    },
    {
      feature: "Rolling Vehicle Swaps Frequency",
      cruiser: "3 / Month",
      apex: "Unlimited",
      syndicate: "Unlimited",
    },
    {
      feature: "Airport Drop-off Node Swap",
      cruiser: "+$45 Per Event",
      apex: "Complimentary",
      syndicate: "Complimentary",
    },
    {
      feature: "Elite Track Fleet Access",
      cruiser: "Locked Tier",
      apex: "Locked Tier",
      syndicate: "Unrestricted",
    },
    {
      feature: "Dedicated Support Allocation",
      cruiser: "Standard Web Queue",
      apex: "24/7 Priority Voice Line",
      syndicate: "VIP Account General Manager",
    },
  ];

  // 🧮 Interactive Financial Calculation Variables Compilation Matrix Block
  const currentTierData = tiers.find((t) => t.id === activeTier);
  const calculatedBasePrice =
    billingCycle === "monthly"
      ? currentTierData.priceMonthly
      : Math.round(
          currentTierData.priceMonthly * currentTierData.priceAnnualFactor,
        );

  const totalAddonsCost = selectedAddons.reduce((sum, addonId) => {
    const addon = addOnModules.find((a) => a.id === addonId);
    return sum + (addon ? addon.cost : 0);
  }, 0);

  const aggregateTotalCost = calculatedBasePrice + totalAddonsCost;

  // 🎛️ Input Component Handler Function Triggers
  const toggleAddonFilter = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="bg-transparent py-24 px-4 sm:px-6 lg:px-8 border-t border-base-content/10 relative text-base-content overflow-hidden">
      {/* 🔮 Background Atmospheric Deep Ambient Light Flares */}
      <div className="absolute top-1/3 -right-60 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[150px] pointer-events-none select-none"></div>
      <div className="absolute bottom-1/3 -left-60 w-[550px] h-[550px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none select-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ==========================================
            SECTION HEADER FRAMEWORK
            ========================================== */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block"
          >
            Continuous Access Networks
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-base-content">
            Elite Corporate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400">
              Subscription Plans
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-base-content/60 max-w-xl mx-auto font-medium leading-relaxed">
            Transition out of transactional fractional ownership loops. Secure
            frictionless continuous operation parameters over our entire fleet
            ecosystem.
          </p>

          {/* 🔄 Real-time Interactive Frequency Cycle Toggle Switch Slider */}
          <div className="pt-6 flex justify-center items-center gap-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${billingCycle === "monthly" ? "text-white" : "text-gray-500"}`}
            >
              Monthly Cycle
            </span>
            <button
              onClick={() =>
                setBillingCycle((prev) =>
                  prev === "monthly" ? "annual" : "monthly",
                )
              }
              className="w-14 h-8 bg-neutral-800 border border-white/10 rounded-full p-1 relative transition-colors focus:outline-none"
            >
              <motion.div
                animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="w-6 h-6 bg-primary rounded-full shadow-md shadow-primary/30"
              />
            </button>
            <span
              className={`text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${billingCycle === "annual" ? "text-white" : "text-gray-500"}`}
            >
              Annual Contract
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black text-[9px] uppercase px-2 py-0.5 rounded">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* ==========================================
            SUBSCRIPTION PLAN TIER PRICING INTERACTIVE CARDS
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {tiers.map((tier) => {
            const isSelected = activeTier === tier.id;
            const cardPrice =
              billingCycle === "monthly"
                ? tier.priceMonthly
                : Math.round(tier.priceMonthly * tier.priceAnnualFactor);

            return (
              <motion.div
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`cursor-pointer rounded-[2.5rem] border p-8 flex flex-col justify-between relative transition-all duration-300 shadow-2xl text-left ${
                  isSelected
                    ? "bg-neutral-900/60 border-primary ring-2 ring-primary/20"
                    : "bg-base-100/20 border-base-content/10 hover:border-base-content/30 backdrop-blur-md"
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 25px 50px -12px ${tier.accentGlow}`
                    : "none",
                }}
              >
                {/* Upper Core Specs Frame */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-white/5 border border-white/10 shadow-inner`}
                    >
                      {tier.icon}
                    </div>
                    {isSelected && (
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white bg-gradient-to-r ${tier.gradient} border border-white/20 shadow-lg`}
                      >
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-white">
                    {tier.name}
                  </h3>
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mt-1">
                    {tier.tagline}
                  </p>

                  <p className="text-xs text-gray-400 mt-4 leading-relaxed font-medium min-h-[48px]">
                    {tier.description}
                  </p>

                  {/* Pricing Output Parameter Layout display block */}
                  <div className="my-6 pt-6 border-t border-white/5 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter text-white transition-all duration-300">
                      ${cardPrice}
                    </span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                      /{" "}
                      {billingCycle === "monthly"
                        ? "Month"
                        : "Mo Billed Annually"}
                    </span>
                  </div>

                  {/* Core Content Feature Inclusion Line listings array maps */}
                  <div className="space-y-3.5 pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Allocation Clearances:
                    </p>
                    <p className="text-xs text-gray-200 font-bold bg-white/[0.02] border border-white/5 p-3 rounded-xl mb-4 leading-snug">
                      🗂️ {tier.fleetAccess}
                    </p>
                    {tier.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs font-medium text-gray-400"
                      >
                        <span className="text-emerald-400 flex-shrink-0 text-sm">
                          ✓
                        </span>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer verification check indicator button */}
                <div className="mt-8 pt-4 border-t border-white/5">
                  <button
                    className={`w-full text-xs font-black uppercase tracking-widest rounded-xl py-3.5 transition-all ${
                      isSelected
                        ? `bg-gradient-to-r ${tier.gradient} text-white shadow-lg`
                        : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                    }`}
                  >
                    {isSelected
                      ? "● Tier Selected For Configuration"
                      : "Select Membership Tier"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==========================================
            DYNAMIC ADD-ON MODULE CONFIGURATOR PLAYGROUND WORKSPACE
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 text-left">
          {/* Left Block: Checkbox Selector list matrix */}
          <div className="lg:col-span-7 bg-base-100/20 backdrop-blur-md border border-base-content/10 p-8 sm:p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[9px] bg-secondary/10 border border-secondary/20 text-secondary font-black px-3 py-1 rounded-md uppercase tracking-widest">
                Modular Workspace
              </span>
              <h3 className="text-2xl font-black text-white mt-3 tracking-tight">
                Customize Deployment Add-Ons
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed mt-2 mb-8">
                Incorporate real-time hardware telemetry enhancements or
                personalized bar configs natively into your monthly rolling
                profile framework allocation.
              </p>

              <div className="space-y-4">
                {addOnModules.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddonFilter(addon.id)}
                      className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 select-none ${
                        isChecked
                          ? "bg-primary/5 border-primary shadow-inner"
                          : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg shadow-inner">
                          {addon.icon}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {addon.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-medium mt-0.5 leading-tight">
                            {addon.desc}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md">
                          +${addon.cost}/mo
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked
                              ? "bg-primary border-primary text-white"
                              : "border-white/20 bg-transparent"
                          }`}
                        >
                          {isChecked && (
                            <span className="text-[10px] font-black">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 text-[10px] text-gray-500 font-medium">
              *Add-ons scale symmetrically across rolling fleet changes and sync
              implicitly on active document updates.
            </div>
          </div>

          {/* 💰 RIGHT BLOCK: HIGH VISIBILITY STICKY LIVE COST SUMMARY REAL-TIME CALCULATOR */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#121826] to-[#0e1322] border-2 border-primary/30 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-white/5 pb-4 mb-6">
                Active Allocation Summary Ledger
              </h4>

              {/* Cost Line Items Breakdown list parameters */}
              <div className="space-y-4 text-xs font-medium text-gray-400">
                <div className="flex justify-between">
                  <span>Selected Configuration:</span>
                  <span className="text-white font-bold">
                    {currentTierData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contract Terms Cycle:</span>
                  <span className="text-white font-bold capitalize">
                    {billingCycle} Cycle
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Base Pricing Ledger:</span>
                  <span className="text-white font-bold">
                    ${calculatedBasePrice} / mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Injected Add-On Modules:</span>
                  <span className="text-primary font-bold">
                    +${totalAddonsCost} / mo
                  </span>
                </div>

                {/* Sub-rendered checklist display tags mapping currently active selected addons */}
                {selectedAddons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedAddons.map((id) => {
                      const ad = addOnModules.find((a) => a.id === id);
                      return (
                        <span
                          key={id}
                          className="text-[9px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-gray-300 font-bold uppercase tracking-wider"
                        >
                          {ad?.title}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Total calculation block visualization display frame */}
            <div className="pt-8 mt-8 border-t border-white/5 space-y-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-black tracking-widest">
                    Aggregate Contract Rate
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    All parameters calculated
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary tracking-tighter">
                    ${aggregateTotalCost}
                  </span>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider mt-0.5">
                    / Month
                  </span>
                </div>
              </div>

              {/* Action checkout trigger initializing state modal container mappings */}
              <button
                onClick={() => setCheckoutModal(currentTierData)}
                className="w-full bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-black tracking-widest rounded-xl py-4.5 text-xs uppercase transition-all shadow-xl shadow-primary/10 active:scale-[0.99]"
              >
                ⚡ Initialize Access Subscription
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            TECHNICAL MATRICES COMPARISON DATA TABLE
            ========================================== */}
        <div className="w-full bg-base-100/20 backdrop-blur-md border border-base-content/10 rounded-[2.5rem] p-6 sm:p-10 shadow-xl overflow-hidden text-left">
          <div className="mb-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
              <span>📊</span> Infrastructure Inclusion Comparison Ledger Matrix
            </h4>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="table w-full text-xs font-medium text-gray-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="py-4 px-4 bg-transparent text-left">
                    Clearance Target Parameter
                  </th>
                  <th className="py-4 px-4 bg-transparent text-center">
                    Cruiser
                  </th>
                  <th className="py-4 px-4 bg-transparent text-center text-primary font-black">
                    Apex Executive
                  </th>
                  <th className="py-4 px-4 bg-transparent text-center text-amber-400 font-black">
                    Hypercar Syndicate
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-black text-left">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-400">
                      {row.cruiser}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-200 font-bold bg-primary/5 border-x border-white/5">
                      {row.apex}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-200">
                      {row.syndicate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            ANIME PRESENTATION CHECKOUT TRANSACTIONAL CONFIRMATION DIALOG MODAL
            ========================================== */}
        <AnimatePresence>
          {checkoutModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[250]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-[#111827] border-2 border-primary/30 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-center sm:text-left"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="mb-6">
                  <span className="text-3xl mb-1 block">🛡️</span>
                  <h3 className="text-xl font-black text-white">
                    Confirm Subscription Architecture Enrollment
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    You are initializing a cryptographic authorization loop to
                    link your profile account to the{" "}
                    <span className="text-primary font-bold">
                      {checkoutModal.name}
                    </span>{" "}
                    portal tier.
                  </p>
                </div>

                {/* Pricing metadata breakdown details within validation layout windows */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 my-4 space-y-2 text-xs leading-relaxed text-gray-300">
                  <div className="flex justify-between">
                    <span>Base Tier Rate:</span>
                    <span className="text-white font-bold">
                      ${calculatedBasePrice} / mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Injected System Modules:</span>
                    <span className="text-primary font-bold">
                      +${totalAddonsCost} / mo
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5 font-black text-sm">
                    <span className="text-white">Aggregate Total Charge:</span>
                    <span className="text-primary">
                      ${aggregateTotalCost} / mo
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 leading-normal bg-black/20 p-3 rounded-xl border border-white/5 mb-6">
                  ⚠️ <strong>Terms of Access Authorization:</strong> Membership
                  accounts operate via automated rolling renewals. Cancellations
                  are authorized natively inside your user dashboard anytime.
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setCheckoutModal(null)}
                    className="btn btn-ghost btn-sm rounded-xl normal-case h-11 min-h-0 text-gray-400 hover:bg-white/5 font-medium"
                  >
                    Abort Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Subscription link simulation completed successfully. Token parameters active.",
                      );
                      setCheckoutModal(null);
                    }}
                    className="btn btn-primary btn-sm rounded-xl normal-case h-11 min-h-0 text-white font-black tracking-wide shadow-md shadow-primary/40"
                  >
                    Confirm & Authorize
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
