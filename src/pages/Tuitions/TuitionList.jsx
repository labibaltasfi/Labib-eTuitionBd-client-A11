import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';


const TuitionList = () => {
    // const { tuitionId } = useParams();
    const axiosInstance = useAxios();
    const [tuition, setTuition] = useState([])
    const [loading, setLoading] = useState(true);

    // const {data: tuitionlist = []} = useQuery({
    //     queryKey: ['tracking', tuitionId],
    //     queryFn: async () =>{
    //         const res  = await axiosInstance.get(`/trackings/${tuitionId}/logs`)
    //         console.log(res.data)
    //         return res.data;
    //     }
    // })

useEffect(() => {
        axiosInstance
            .get("/tuitionlist")
            .then(res => {
                setTuition(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosInstance, ]);

console.log(tuition)

    return (
        <div className="min-h-screen  bg-gray-100 p-4 text-black">
            <div className='w-11/12 mx-auto'>
            <h1 className='text-center font-bold text-4xl py-10'>Tuition List</h1>
                <div className='grid md:grid-cols-2  justify-items-center'>
                    {
                        tuition.map((tuition) => (
                            <div key={tuition._id} className="w-full max-w-2xl h-35 rounded-2xl shadow-lg bg-[#AEDAE2] my-10">
                        <div className="p-6 flex justify-between items-center">
                            <div>
                                <div className='flex text-xl'><h3 className='font-semibold pr-2'>Class:</h3><p>{tuition.NameOfclass}</p></div>
                                <div className='flex text-xl'><h3 className='font-semibold pr-2'>Subject:</h3><p>{tuition.subjectName}</p></div>
                                <div className='flex text-xl'><h3 className='font-semibold pr-2'>District:</h3><p>{tuition.tuitionDistrict}</p></div>
                            </div>
                            <div>
                                <button className="p-4 rounded-xl bg-white   font-medium hover:bg-blue-100 transition">
                                    Details
                                </button>
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