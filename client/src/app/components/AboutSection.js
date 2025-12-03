"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Fade-up for text
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Blur reveal for image
const blurReveal = {
  hidden: { opacity: 0, filter: "blur(20px)", scale: 1.05 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export default function AboutSection() {
  const controls = useAnimation();
  const imgControls = useAnimation();

  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      imgControls.start("visible");
    }
  }, [inView, controls, imgControls]);

  return (
    <section
      id="about"
      ref={ref}
      className="w-full bg-primary-300 py-36 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* LEFT — STORY TEXT */}
        <motion.div variants={fadeUp} initial="hidden" animate={controls}>
          <h2 className="text-secondary-800 font-serif text-4xl md:text-5xl font-bold mb-6">
            Our Story
          </h2>

          <p className="text-secondary-900 text-[15px] leading-relaxed mb-5">
            Founded in 2019 during one of the most challenging periods in modern
            history, NYC Timeless Sightseeing Tours emerged with a fresh vision:
            to redefine how visitors experience New York City.
          </p>

          <p className="text-secondary-900 text-[15px] leading-relaxed mb-5">
            As traditional tour buses remained crowded and rigid in their
            routes, we saw an opportunity to create something more personal —
            small, intimate tours that allow travelers to explore New York’s
            most iconic and hidden gems with comfort and flexibility.
          </p>

          <p className="text-secondary-900 text-[15px] leading-relaxed">
            From Central Park to the Bronx Botanical Gardens, and from the
            Apollo Theater in Harlem to historic churches that shaped the civil
            rights movement, we take you beyond the surface — into the heartbeat
            of the city.
          </p>
        </motion.div>

        {/* RIGHT — HEADLINE + BLUR-REVEAL IMAGE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center text-center"
        >
          <h3 className="text-secondary-900 font-serif text-2xl md:text-3xl font-semibold mb-6">
            We don’t just show you New York — <br />
            <span className="text-secondary-800">we help you feel it.</span>
          </h3>

          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={imgControls}
            className="relative w-full h-[450px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/statueLiberty.jpg"
              alt="Statue of Liberty"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
