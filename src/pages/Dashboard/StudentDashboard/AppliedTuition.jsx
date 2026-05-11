import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

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
            <h1 className="text-center font-bold text-4xl py-10">My Posted Tuitions</h1>

            <div className="mb-6">
                <Link to="/dashboard/PostTuitions" className="btn btn-primary gap-2 group-hover:gap-3 transition-all">
                    + Post New Tuition
                </Link>
            </div>

            <div className="grid gap-6">
                {tuitions.map((tuition) => (
                    <div
                        key={tuition._id}
                        className="border rounded-xl shadow p-6 hover:shadow-lg transition bg-base-100 text-base-content"
                    >
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            {/* Left: Basic Info */}
                            <div className="md:col-span-2">
                                <h2 className="text-2xl font-semibold mb-2">
                                    Class {tuition.NameOfclass} - {tuition.subjectName}
                                </h2>
                                <div className="grid grid-cols-2 gap-3 text-sm md:text-base">
                                    <p><strong>Budget:</strong> ৳{tuition.budget}/month</p>
                                    <p><strong>Region:</strong> {tuition.tuitionRegion}</p>
                                    <p><strong>District:</strong> {tuition.district}</p>
                                    <p><strong>Medium:</strong> {tuition.medium}</p>
                                    <p><strong>Days:</strong> {tuition.selectedDays}</p>
                                    <p><strong>Time:</strong> {tuition.tuitionTime}</p>
                                </div>
                            </div>

                            {/* Right: Status & Actions */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">Status</p>
                                    <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        Active
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-4">
                                    Posted: {new Date(tuition.createdAt || Date.now()).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="border-t pt-4">
                            <p className="mb-3"><strong>Tuition Type:</strong> {tuition.tuitionType}</p>
                            {tuition.address && <p className="mb-3"><strong>Address:</strong> {tuition.address}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <Link
                                to={`/tuition-details/${tuition._id}`}
                                className="px-4 py-4 btn btn-primary gap-2 group-hover:gap-3 transition-all"
                            >
                                View Details
                            </Link>
                            <button
                                className="px-4 py-4 btn btn-warning gap-2 group-hover:gap-3 transition-all"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(tuition._id)}
                                className="btn  transition-all bg-red-500 text-white font-bold hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedTuition;