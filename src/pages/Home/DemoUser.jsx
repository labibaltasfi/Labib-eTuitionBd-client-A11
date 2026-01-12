import React from 'react';
import Swal from 'sweetalert2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const DemoUser = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 🔹 Fetch demo user from MongoDB
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['demo-user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/demo');
      return res.data;
    },
  });

  const handleRoleChange = async (newRole) => {
    try {
      const res = await axiosSecure.patch(
        `/users/${user._id}/role`,
        { role: newRole }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Role Updated',
          text: `You are now a ${newRole}`,
          timer: 2000,
          showConfirmButton: false,
        });

        queryClient.invalidateQueries(['demo-user']);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Something went wrong',
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load demo user</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-3xl font-semibold mb-10">
        This page is for Demo User only
      </h3>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-28 h-28 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              <p className="text-gray-500">{user.email}</p>
              <span className="badge badge-primary mt-2">{user.role}</span>
            </div>
          </div>

          <div className="divider" />

          {/* Role Change */}
          <table className="table">
            <thead>
              <tr>
                <th>Current Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-black"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="divider" />

          <button className="btn btn-outline" onClick={() => navigate('/')}>
            Back to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default DemoUser;
