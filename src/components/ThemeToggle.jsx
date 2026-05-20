"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Use "dim" or "luxury" for your dark theme to preserve that premium cyberpunk vibe!
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "luxury"
      : "luxury",
  );

  useEffect(() => {
    // Inject attribute directly into root element
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "luxury" ? "light" : "luxury"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle border border-base-content/10 bg-base-100/10 backdrop-blur-md shadow-md fixed bottom-6 right-6 z-[300] hover:scale-110 transition-transform duration-200"
      title="Toggle Theme Mode"
    >
      {theme === "luxury" ? (
        /* ☀️ Bright Sun SVG Icon for Light Theme Switch */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-amber-400 animate-spin-slow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42"
          />
        </svg>
      ) : (
        /* 🌙 Dark Moon SVG Icon for Luxury Dark Theme Switch */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
