"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About us", id: "about" },
    { label: "Destinations", id: "destinations" },
    { label: "Services", id: "services" },
    { label: "Pricing", id: "pricing" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.5, // adjust trigger sensitivity
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        {/* LOGO */}
        <h1 className="text-2xl font-bold font-serif">Timeless</h1>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex space-x-8 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`transition-colors ${
                active === item.id
                  ? "text-primary-500 font-semibold"
                  : "text-secondary-700 hover:text-primary-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* MOBILE MENU ICON */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
          <FiMenu />
        </button>
      </div>

      {/* MOBILE BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 
        transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h1 className="text-xl font-serif font-bold">Menu</h1>

          <button onClick={() => setOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col space-y-2 px-5 py-6 text-base">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`text-left px-3 py-2 rounded-sm transition-colors ${
                active === item.id
                  ? "bg-primary-500 text-white font-semibold"
                  : "hover:bg-secondary-500 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
