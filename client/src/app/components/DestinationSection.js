"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function DestinationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const images = [
    "/dest1.jpg",
    "/dest2.jpg",
    "/dest3.jpg",
    "/dest4.jpg",
    "/dest5.jpg",
    "/dest6.jpg",
  ];

  /** TEXT + SECTION FADE-UP **/
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  /** GRID ITEM ANIMATION — Staggered reveal **/
  const cardVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(8px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: i * 0.15,
      },
    }),
  };

  /** Tilt state for all images **/
  const [tilts, setTilts] = useState(
    images.map(() => "rotateX(0deg) rotateY(0deg) scale(1)")
  );

  /** Mouse movement handlers **/
  const handleMouseMove = (index, e) => {
    const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateX = ((y - height / 2) / height) * 12;
    const rotateY = ((x - width / 2) / width) * -12;

    const newTilts = [...tilts];
    newTilts[
      index
    ] = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    setTilts(newTilts);
  };

  const handleMouseLeave = (index) => {
    const newTilts = [...tilts];
    newTilts[index] = "rotateX(0deg) rotateY(0deg) scale(1)";
    setTilts(newTilts);
  };

  return (
    <section
      id="destinations"
      ref={ref}
      className="w-full py-36 px-6 md:px-12 lg:px-20 bg-white"
    >
      {/* Section Header */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-secondary-900 font-serif text-4xl md:text-5xl font-bold mb-4">
          Destinations Showcase
        </h2>
        <p className="text-secondary-700 text-[15px] leading-relaxed">
          Explore iconic landmarks and the vibrant heart of New York City.
        </p>
      </motion.div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((src, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              transform: tilts[i],
              transition: "transform 0.2s ease-out",
            }}
            onMouseMove={(e) => handleMouseMove(i, e)}
            onMouseLeave={() => handleMouseLeave(i)}
            className="relative group w-full h-[260px] md:h-[280px] rounded-xl overflow-hidden shadow-lg bg-gray-200 cursor-pointer will-change-transform"
          >
            {/* Floating parallax layer */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`NYC Destination ${i + 1}`}
                fill
                className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.12]"
              />
            </motion.div>

            {/* Light shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none">
              <div
                className="absolute inset-0 bg-gradient-to-r
                           from-transparent via-white/30 to-transparent
                           translate-x-[-200%] group-hover:translate-x-[200%]
                           duration-[1500ms] ease-out"
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
