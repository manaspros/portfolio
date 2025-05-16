import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = ({ openResumeModal }) => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100%", // Changed from 100vw to 100%
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-full overflow-hidden">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4">
        <p className="font-general text-sm uppercase md:text-[10px]">
          About Me
        </p>

        <AnimatedTitle
          title="Full Sta<b>c</b>k Developer <br /> & Machine Lear<b>n</b>ing Enthusiast"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext max-w-2xl">
          <p>Student at IIIT Naya Raipur, passionate about technology</p>
          <p className="text-gray-500">
            I'm a developer focused on creating innovative web applications and exploring the
            frontiers of machine learning and artificial intelligence.
          </p>
        </div>
      </div>

      <div className="h-dvh w-full" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
