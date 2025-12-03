"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white py-6 border-t border-primary-500/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm md:text-[15px]">
        {/* Left Side */}
        <p className="text-gray-300 font-light text-center md:text-left">
          © {year} Timeless Sightseeing Tours — All Rights Reserved
        </p>

        {/* Right Side */}
        <p className="text-gray-300 font-light text-center md:text-right">
          Developed By{" "}
          <span className="font-medium">Inspireme Media Networks</span>
        </p>
      </div>
    </footer>
  );
}
