import React from "react";

const TrustedBrand = () => {
  const companyLogos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
  ];

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll 20s linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="overflow-hidden w-full relative max-w-6xl mx-auto py-10 select-none">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

        {/* Marquee content */}
        <div
          className="marquee-inner flex will-change-transform min-w-[200%]"
          style={{ animationDuration: "20s" }}
        >
          <div className="flex items-center">
            {[...companyLogos, ...companyLogos].map((company, index) => (
              <img
                key={index}
                src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                alt={company}
                className="w-32 sm:w-36 md:w-40 mx-6 object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                draggable={false}
              />
            ))}
          </div>
        </div>

        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </>
  );
};

export default TrustedBrand;
