import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit, FaEye } from "react-icons/fa";

const AppliedTuition = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: allTuitions = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["tuitionlist", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/tuitionlist");
            return res.data;
        },
        enabled: !!user?.email,
    });

    const tuitions = Array.isArray(allTuitions)
        ? allTuitions.filter(t => t.studentEmail === user?.email)
        : [];

    const handleDelete = async (tuitionId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This tuition post will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.delete(`/tuitionlist/${tuitionId}`);

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your tuition post has been deleted.",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Something went wrong. Please try again.",
            });
            console.error(error);
        }
    };

    if (isLoading) return <div className="text-center mt-10 text-xl">Loading your tuitions...</div>;
    if (isError) return <div className="text-center mt-10 text-xl text-red-500">Error fetching tuitions</div>;
    if (tuitions.length === 0)
        return (
            <div className="text-center mt-10 p-10">
                <p className="text-xl text-gray-600 mb-4">You haven't posted any tuitions yet.</p>
                <Link to="/post-tuitions" className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600">
                    Post Your First Tuition
                </Link>
            </div>
        );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-center font-bold text-4xl py-10">My Applied Tuitions</h1>

            <div className="mb-6">
                <Link to="/dashboard/PostTuitions" className="btn btn-primary gap-2">
                    + Apply New Tuition
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden sm:block">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class & Subject</th>
                            <th>Budget</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.map((tuition, index) => (
                            <tr key={tuition._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div>
                                        <div className="font-bold">Class {tuition.NameOfclass}</div>
                                        <div className="text-sm opacity-50">{tuition.subjectName}</div>
                                    </div>
                                </td>
                                <td>৳{tuition.budget}/month</td>
                                <td>{tuition.tuitionDistrict || tuition.district || 'N/A'}</td>
                                <td>
                                    {tuition.status ? (
                                        <span className={`badge gap-2 ${tuition.status === 'approved' ? 'badge-success' : tuition.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                                            {tuition.status}
                                        </span>
                                    ) : (
                                        <span className="badge badge-neutral">unknown</span>
                                    )}
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/tuitionlist/${tuition._id}`}
                                            className="btn btn-sm btn-ghost"
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-ghost"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tuition._id)}
                                            className="btn btn-sm btn-ghost hover:bg-red-500"
                                            title="Delete"
                                        >
                                            <FaTrashCan />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Table */}
            <div className="overflow-x-auto sm:hidden">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tuition</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.map((tuition, index) => (
                            <tr key={tuition._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div>
                                        <div className="font-bold">Class {tuition.NameOfclass}</div>
                                        <div className="text-sm opacity-50">{tuition.subjectName}</div>
                                        <div className="text-sm">৳{tuition.budget}/month</div>
                                        <div className="text-xs opacity-50">{tuition.tuitionDistrict || tuition.district}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            to={`/tuitionlist/${tuition._id}`}
                                            className="btn btn-xs btn-primary"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(tuition._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppliedTuition;