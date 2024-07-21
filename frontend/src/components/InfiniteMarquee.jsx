import React from 'react';
import './InfiniteMarquee.css';

const InfiniteMarquee = ({ text }) => {
    return (
        <div className="marquee-container dark:bg-slate-800">
            <div className="marquee-content">
                {[...Array(10)].map((_, index) => (
                    <span key={index} className="marquee-item">{text}</span>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;