// src/PhotoCarousel.js
import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const PhotoCarousel = ({ images }) => {
    return (
        <div className="w-full h-90 sm:h-96 md:h-1/2 mx-auto relative">
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false}
                interval={6000}
                className="w-full h-full"
                bullets={false}
                organicArrows={true}
                infinite={true}
                mobileTouch={true}
            >
                {images.map((image, index) => (
                    <div key={index} className="flex justify-center items-center w-full h-full bg-white dark:bg-gray-800">
                        <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </AutoplaySlider>
        </div>
    );
};

export default PhotoCarousel;