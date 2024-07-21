import React from 'react'
import PhotoCarousel from '../components/Carousel';

const Hero = () => {
  const images = [
    'https://images.unsplash.com/photo-1593642634367-d91a135587b5?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533827432537-70133748f5c8?fit=crop&w=800&q=80',
  ];

  return (
    <div className='h-screen dark:bg-gray-800 dark:opacity-60'>
      <PhotoCarousel images={images} />
    </div>
  )
}

export default Hero