import { useState, useEffect, useRef } from "react";
import { FaTerminal, FaTimes, FaChevronRight } from "react-icons/fa";
import gsap from "gsap";
import { scrollToSection } from "../utils/scrollUtils";

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        {
            type: "system",
            text: "Welcome to Manas Choudhary's portfolio terminal. Type 'help' for available commands.",
        },
    ]);
    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const historyEndRef = useRef(null);
    const tooltipRef = useRef(null);
    const buttonRef = useRef(null);

    // Show tooltip hint when page loads
    useEffect(() => {
        // Show tooltip after a brief delay
        const tooltipTimeline = gsap.timeline();

        tooltipTimeline.fromTo(
            tooltipRef.current,
            {
                opacity: 0,
                y: 20,
                scale: 0.8,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                delay: 3, // Wait 3 seconds before showing
                ease: "back.out(1.7)",
            }
        );

        // Highlight button
        tooltipTimeline.to(
            buttonRef.current,
            {
                boxShadow: "0 0 15px 5px rgba(87, 36, 255, 0.7)",
                duration: 0.5,
                repeat: 2,
                yoyo: true,
            },
            ">-0.2"
        );

        // Hide tooltip after 5 seconds
        tooltipTimeline.to(
            tooltipRef.current,
            {
                opacity: 0,
                y: 10,
                duration: 0.5,
                delay: 4,
                ease: "power2.in",
                onComplete: () => {
                    if (tooltipRef.current) {
                        tooltipRef.current.style.display = "none";
                    }
                },
            },
            ">"
        );

        return () => {
            tooltipTimeline.kill();
        };
    }, []);

    const toggleTerminal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                terminalRef.current,
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
            );
            inputRef.current?.focus();
        } else {
            gsap.to(terminalRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    }, [isOpen]);

    useEffect(() => {
        // Scroll to bottom when history changes
        historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const processCommand = (cmd) => {
        const command = cmd.trim().toLowerCase();

        // Add user command to history
        setHistory((prev) => [
            ...prev,
            { type: "user", text: `$ ${command}` },
        ]);

        // Process command
        setTimeout(() => {
            let response;

            switch (command) {
                case "help":
                    response = {
                        type: "system",
                        text: `
Available commands:
- about: Learn about me
- skills: View my technical skills
- experience: See my work experience
- projects: View my projects
- contact: Get my contact details
- clear: Clear the terminal
- secret: Try to find my secret Easter eggs!
            `,
                    };
                    break;

                case "about":
                    response = {
                        type: "system",
                        text: "Navigating to About section...",
                        action: () => scrollToSection("about"),
                    };
                    break;

                case "skills":
                    response = {
                        type: "system",
                        text: "Navigating to Skills section...",
                        action: () => scrollToSection("skills"),
                    };
                    break;

                case "experience":
                    response = {
                        type: "system",
                        text: "Navigating to Experience section...",
                        action: () => scrollToSection("experience"),
                    };
                    break;

                case "projects":
                    response = {
                        type: "system",
                        text: "Navigating to Projects section...",
                        action: () => scrollToSection("projects"),
                    };
                    break;

                case "contact":
                    response = {
                        type: "system",
                        text: "Navigating to Contact section...",
                        action: () => scrollToSection("contact"),
                    };
                    break;

                case "clear":
                    setHistory([
                        {
                            type: "system",
                            text: "Terminal cleared. Type 'help' for available commands.",
                        },
                    ]);
                    return;

                case "hello":
                case "hi":
                    response = {
                        type: "system",
                        text: "Hello there! How can I help you navigate this portfolio today?",
                    };
                    break;

                case "who are you":
                    response = {
                        type: "system",
                        text: "I'm a virtual assistant for Manas's portfolio. Not quite an AI, but I can help you navigate!",
                    };
                    break;

                case "secret":
                    response = {
                        type: "system",
                        text: "🕵️‍♂️ Looking for secrets? Try commands like 'coffee', 'joke', 'music', or 'hackerman'",
                    };
                    break;

                case "coffee":
                    response = {
                        type: "system",
                        text: "☕ Coffee is the secret ingredient behind every good code. Manas runs on it too!",
                    };
                    break;

                case "joke":
                    const jokes = [
                        "Why do programmers prefer dark mode? Because light attracts bugs!",
                        "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
                        "Why do Java developers wear glasses? Because they don't C#!",
                        "What's a programmer's favorite place? The Foo Bar!",
                    ];
                    response = {
                        type: "system",
                        text: `😂 ${jokes[Math.floor(Math.random() * jokes.length)]}`,
                    };
                    break;

                case "music":
                    response = {
                        type: "system",
                        text: "🎵 Try clicking the audio equalizer in the navbar! I hear Manas codes best with some beats.",
                    };
                    break;

                case "hackerman":
                    response = {
                        type: "system",
                        text: `
I'm in... 🕶️
            
01001001 00100000 01100001 01101101 00100000 01110100 01101000 01100101 00100000 01101111 01101110 01100101 00100000 01110111 01101000 01101111 00100000 01101011 01101110 01101111 01100011 01101011 01110011
            `,
                    };
                    break;

                case "cv":
                case "resume":
                    response = {
                        type: "system",
                        text: "Opening Resume...",
                        action: () => document.querySelector("[data-resume-button]").click(),
                    };
                    break;

                default:
                    response = {
                        type: "system",
                        text: `Command not found: ${command}. Type 'help' for available commands.`,
                    };
            }

            setHistory((prev) => [...prev, response]);
            if (response.action) {
                setTimeout(response.action, 500);
            }
        }, 200);

        // Clear input
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (input.trim()) {
                processCommand(input);
            }
        }
    };

    return (
        <>
            {/* Terminal toggle button */}
            <button
                ref={buttonRef}
                onClick={toggleTerminal}
                className="group fixed bottom-4 right-4 z-40 flex size-12 items-center justify-center rounded-full bg-violet-300 text-white shadow-lg transition-all hover:bg-violet-600"
                title="Terminal"
            >
                <FaTerminal className="text-xl" />
            </button>

            {/* Tooltip hint */}
            <div
                ref={tooltipRef}
                className="fixed bottom-20 right-8 z-40 w-56 rounded-lg bg-black bg-opacity-80 p-3 text-white shadow-lg backdrop-blur-sm"
                style={{ opacity: 0 }}
            >
                <div className="text-xs font-medium">
                    Try the terminal! Type <span className="text-violet-300 font-bold">help</span> for commands
                </div>
                <div className="absolute -bottom-2 right-4 h-0 w-0 border-x-8 border-t-8 border-transparent border-t-black border-opacity-80"></div>
            </div>

            {/* Terminal window */}
            <div
                ref={terminalRef}
                className="fixed bottom-20 right-4 z-40 w-full max-w-md overflow-hidden rounded-lg bg-[#121212] shadow-2xl"
                style={{ height: 0, opacity: 0 }}
            >
                {/* Terminal header */}
                <div className="flex items-center justify-between bg-violet-700 px-4 py-2 text-white">
                    <div className="flex items-center gap-2">
                        <FaTerminal />
                        <span className="text-sm font-semibold">Terminal</span>
                    </div>
                    <button
                        onClick={toggleTerminal}
                        className="rounded-full p-1 hover:bg-white/20"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Terminal content */}
                <div className="h-80 overflow-y-auto p-4 font-mono text-sm text-gray-300">
                    {history.map((entry, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${entry.type === "user" ? "text-blue-400" : "text-gray-300"
                                }`}
                        >
                            <pre className="whitespace-pre-wrap font-mono">{entry.text}</pre>
                        </div>
                    ))}
                    <div className="flex items-center text-blue-400">
                        <FaChevronRight className="mr-2" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent font-mono text-sm text-blue-400 outline-none"
                            placeholder="Type a command..."
                            autoFocus={isOpen}
                        />
                    </div>
                    <div ref={historyEndRef} />
                </div>
            </div>
        </>
    );
};

export default Terminal;