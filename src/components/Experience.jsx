import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";
import { BentoTilt, BentoCard } from "./Features";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ title, company, period, description, index, video, isMain, isImage }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const cardRef = useRef(null);

    useGSAP(() => {
        gsap.from(cardRef.current, {
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            duration: 0.8,
            delay: index * 0.2,
        });
    });

    const handleMouseMove = (event) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative ${isMain ? 'w-full' : 'w-full h-full'}`}
        >
            <div className="relative size-full overflow-hidden rounded-md border-hsla">
                {/* Media background - either image or video */}
                {isImage ? (
                    <img
                        src={video} // Using the same 'video' prop name for consistency
                        alt={`${company} - ${title}`}
                        className={`absolute left-0 top-0 size-full object-cover object-center ${isMain ? '' : 'opacity-40'}`}
                    />
                ) : (
                    <video
                        src={video}
                        loop
                        muted
                        autoPlay
                        className={`absolute left-0 top-0 size-full object-cover object-center ${isMain ? '' : 'opacity-40'}`}
                    />
                )}

                {/* Content */}
                <div className="relative z-10 flex size-full flex-col justify-between p-5 md:p-7 text-blue-50">
                    <div>
                        <div className={`text-${isMain ? '2xl md:text-3xl' : 'xl'} bento-title special-font`}>
                            {title}
                            {isMain && <span className="special-font"> <b>H</b>ighlights</span>}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1">
                            <p className="text-violet-300 font-bold">{company}</p>
                            <span className="hidden md:inline text-blue-50 opacity-70">•</span>
                            <p className="text-blue-50 opacity-70 text-sm">{period}</p>
                        </div>
                        {description && (
                            <p className="mt-3 max-w-lg text-sm md:text-base font-circular-web opacity-80">{description}</p>
                        )}
                    </div>

                    {/* Hover gradient effect */}
                    <div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-md"
                        style={{
                            opacity: hoverOpacity,
                            background: `radial-gradient(400px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(87, 36, 255, 0.3), transparent 40%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const Experience = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.from(".experience-title", {
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: ".experience-title",
                start: "top 80%",
            },
            duration: 0.8,
        });
    });

    const experiences = [
        {
            title: "Research Intern",
            company: "IIT Jodhpur",
            period: "May 2025 - Current",
            description: "Selected for a summer internship under the guidance of Dr. Bhivraj Suthar at the School of Artificial Intelligence & Data Science, IIT Jodhpur. Working on research and practical applications in AI and Data Science.",
            video: "img/IITJodhpur.jpeg",
            isImage: true // Specify this is a video
        },
        {
            title: "Software Development Engineer",
            company: "Sigmoyd",
            period: "Mar 2025 - Present",
            description: "Built the frontend for Sigmoyd's AI agent-driven workflow automation platform using React, TypeScript, and Tailwind CSS.",
            video: "img/sigmoyd_logo.jpeg", // Change to image path
            isImage: true // Specify this is an image
        },
        {
            title: "Tribal Intern - Govt. Project",
            company: "Website Developer ",
            period: "Jan 2025 - May 2025",
            description: "Developed a web-based solution using ReactJS and Node.js to improve tribal resource management, integrating databases for efficient tracking and enhancing transparency through a user-friendly interface.",
            video: "img/logo2.png", // Change to image path
            isImage: true // Specify this is an image
        },
    ];

    return (
        <section id="experience" ref={sectionRef} className="bg-black pb-32 pt-20">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 pb-16">
                    <p className="font-circular-web text-lg text-blue-50">
                        My Professional Journey
                    </p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        Through these experiences, I've developed a strong foundation in
                        software development and a passion for creating innovative solutions.
                    </p>
                </div>

                {/* Main experience card */}
                <BentoTilt className="border-hsla relative mb-7  overflow-hidden rounded-md ">
                    <ExperienceCard
                        title="Professional"
                        company="Career Path"
                        period="2022 - Present"
                        description="I've worked across various domains in tech, focusing on web development, machine learning, and user experience. Each role has helped me build a versatile skill set and a keen eye for detail."
                        video="videos/feature-5.mp4"
                        index={0}
                        isMain={true}
                    />
                </BentoTilt>

                {/* Experience grid */}
                <div className="grid h-auto w-full grid-cols-1 md:grid-cols-2 grid-rows-auto gap-7">
                    {experiences.map((exp, index) => (
                        <BentoTilt key={index} className="border-hsla relative h-80 overflow-hidden rounded-md">
                            <ExperienceCard
                                {...exp}
                                index={index + 1}
                            />
                        </BentoTilt>
                    ))}

                    <BentoTilt className="bento-tilt_2">
                        <div className="flex size-full flex-col justify-between bg-blue-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                Always <b>G</b>rowing
                            </h1>
                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>
                </div>

                {/* Call to action */}
                <div className="mt-16 flex justify-center">
                    <a
                        href="#contact"
                        className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-300 px-7 py-3 text-white flex items-center gap-2"
                    >
                        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                            <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                                GET IN TOUCH
                            </div>
                            <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                                GET IN TOUCH
                            </div>
                        </span>
                        <TiLocationArrow />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Experience;
