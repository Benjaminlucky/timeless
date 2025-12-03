"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaBus, FaMapMarkedAlt, FaCompass } from "react-icons/fa";

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // Animation for each card
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const services = [
    {
      title: "Private Small-Group Tours",
      text: "Up to six guests for a relaxed and personal experience.",
      icon: <FaBus className="text-6xl mb-4 text-white" />,
    },
    {
      title: "Custom Routes",
      text: "Designed around your interests and pace.",
      icon: <FaMapMarkedAlt className="text-6xl mb-4 text-white" />,
    },
    {
      title: "Expert Local Guides",
      text: "Discover NYC through authentic stories.",
      icon: <FaCompass className="text-6xl mb-4 text-white" />,
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="w-full py-20 px-6 md:px-12 lg:px-20 bg-white"
    >
      {/* Title */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-secondary-900"
        >
          Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-secondary-700 text-[15px] leading-relaxed mt-2"
        >
          Premium experiences tailored to your journey.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-secondary-800 text-white rounded-md py-10 px-6 text-center shadow-md
                       flex flex-col items-center hover:bg-secondary-700 transition-colors duration-300"
          >
            {service.icon}

            <h3 className="text-lg font-semibold mb-3">{service.title}</h3>

            <p className="text-white/80 text-sm leading-relaxed max-w-[250px]">
              {service.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
