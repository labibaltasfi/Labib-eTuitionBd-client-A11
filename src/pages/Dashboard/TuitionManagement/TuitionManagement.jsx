import React from 'react';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TuitionManagement = () => {

     const axiosSecure = useAxiosSecure();

   const {refetch, data: tuition = []} = useQuery({
    queryKey: ['tuition', 'pending'],
    queryFn: async() =>{
        const res = await axiosSecure.get('/tuitionlist');
        return res.data;
    }
   })

    const updatetuitionStatus = (tuition, status) => {
        const updateInfo = { status: status, email: tuition.email }
        axiosSecure.patch(`/tuitionlist/${tuition._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `tuition status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = tuition => {
        updatetuitionStatus(tuition, 'approved');
    }

    const handleRejection = tuition => {
        updatetuitionStatus(tuition, 'rejected')
    }


    return (
     <div>
            <h2 className="text-5xl">Tuition Pending Approval: {tuition.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Budget</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tuition.map((tuition, index) => <tr key={tuition._id}>
                                <th>{index + 1}</th>
                                <td>{tuition.studentEmail}</td>
                                <td>{tuition.subjectName}</td>
                                <td>{tuition.budget}</td>
                                <td>
                                    <p className={`${tuition.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{tuition.status}</p>
                                </td>
                                <td>
                                    {tuition.workStatus}
                                </td>
                                <td>
                                     <button
                                         className='btn'>
                                        <FaEye></FaEye>
                                    </button>
                                    <button
                                        onClick={() => handleApproval(tuition)} className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button
                                        onClick={() => handleRejection(tuition)}
                                        className='btn'>
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className='btn'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TuitionManagement;