import React, { useEffect } from 'react';
import gsap from 'gsap'; // Import GSAP
import './InfiniteMarquee.css';

const InfiniteMarquee = () => {
    useEffect(() => {
        const rows = document.querySelectorAll(".cb-tagreel-row");

        rows.forEach((e, i) => {
            let rowWidth = e.getBoundingClientRect().width;
            let rowItemWidth = e.children[0].getBoundingClientRect().width;
            let initialOffset = ((2 * rowItemWidth) / rowWidth) * 100 * -1;
            let xTranslation = initialOffset * -1;

            gsap.set(e, {
                xPercent: initialOffset
            });

            let duration = 5 * (i + 1);

            var tl = gsap.timeline();

            tl.to(e, {
                ease: "none",
                duration: duration,
                xPercent: 0,
                repeat: -1
            });
        });
    }, []);

    return (
        <div className="cb-tagreel-content">
            <div className="cb-tagreel-items" role="marquee">
                <div className="cb-tagreel-row">
                    <div className="cb-tagreel-item"><span>FASHION</span></div>
                    <div className="cb-tagreel-item -stroke"><span>FASHION</span></div>
                    <div className="cb-tagreel-item"><span>FASHION</span></div>
                    <div className="cb-tagreel-item -stroke"><span>FASHION</span></div>
                    <div className="cb-tagreel-item"><span>FASHION</span></div>
                </div>
            </div>
        </div>
    );
}

export default InfiniteMarquee;