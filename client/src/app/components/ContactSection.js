"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaLocationDot, FaX } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const socialVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.15, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full bg-primary-400 py-36 px-6 md:px-12 lg:px-20 text-white"
    >
      {/* Wrapper */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView ? { opacity: 1, y: 0, transition: { duration: 0.8 } } : {}
          }
        >
          Connect With Us
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
              : {}
          }
        >
          Tours Built for Connection, Comfort, and Adventure. Ready to explore
          New York your way? Let’s plan your perfect tour experience.
        </motion.p>

        {/* Contact Info */}
        <motion.div
          className="text-white mb-16 space-y-8 md:space-y-0 md:flex md:justify-center md:gap-12"
          variants={containerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Email */}
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariant}
          >
            <FaEnvelope className="text-2xl text-gray-700 mb-2" />
            <p className="font-semibold text-lg uppercase tracking-wider text-gray-400">
              Email
            </p>
            <a
              href="mailto:info@nyctimelesstours.com"
              className="text-xl font-bold hover:text-primary-800 transition duration-300"
            >
              info@nyctimelesstours.com
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="relative flex flex-col items-center md:border-l md:border-gray-700 md:pl-12"
            variants={itemVariant}
          >
            <FaPhoneAlt className="text-2xl text-gray-700 mb-2" />
            <p className="font-semibold text-lg uppercase tracking-wider text-gray-400">
              Phone
            </p>
            <a
              href="tel:+12125551234"
              className="text-xl font-bold hover:text-primary-800 transition duration-300"
            >
              +1 (212) 555-1234
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            className="relative flex flex-col items-center md:border-l md:border-gray-700 md:pl-12"
            variants={itemVariant}
          >
            <FaLocationDot className="text-2xl text-gray-700 mb-2" />
            <p className="font-semibold text-lg uppercase tracking-wider text-gray-400">
              Location
            </p>
            <p className="text-xl font-bold">Manhattan, New York City</p>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center gap-8"
          variants={containerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.a
            href="#"
            aria-label="Instagram"
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-600 text-gray-600
            hover:bg-primary-700 hover:text-white hover:border-primary-700 transition duration-300"
            variants={socialVariant}
            whileHover="hover"
          >
            <FaInstagram className="text-2xl" />
          </motion.a>

          <motion.a
            href="#"
            aria-label="Facebook"
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-600 text-gray-600
            hover:bg-primary-700 hover:text-white hover:border-primary-700 transition duration-300"
            variants={socialVariant}
            whileHover="hover"
          >
            <FaFacebookF className="text-xl" />
          </motion.a>

          <motion.a
            href="#"
            aria-label="X (Twitter)"
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-600 text-gray-600
            hover:bg-primary-700 hover:text-white hover:border-primary-700 transition duration-300"
            variants={socialVariant}
            whileHover="hover"
          >
            <FaX className="text-xl" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
