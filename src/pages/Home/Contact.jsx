import React from 'react';
import { ToastContainer } from 'react-toastify';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <title>Contact Us</title>

      <div className="card bg-base-200 text-base-content py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-3xl shadow-2xl transition-colors duration-300">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
          Contact Us
        </h2>

        <p className="text-center text-base-content/75 mb-6">
          Have questions or need support? Send us a message and we’ll get back to you.
        </p>

        {/* Contact Form */}
        <form className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 sm:p-4 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 sm:p-4 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="p-3 sm:p-4 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 sm:py-4 rounded-xl bg-primary text-primary-content font-semibold hover:brightness-110 transition"
          >
            Send Message
          </button>
        </form>

        {/* Footer */}
        <p className="pt-6 text-center text-base-content/75">
          We usually respond within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default Contact;
