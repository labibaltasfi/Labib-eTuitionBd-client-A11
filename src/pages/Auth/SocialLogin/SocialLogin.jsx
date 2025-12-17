import React from 'react';

import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);

                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    role: 'student',
                    photoURL: result.user.photoURL,
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                        navigate(location.state || '/');
                    })

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='text-center pb-8'>
            <p className='mb-2'>OR</p>
            <button
                onClick={handleGoogleSignIn}
                className="w-full cursor-pointer py-3 sm:py-4 rounded-xl bg-white text-gray-800 font-semibold
            hover:bg-gray-100 flex items-center justify-center gap-3 transition
            border-2 border-[#192489]"
            >
                <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;