import React from "react";
import { Link } from "react-router";
import { FaFacebookF,  FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../../assets/open-book.png"

const Footer = () => {
    return (
        <footer className="bg-[#151B72] text-gray-300 py-6 pt-12">
            <div className="p-5 w-11/12 mx-auto">
                <div className="grid lg:grid-cols-5 grid-cols-3  mb-20 ">
                    <div className="lg:col-span-2 col-span-3">
                        <h2 className="font-extrabold text-4xl flex text-white items-center pb-5">
                            <img className="h-15 w-15 mr-2" src={logo} alt="" />
                            eTutionbd
                        </h2>
                        <p className="2xl:pr-30 pr-15 lg:pb-0 pb-15">eTutionbd is a comprehensive tuition management platform that connects students and tutors in one system. It enables tuition posting and tutor applications between students and tutors.</p>
                    </div>
                    
                    


                    <div className="flex flex-col  gap-4 ">
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaFacebookF /> Facebook
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                           <FaXTwitter /> Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaInstagram /> Instagram
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaYoutube /> YouTube
                        </a>
                    </div>

                    <div className="ml-5">
                        <div>
                            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="hover:text-white transition">Home</Link>
                                </li>
                                <li>
                                    <Link to="/allMovies" className="hover:text-white transition">Tuitions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="sm:col-span-1 sm:mt-0 col-span-3 mt-10">
                        <div>
                            <h3 className="text-white font-semibold mb-4">Contact us</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="hover:text-white transition">+8809638398027</Link>
                                </li>
                                <li>
                                    <Link to="/allMovies" className="hover:text-white transition">labiballtasfi11@gmail.com</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <hr />
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-5">
                    <p className="text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} eTutionbd. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors text-sm">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
