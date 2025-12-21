import React from 'react';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';


const TuitionList = () => {
   
    const axiosSecure = useAxiosSecure();
   

   

const {
  data: tuition = [],
} = useQuery({
  queryKey: ['tuitionlist', 'approved'],
  queryFn: async () => {
    const res = await axiosSecure.get('/tuitionlist/approved');
    return res.data;
  },
});


console.log(tuition)

    return (
        <div className="min-h-screen  bg-gray-100 p-4 text-black">
            <div className='w-11/12 mx-auto'>
            <h1 className='text-center font-bold text-4xl py-10'>Tuition List</h1>
                <div className='grid md:grid-cols-2 gap-4  justify-items-center'>
                    {
                        tuition.map((tuition) => (
                            <div key={tuition._id} className="w-full max-w-2xl h-35 rounded-2xl shadow-lg bg-[#AEDAE2] my-2">
                        <div className="p-6 flex justify-between items-center">
                            <div>
                                <div className='flex text-xl'><h3 className='font-semibold pr-2'>Class:</h3><p>{tuition.NameOfclass}</p></div>
                                <div className='flex text-xl'><h3 className='font-semibold pr-2'>Subject:</h3><p>{tuition.subjectName}</p></div>
                                <div className='flex text-xl'><h3 className='font-semibold pr-2'>District:</h3><p>{tuition.tuitionDistrict}</p></div>
                            </div>
                            <div>
                                <Link to={`/tuition-details/${tuition._id}`} className="p-4 rounded-xl bg-white   font-medium hover:bg-blue-100 transition">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default TuitionList;