import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'locomotive-scroll/dist/locomotive-scroll.css';

gsap.registerPlugin(ScrollTrigger);

const InfiniteMarquee = ({ text }) => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marqueeElement = marqueeRef.current;

        // Clone the content for seamless looping
        marqueeElement.innerHTML += marqueeElement.innerHTML;

        const animation = gsap.to(marqueeElement, {
            x: "-50%",
            ease: "none",
            duration: 20,
            repeat: -1,
        });

        // Pause animation when out of viewport
        ScrollTrigger.create({
            trigger: marqueeElement,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => animation.play(),
            onLeave: () => animation.pause(),
            onEnterBack: () => animation.play(),
            onLeaveBack: () => animation.pause(),
        });

        // Cleanup function
        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-700 py-10">
            <div ref={marqueeRef} className="flex whitespace-nowrap">
                {[...Array(10)].map((_, index) => (
                    <span key={index} className="text-4xl font-bold px-10 text-gray-800 dark:text-gray-200">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;