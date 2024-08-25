import React from 'react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">About Us</h1>
            <div className="max-w-4xl text-center space-y-6">
                <p className="text-lg md:text-xl leading-relaxed animate-slideUp">
                    Welcome to our company! We are a passionate team dedicated to delivering the best services to our customers.
                    Our journey began with a simple idea, and today we are proud to serve our community with integrity and excellence.
                </p>
                <p className="text-lg md:text-xl leading-relaxed animate-slideUp">
                    Our mission is to provide high-quality products and services that bring value to our customers. We believe in innovation, creativity, and customer satisfaction.
                    We constantly strive to improve and adapt to the ever-changing market needs.
                </p>
                <p className="text-lg md:text-xl leading-relaxed animate-slideUp">
                    Thank you for choosing us. We look forward to a bright future together!
                </p>
            </div>
            <div className="mt-10">
                <a href="/contact" className="text-lg bg-white px-6 py-3 rounded-full shadow-lg transform transition hover:scale-110">
                    Contact Us
                </a>
            </div>
        </div>
    );
};

export default AboutUs;
