import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, description, image, link, index }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const element = cardRef.current;

        if (!element) return;

        const rect = element.getBoundingClientRect();
        const xPos = clientX - rect.left;
        const yPos = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((yPos - centerY) / centerY) * -8;
        const rotateY = ((xPos - centerX) / centerX) * 8;

        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500,
            ease: "power1.inOut",
        });
    };

    const handleMouseLeave = () => {
        const element = cardRef.current;

        if (element) {
            gsap.to(element, {
                duration: 0.3,
                rotateX: 0,
                rotateY: 0,
                ease: "power1.inOut",
            });
        }
    };

    return (
        <div
            className="project-card w-full bg-zinc-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
            style={{
                transitionDelay: `${index * 0.1}s`,
            }}
        >
            <div
                ref={cardRef}
                className="project-card-inner h-full flex flex-col"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="project-card-image h-48 overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="project-card-content p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                    <div className="mb-4 flex-1">
                        <p className="text-sm text-gray-300">{description}</p>
                        <p className="text-xs text-blue-400 mt-2">
                            <span className="font-bold">GitHub:</span> {link.replace('https://github.com/', '')}
                        </p>
                    </div>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
                        <Button
                            title="view project"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 text-black mt-2"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const projects = gsap.utils.toArray(".project-card");

        // Create stagger animation for project cards - modify to ensure they become visible
        gsap.to(projects, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
        });

        // Animate title
        gsap.from(".projects-title", {
            scrollTrigger: {
                trigger: ".projects-title",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
        });
    });

    const projects = [
        {
            title: "TechStack Chatbot",
            description: "TechStack GPT - AI chatbot that helps users learn programming by generating personalized learning paths, coding Q&A, and project recommendations. Built with Next.js, Node.js, Tailwind, and Google Gemini API.",
            image: "/img/project3.jpg",
            link: "https://github.com/manaspros/TechStack-Chatbot",
        },
        {
            title: "Food Ordering with Recommedation System",
            description: "This is a food ordering system that includes an AI-based recommendation system to enhance the user experience. The system provides personalized meal recommendations based on user preferences and past orders. The platform integrates a ReactJS frontend with an Express.js backend, and it uses MongoDB for data storage. Features",
            image: "/img/project1.jpg",
            link: "https://github.com/manaspros/shop_project",
        },
        {
            title: "Expense Tracking",
            description: "Cross-platform app built with React Native. Log, track, and categorize expenses using Firebase and Redux.",
            image: "/img/project2.jpg",
            link: "https://github.com/manaspros/trackingapp",
        },
        {
            title: "Sentiment Analysis",
            description: "SentimentFinder is a web-based sentiment analysis tool designed to analyze YouTube videos and channels. It provides sentiment-based insights into user comments, offering a visual representation of audience reactions and feedback.",
            image: "/img/project4.jpg",
            link: "https://github.com/manaspros/sentiment-analysis",
        },
    ];

    return (
        <div id="projects" className="min-h-dvh w-screen bg-black text-blue-50">
            <div className="container mx-auto px-4 py-24">
                <div className="mb-16 flex flex-col items-center">
                    <p className="font-general text-sm uppercase text-white md:text-[10px]">
                        my recent work
                    </p>

                    <AnimatedTitle
                        title="Creat<b>i</b>ve<br />Pro<b>j</b>ects"
                        containerClass="projects-title mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />
                </div>

                <div ref={containerRef} className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
