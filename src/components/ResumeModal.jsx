import { useEffect, useRef } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';
import gsap from 'gsap';

const ResumeModal = ({ isOpen, onClose, resumeImageSrc }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Show animation
            document.body.style.overflow = 'hidden';
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.inOut'
            });
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
        } else {
            // Hide animation (if modal exists)
            if (modalRef.current) {
                document.body.style.overflow = 'auto';
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
                gsap.to(contentRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        }

        // Clean up
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        >
            {/* Overlay with blur effect */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                style={{ opacity: 0 }}
            ></div>

            {/* Modal content */}
            <div
                ref={contentRef}
                className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-[#121212] shadow-2xl"
                style={{ opacity: 0 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-violet-700 p-4">
                    <h3 className="text-xl font-bold text-white">My Resume</h3>
                    <div className="flex items-center gap-4">
                        <a
                            href={resumeImageSrc}
                            download="Manas_Choudhary_Resume.pdf"
                            className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white transition-colors hover:bg-white/30"
                        >
                            <FaDownload /> Download
                        </a>
                        <button
                            onClick={onClose}
                            className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/30"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Resume image with scroll */}
                <div className="max-h-[calc(90vh-5rem)] overflow-auto p-2 md:p-6">
                    <img
                        src={resumeImageSrc}
                        alt="Resume"
                        className="mx-auto w-full rounded-md shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
