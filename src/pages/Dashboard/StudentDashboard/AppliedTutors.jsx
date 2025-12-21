import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AppliedTutors = () => {
    const { tuitionId } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ["applied-tutors", tuitionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/${tuitionId}`);
            return res.data;
        }
    });

    console.log(applications)

    const handleAcceptTutor = (app) => {
        navigate("/dashboard/checkout", { 
            state: { 
                applicationId: app._id, 
                tuitionId: app.tuitionId,
                salary: app.expectedSalary,
                tutorName: app.tutorName 
            } 
        });
    };

    if (isLoading) return <span className="loading loading-dots loading-lg"></span>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-[#192489]">🧑‍🏫 View Tutor Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app) => (
                    <div key={app._id} className="card bg-white shadow-xl border-t-4 border-[#192489]">
                        <div className="card-body p-5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="avatar">
                                    <div className="w-16 rounded-full ring ring-[#192489] ring-offset-base-100 ring-offset-2">
                                        <img src={app.tutorImage || "https://i.ibb.co/mJR9Qxc/user.png"} alt="Tutor" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{app.tutorName}</h3>
                                    <p className="text-xs text-gray-500 uppercase font-bold">{app.status}</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-700">
                                <p><strong>🎓 Quals:</strong> {app.qualifications}</p>
                                <p><strong>⏳ Exp:</strong> {app.experience}</p>
                                <p className="text-lg font-bold text-[#192489]">৳ {app.expectedSalary}</p>
                            </div>

                            <div className="card-actions mt-6 flex gap-2">
                                <button 
                                    onClick={() => handleAcceptTutor(app)}
                                    className="btn btn-primary flex-1 bg-[#192489] hover:bg-[#141d6f] border-none text-white"
                                >
                                    Accept Tutor
                                </button>
                                <button className="btn btn-outline btn-error flex-1">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {applications.length === 0 && <p className="text-center text-gray-500 italic">No applications yet.</p>}
        </div>
    );
};

export default AppliedTutors;