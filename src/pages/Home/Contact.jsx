import React from 'react';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const Contact = () => {
  const axiosPublic = useAxios();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please fill out name, email, and message.',
      });
      return;
    }

    const payload = { name, email, message };

    try {
      setIsSubmitting(true);
      const res = await axiosPublic.post('/contacts', payload);

      if (res.data?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Message sent',
          text: 'Thanks for reaching out. We will get back to you soon.',
        });
        form.reset();
        return;
      }

      Swal.fire({
        icon: 'info',
        title: 'Request completed',
        text: res.data?.message || 'Your message was submitted.',
      });
      form.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to send',
        text: error.response?.data?.message || 'Could not send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Your Name</label>
            <input
              name="name"
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
              name="email"
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
              name="message"
              rows="4"
              placeholder="Write your message..."
              className="p-3 sm:p-4 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer py-3 sm:py-4 rounded-xl bg-primary text-primary-content font-semibold hover:brightness-110 transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
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
