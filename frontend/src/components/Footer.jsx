import React from 'react';

const Footer = () => {
    return (
        <div className='bg-gray-500 p-5'>
            <div className='flex justify-between items-center'>
                <div className='text-white'>
                    Footer
                </div>
                <div className='flex space-x-4 text-white'>
                    <span>Contact</span>
                    <span>About Us</span>
                    <span>Ecom Pvt Ltd</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
