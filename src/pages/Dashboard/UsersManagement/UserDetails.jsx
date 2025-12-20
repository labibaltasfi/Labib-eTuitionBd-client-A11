import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const user = useLoaderData();
    console.log(user)
    return (
      <div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 py-10'>User Details</h1>
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">

            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#192489] shadow-md mb-4">
                <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>


            <h2 className="text-2xl font-bold text-gray-800">
                {user?.displayName}
            </h2>


            <span className="mt-2 px-4 py-1 text-sm font-semibold rounded-full bg-[#192489]/10 text-[#192489]">
                {user?.role}
            </span>


            <div className="mt-6 w-full space-y-3 text-left">
                <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">Email</span>
                    <span className="text-gray-800">{user?.email}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">Mobile</span>
                    <span className="text-gray-800">{user?.mobile || "N/A"}</span>
                </div>
            </div>
        </div>
      </div>

    );
};

export default UserDetails;