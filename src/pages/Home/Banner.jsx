import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router';
import bannerImg1 from '../../assets/Banner1.png';
import bannerImg2 from '../../assets/Banner2.png';
import bannerImg3 from '../../assets/Banner3.png';

const Banner = () => {
    const navigate = useNavigate();

    const slides = [
        {
            image: bannerImg1,
            badge: 'Welcome',
            title: 'WELCOME TO eTUITIONBd',
            subtitle: 'Achieve Your Goals. Find Expert Guidance.',
        },
        {
            image: bannerImg2,
            badge: 'Student',
            title: 'STUDENT: CONNECT WITH YOUR BEST TUTOR',
            subtitle: 'Achieve Your Goals. Find Expert Guidance.',
        },
        {
            image: bannerImg3,
            badge: 'Tutor',
            title: 'TUTOR: CHOOSE YOUR BEST TUITION',
            subtitle: 'Unlock Opportunities. Find Your Perfect Match.',
        },
      
    ];

    return (
        <section className="py-4 sm:py-6">
            <Carousel
                autoPlay={true}
                interval={4500}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                emulateTouch={true}
                swipeable={true}
                className="rounded-3xl overflow-hidden border border-base-content/10 shadow-2xl"
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-75 sm:h-107.5 lg:h-130 object-cover"
                        />

                        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-black/20" />

                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full max-w-2xl px-6 sm:px-10 text-left text-white">
                                <span className="inline-block mb-4 text-xs sm:text-sm uppercase tracking-[0.2em] bg-white/20 border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">
                                    {slide.badge}
                                </span>

                                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight drop-shadow-md">
                                    {slide.title}
                                </h1>

                                <p className="mt-4 text-sm sm:text-lg text-white/90 max-w-xl">
                                    {slide.subtitle}
                                </p>

                                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/register')}
                                        className="btn btn-primary rounded-full px-6"
                                    >
                                        Get Started
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/about')}
                                        className="btn btn-outline text-white border-white/70 hover:bg-white hover:text-black rounded-full px-6"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Banner;