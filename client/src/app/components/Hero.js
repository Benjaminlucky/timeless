"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function Hero() {
  const slides = [
    {
      image: "/heroBanner1.jpg",
      title: "Discover New York",
      subtitle: "One Timeless Moment at a Time",
      description:
        "Personalized small-group tours that reveal the real New York — from iconic landmarks to hidden gems.",
    },
    {
      image: "/heroBanner2.jpg",
      title: "Uncover Hidden NYC",
      subtitle: "Beyond the Usual Spots",
      description:
        "From tucked-away cafes to forgotten landmarks — discover a side of NYC most never see.",
    },
    {
      image: "/heroBanner3.jpg",
      title: "See The City Differently",
      subtitle: "Where Every Street Tells a Story",
      description:
        "Expert-guided tours designed to immerse you in the heart and soul of New York City.",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 8 });
  const [index, setIndex] = useState(0);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const nextIndex = (emblaApi.selectedScrollSnap() + 1) % slides.length;
    emblaApi.scrollTo(nextIndex);
  }, [emblaApi, slides.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => autoplay(), 5000);

    emblaApi.on("select", () => {
      setIndex(emblaApi.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Embla viewport */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full relative">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="embla__slide relative h-full w-full flex-[0_0_100%]"
            >
              {/* Fade logic (no stacking!) */}
              <div
                className={`absolute inset-0 transition-opacity duration-[1200ms] ${
                  index === i ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-black/70"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-6 max-w-3xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                    {slide.title}
                  </h1>
                  <h2 className="text-lg md:text-3xl font-medium mb-6">
                    {slide.subtitle}
                  </h2>
                  <p className="text-md md:text-lg leading-relaxed mb-8 opacity-90">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-primary-500 text-white rounded-md font-semibold shadow hover:bg-primary-600 transition">
                      Book a Tour
                    </button>
                    <button className="px-6 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-black transition">
                      View Packages
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`h-3 w-3 rounded-full transition-all ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
