import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center 
      bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat pt-32 sm:pt-40 pb-12 sm:pb-16"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          <span className="text-primary">AI-Powered </span>
          Workspace for <br /> Creators & Professionals
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-grey-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 cursor-pointer"
        >
          Start creating now
        </button>
        <button className="bg-white px-10 py-3 rounded-lg border border-grey-300 hover:scale-102 active:scale-95 transition cursor-pointer">
          Watch demo
        </button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-grey-600">
        <img src={assets.user_group} alt="" className="h-8 cursor-pointer" />
        Trusted by 10k+ people
      </div>
    </div>
  );
};

export default Hero;
