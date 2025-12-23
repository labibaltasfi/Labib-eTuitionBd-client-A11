import React from 'react'
import logo from '../assets/open-book.png'


const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex">
        <img className="animate-spin h-30 w-30 mr-7 mb-3" src={logo} alt="" /> <h1 className="text-[50px] font-bold"> Loading...</h1>
      </div>
    </div>
  )
}

export default LoadingSpinner