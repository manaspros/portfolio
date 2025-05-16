import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorEffect = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Initial position (off-screen)
        gsap.set(cursor, {
            x: -100,
            y: -100,
            opacity: 0
        });
        gsap.set(follower, {
            x: -100,
            y: -100,
            opacity: 0
        });

        // Fade in the cursor after a delay
        gsap.to([cursor, follower], {
            opacity: 1,
            duration: 0.8,
            delay: 0.3
        });

        const handleMouseMove = (e) => {
            // Set cursor position instantly
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
            });

            // Follower has a slight delay for a trailing effect
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
            });
        };

        const handleMouseDown = () => {
            setIsClicking(true);
        };

        const handleMouseUp = () => {
            setIsClicking(false);
        };

        // Track hover state on interactive elements
        const handleMouseEnter = (e) => {
            if (e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('cursor-pointer')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        // Clean up
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className={`cursor-dot fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference ${isHovering ? 'cursor-hovering' : ''
                    } ${isClicking ? 'cursor-clicking' : ''}`}
            />
            <div
                ref={followerRef}
                className={`cursor-follower fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference ${isHovering ? 'follower-hovering' : ''
                    } ${isClicking ? 'follower-clicking' : ''}`}
            />
        </>
    );
};

export default CursorEffect;
