import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleRoleChange = async (user, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });
            if (res.data.modifiedCount) {
                refetch(); // refresh users list
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.displayName} is now a ${newRole}`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Failed to update role',
            });
        }
    };


     const handleUserDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {
                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "user has been deleted.",
                                icon: "success"
                            });
                        }

                    })


            }
        });

    }



    return (
        <div>
            <h2 className='text-4xl'>Manage Users: {users.length}</h2>
            <p>search text: {searchText}</p>
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="grow"
                    placeholder="Search users" />

            </label>
            <div className="overflow-x-auto hidden sm:block">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr key={user._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                <div className="flex items-center gap-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                            className="border rounded-lg p-2 bg-white text-black cursor-pointer"
                                        >
                                            <option value="student">student</option>
                                            <option value="tutor">tutor</option>
                                            <option value="admin">admin</option>
                                        </select>
                                   
                                </div>

                            </td>
                            <th>
                                <button
                                        onClick={() => handleUserDelete(user._id)}
                                        className='btn btn-square hover:bg-primary'>
                                        <FaTrashCan />
                                    </button>
                                     <button
                                className="btn btn-primary ml-3"
                                onClick={() => navigate(`${user._id}`)}
                            >
                                Update
                            </button>
                                     <button
                                className="btn btn-primary ml-3"
                                onClick={() => navigate(`user-details/${user._id}`)}
                            >
                                Details
                            </button>
                            </th>
                        </tr>)}
                    </tbody>
                </table>
            </div>


{/* mobile card  */}
 <div className="overflow-x-auto sm:hidden">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Admin Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr key={user._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="">  {user.email}</div>
                                        <div className="">  {user.role}</div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center gap-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                            className="border rounded-lg p-2 bg-white text-black cursor-pointer"
                                        >
                                            <option value="student">student</option>
                                            <option value="tutor">tutor</option>
                                            <option value="admin">admin</option>
                                        </select>
                                   
                                </div>

                            </td>
                        </tr>)}



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UsersManagement;