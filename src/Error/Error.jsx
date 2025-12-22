import React from 'react';
import ErrorImage from '../assets/error.jpg'
import { useNavigate } from 'react-router';

const Error = () => {

       const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div>
            <div className='bg-[#d2d2d250] text-center'>
                <div className='flex justify-center items-center  sm:py-42 py-16'>
                    <img src={ErrorImage} alt="Error Image" className='sm:max-w-[500px] max-w-[300px] h-auto' />
                </div>
                <h1 className='sm:text-[48px] text-[30px] font-semibold'>Oops, page not found!d</h1>
                <p className='text-[#00193190] py-5' >The page you are looking for is not available.</p>
                <button
                    onClick={handleGoBack}
                    className="btn mb-10 bg-[#192489] text-white px-8 py-4 rounded-b-sm"
                >
                    Go Back!
                </button>
            </div>
        </div>
    );
};

export default Error;