import React from 'react';
import logo from '../../assets/open-book.png'
const Loading = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-base-100 text-base-content transition-colors duration-300">
                  <div className="flex">
                    <img className="animate-spin h-10 w-10 mr-7 mt-3" src={logo} alt="" /> <h1 className="text-[50px] font-bold"> Loading...</h1>
                  </div>
                </div>
        </div>
    );
};

export default Loading;