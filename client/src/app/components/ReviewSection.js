"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reasons = [
  { title: "Small Groups, Big Experiences", image: "/choose1.jpg" },
  { title: "Tailored Tours — Built Around You", image: "/choose2.jpg" },
  { title: "Beyond the Usual Routes", image: "/choose3.jpg" },
  { title: "Safety & Comfort Guaranteed", image: "/choose4.jpg" },
];

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const headerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariant = {
    hidden: (custom) => ({
      opacity: 0,
      y: 40 + custom * 5,
      rotate: custom % 2 === 0 ? -6 : 6,
      scale: 0.95,
      filter: "blur(4px)",
    }),
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    }),
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="reviews"
      ref={ref}
      className="w-full bg-secondary-900 py-36 px-6 md:px-12 lg:px-20"
    >
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-20"
        variants={headerVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h2 className="text-white font-serif text-4xl md:text-5xl font-bold mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-300 text-[15px] leading-relaxed">
          Tours Built for Connection, Comfort, and Discovery
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10"
        variants={containerVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {reasons.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-xl relative cursor-pointer"
            custom={index} // Pass index to variants
            variants={cardVariant}
            whileHover="hover"
          >
            {/* Floating/parallax + Shimmer */}
            <div className="relative w-full h-72">
              <motion.div
                className="absolute inset-0"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-sm"
                />
              </motion.div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-200%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <div className="px-6 py-6 text-center">
              <h3 className="text-secondary-900 font-serif text-lg md:text-xl font-medium">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
