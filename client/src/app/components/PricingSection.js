"use client";

import {
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlineGift,
  HiOutlineBuildingLibrary,
  HiOutlineCake,
} from "react-icons/hi2";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const pricingPackages = [
  {
    title: "Classic Tour/group",
    description: "Explore Manhattan highlights in a 3-hour guided journey.",
    price: "$199",
    features: [
      { label: "Duration: 3 hours", icon: <HiOutlineClock size={18} /> },
      { label: "Up to 6 people", icon: <HiOutlineUserGroup size={18} /> },
      {
        label: "Private vehicle & guide included",
        icon: <HiOutlineTruck size={18} />,
      },
    ],
  },
  {
    title: "Timeless Experience",
    description:
      "Dive deeper into New York’s culture and history — from Harlem to the Bronx.",
    price: "$349",
    features: [
      { label: "Duration: 5 hours", icon: <HiOutlineClock size={18} /> },
      { label: "Custom route planning", icon: <HiOutlineMap size={18} /> },
      { label: "Photo stops + snack break", icon: <HiOutlineGift size={18} /> },
    ],
  },
  {
    title: "Full-Day Discovery",
    description: "The ultimate all-day exploration across multiple boroughs.",
    price: "$499",
    features: [
      { label: "Duration: 8 hours", icon: <HiOutlineClock size={18} /> },
      { label: "Optional lunch stop", icon: <HiOutlineCake size={18} /> },
      {
        label: "Includes entry to selected attractions",
        icon: <HiOutlineBuildingLibrary size={18} />,
      },
    ],
  },
];

export default function PricingSection() {
  // Variants
  const containerVariant = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const featureVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // 3D Tilt + floating logic
  const use3DTilt = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [15, -15]);
    const rotateY = useTransform(x, [-50, 50], [-15, 15]);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      x.set(offsetX - centerX);
      y.set(offsetY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
  };

  return (
    <section
      id="pricing"
      className="w-full bg-primary-300 py-36 px-6 md:px-12 lg:px-20"
    >
      {/* HEADER */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-secondary-800 font-serif text-4xl md:text-5xl font-bold mb-4">
          Pricing & Packages
        </h2>
        <p className="text-secondary-900 text-[15px] max-w-2xl mx-auto leading-relaxed">
          We believe in simple, transparent pricing — designed <br /> for
          flexibility and value.
        </p>
      </motion.div>

      {/* PRICING CARDS */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {pricingPackages.map((pkg, index) => {
          const tilt = use3DTilt();

          return (
            <motion.div
              key={index}
              className="bg-secondary-900 text-primary-300 p-10 rounded-2xl shadow-xl flex flex-col items-center border border-secondary-800 cursor-pointer will-change-transform"
              variants={cardVariant}
              style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
              onMouseMove={tilt.handleMouseMove}
              onMouseLeave={tilt.handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Card Header */}
              <h3 className="font-serif text-2xl font-semibold mb-3 text-primary-100">
                {pkg.title}
              </h3>
              <p className="text-primary-200 text-sm mb-6 text-center leading-relaxed">
                {pkg.description}
              </p>
              <p className="text-secondary-100 font-serif text-4xl font-bold mb-8 tracking-wide">
                {pkg.price}
              </p>

              {/* Features */}
              <ul className="text-primary-200 text-sm w-full space-y-3 mb-8">
                {pkg.features.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 bg-secondary-800/40 px-4 py-2 rounded-md"
                    variants={featureVariant}
                  >
                    <span className="text-primary-100">{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Button */}
              <motion.button
                className="bg-primary-300 text-secondary-900 w-full py-3 rounded-md font-semibold shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.07, backgroundColor: "#fcd34d" }}
                transition={{ duration: 0.3 }}
              >
                Book Now
              </motion.button>

              {/* Floating subtle animation */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
