import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedApp, setSelectedApp] = useState(null);
    const { user } = useAuth();
    
    const { data: applications = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['my-apps', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-applications?email=${user?.email}`);
            return res.data;
        }
    });

    const handleUpdate = (app) => {
        setSelectedApp(app); 
        document.getElementById('edit_modal').showModal(); 
    };

    const onUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const salary = form.salary.value;
        const exp = form.experience.value;

        const updateData = {
            expectedSalary: salary,
            experience: exp,
            email: user.email 
        };

        const res = await axiosSecure.patch(`/my-applications/${selectedApp._id}`, updateData);
        if (res.data.modifiedCount > 0) {
            refetch();
            document.getElementById('edit_modal').close();
            Swal.fire("Success!", "Application updated.", "success");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/my-applications/${id}?email=${user.email}`);
                if (res.data.deletedCount > 0) {
                    refetch(); 
                    Swal.fire("Deleted!", "Your application has been removed.", "success");
                }
            }
        });
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10">Error fetching data</div>;
    if (applications.length === 0)
        return <div className="text-center mt-10">No applications found.</div>;

    return (
        <div>
            <h2 className="text-5xl">My Application</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((app) => <tr key={app._id}>

                                <td>{app.StudentName}
                                </td>
                                <td>{app.NameOfclass}
                                </td>
                                <td> {app.subjectName}
                                </td>
                                <td>
                                    <p className={`${app.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{app.status}</p>
                                </td>
                                <td>
                                    {app.status === 'pending' ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdate(app)}
                                                disabled={app.status !== 'pending'}
                                                className="btn btn-xs btn-outline btn-primary mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(app._id)}
                                                className="btn btn-xs btn-outline btn-error"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">Locked</span>
                                    )}
                                </td>
                                <td>


                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            <dialog id="edit_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Request for {selectedApp?.subjectName}</h3>
                    <form onSubmit={onUpdateSubmit} className="space-y-4 mt-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Expected Salary (BDT)</span></label>
                            <input name="salary" type="number" defaultValue={selectedApp?.expectedSalary} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Experience (Years)</span></label>
                            <input name="experience" type="text" defaultValue={selectedApp?.experience} className="input input-bordered" required />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <button type="button" className="btn" onClick={() => document.getElementById('edit_modal').close()}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyApplications;