"use client";

import React, { useState, useEffect } from "react";

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the tooltip in this session
    const dismissed = sessionStorage.getItem("wa-tooltip-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    } else {
      // Delay showing the tooltip for better user experience
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    setIsDismissed(true);
    sessionStorage.setItem("wa-tooltip-dismissed", "true");
  };

  const phoneNumber = "916361026230";
  const message = encodeURIComponent(
    "Hi! I have an inquiry regarding DSS Talent Bridge recruitment and staffing services."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none select-none">
      {/* Tooltip Chat Bubble */}
      {showTooltip && !isDismissed && (
        <div className="relative pointer-events-auto bg-slate-900 border border-slate-800 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl flex items-start gap-3 max-w-[260px] animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">DSS Talent Bridge Support</p>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              Hi there! 👋 How can we help you with your hiring or job search today?
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white transition-colors p-0.5 rounded hover:bg-slate-800 mt-0.5 cursor-pointer"
            aria-label="Dismiss message"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-r border-b border-slate-800 rotate-45"></div>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] focus:ring-offset-slate-900"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Breathing Animation Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none duration-1000"></span>

        {/* Whatsapp Logo Icon */}
        <svg
          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-12"
          viewBox="0 0 24 24"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.945 9.945 0 0 0 4.887 1.277h.005c5.505 0 9.988-4.478 9.99-9.985A9.983 9.983 0 0 0 12.012 2zm5.748 14.283c-.244.693-1.427 1.348-1.956 1.408-.49.055-.97.234-3.13-.623-2.766-1.097-4.538-3.913-4.677-4.1a4.912 4.912 0 0 1-1.055-2.735c0-1.52.795-2.26 1.077-2.545.244-.247.653-.368.966-.368.102 0 .193.006.273.01.238.01.564.015.811.603.244.58.835 2.03.906 2.18.07.15.118.324.018.523-.1.2-.149.324-.298.5-.15.176-.312.39-.447.523-.153.15-.313.313-.135.62.178.307.79 1.302 1.696 2.11.168.15.313.25.52.35.307.15.485.127.662-.078.178-.205.768-.89.972-1.196.204-.306.408-.255.69-.153.282.102 1.787.842 2.094.997.307.155.512.233.58.35.07.12.07.693-.174 1.386z" />
        </svg>
      </a>
    </div>
  );
}
