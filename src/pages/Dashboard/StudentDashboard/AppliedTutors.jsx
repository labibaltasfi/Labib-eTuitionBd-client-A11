import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AppliedTutors = () => {
    const axiosSecure = useAxiosSecure();


    const { data: tuitions = [], isLoading, isError } = useQuery({
        queryKey: ["tuitions-with-applications"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tuitions-with-applications");
            return res.data;
        },
    });



    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10">Error fetching data</div>;
    if (tuitions.length === 0)
        return <div className="text-center mt-10">No applications found.</div>;


    const handlePayment = async (app) => {
        const paymentInfo = {
            expectedSalary: app.expectedSalary,
            applicationId: app._id,
            tutorEmail: app.tutorEmail,
            tutorName: app.tutorName,
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

        console.log(res.data.url);
        window.location.assign(res.data.url);
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Applied Tutors</h1>

            {tuitions.map(({ tuition, applications }) => (
                <div
                    key={tuition._id}
                    className="border rounded-xl shadow p-4 mb-6 hover:shadow-lg transition"
                >
                    {/* Tuition Info */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Class: {tuition.NameOfclass}
                            </h2>
                            <p className="text-gray-600">Subject: {tuition.subjectName}</p>
                        </div>
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                            {applications.length} Application{applications.length > 1 && "s"}
                        </span>
                    </div>


                    {applications.length > 0 ? (
                        <div className="space-y-4">
                            {applications.map((app) => (
                                <div
                                    key={app._id}
                                    className="flex flex-col md:flex-row items-center justify-between border rounded-lg shadow p-4 hover:shadow-lg transition"
                                >

                                    <div className="flex items-center space-x-4">

                                        <img
                                            src={app.photo || "/default-profile.png"}
                                            alt={app.tutorName}
                                            className="w-16 h-16 rounded-full object-cover border"
                                        />


                                        <div>
                                            <h3 className="text-lg font-semibold">{app.tutorName}</h3>
                                            <p className="text-gray-600 text-sm">Qualifications: {app.qualifications}</p>
                                            <p className="text-gray-600 text-sm">Experience: {app.experience}</p>
                                            <p className="text-gray-600 text-sm">Expected Salary: {app.expectedSalary}</p>
                                        </div>
                                    </div>


                                    <div className="flex space-x-2 mt-4 md:mt-0">
                                        {
                                            app.status === 'paid' ?
                                                <button className='px-4  py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-[#141d6f] transition shadow-lg'>Paid</button>
                                                :
                                                <button onClick={() => handlePayment(app)} className="px-4  py-4 bg-[#192489] text-white rounded-xl font-bold hover:bg-[#141d6f] transition shadow-lg">
                                                    Accept
                                                </button>
                                        }
                                        <button className="px-4 py-2 bg-red-500 font-bold text-white rounded-lg hover:bg-red-600 transition">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p className="text-gray-500">No tutors applied yet.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AppliedTutors;
