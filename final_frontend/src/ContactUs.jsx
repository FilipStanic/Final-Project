import React from 'react';

const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end p-6">
            <h1 className="text-4xl font-bold  mb-8 animate-fadeIn">Contact Us</h1>
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 animate-slideUp">
                <form className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-end focus:border-transparent"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-end focus:border-transparent"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">
                            Message
                        </label>
                        <textarea
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-end focus:border-transparent"
                            placeholder="Your Message"
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 border border-[#093a74] text-[#093a74] rounded-lg font-medium"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
