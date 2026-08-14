"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";

// Malaysian airport and aircraft images
const AIRPORT_IMAGES = [
  "https://www.aci-asiapac.aero/f/blog/9684/15593/0p0/28-02-20_AA%20_0581.jpg?w=1200&h=1200&fit=crop", // Airport runway
  "https://apicms.thestar.com.my/uploads/images/2024/10/12/thumbs/700/2960284.webp?w=1200&h=1200&fit=crop", // Aircraft takeoff
  "https://focusmalaysia.my/wp-content/uploads/Aerotrain-1.jpg?w=1200&h=1200&fit=crop", // Airport terminal
  "https://www.sangfor.com/sites/default/files/2025-04/cyberattack-on-kuala-lumpur-international-airport.jpg?w=1200&h=1200&fit=crop", // Airplane at gate
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % AIRPORT_IMAGES.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Slideshow background images */}
      {AIRPORT_IMAGES.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity:
              index === currentImageIndex ? (isDarkMode ? 0.25 : 0.15) : 0,
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.3) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.4) 100%)",
        }}
      ></div>

      {/* Branded color overlay */}
      <div
        className="absolute inset-0 mix-blend-multiply pointer-events-none"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(255, 127, 0, 0.4) 0%, rgba(0, 102, 204, 0.35) 50%, rgba(20, 20, 30, 0.4) 100%)"
            : "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(255, 140, 0, 0.2) 50%, rgba(59, 130, 246, 0.25) 100%)",
        }}
      ></div>

      {/* Theme & Language Switchers - Top Right Outside Box */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-30">
        <LanguageSwitch />
        <ThemeSwitch />
      </div>

      <div className={`max-w-xl mx-auto relative z-10 mt-10 mb-10`}>
        <header
          className={`py-6 px-4 border-b backdrop-blur-md rounded-b-lg transition-all ${
            isDarkMode
              ? "border-white/15 bg-black/20"
              : "border-blue-300/50 bg-white/40"
          }`}
        >
          <div className="mb-4">
            <h1
              className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent drop-shadow-lg ${
                isDarkMode
                  ? "from-orange-400 via-blue-400 to-orange-500"
                  : "from-blue-600 via-orange-500 to-blue-600"
              }`}
            >
              {t("layout.title")}
            </h1>
            <p
              className={`text-sm mt-2 font-medium ${
                isDarkMode ? "text-white/85" : "text-gray-800"
              }`}
            >
              {t("layout.subtitle")}
            </p>
          </div>
        </header>
        <main
          className={`p-4 rounded-lg transition-all ${
            isDarkMode
              ? "bg-black/10 backdrop-blur-sm"
              : "bg-white/50 backdrop-blur-sm border border-blue-200/50 shadow-lg"
          }`}
        >
          {children}
        </main>
      </div>

      {/* Image counter indicator - only for dark mode */}
      {isDarkMode && (
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          {AIRPORT_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
