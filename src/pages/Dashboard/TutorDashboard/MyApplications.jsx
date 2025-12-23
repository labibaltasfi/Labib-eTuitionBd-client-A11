import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyApplications = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
   // Example using Axios
const { data: applications = [], isLoading, isError } = useQuery({
    queryKey: ['my-tuitions-apps', user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/tuitions-with-applications/by-tutor?email=${user?.email}`);
        console.log(res.data)
        return res.data;
    }
})
 if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10">Error fetching data</div>;
    if (applications.length === 0)
        return <div className="text-center mt-10">No applications found.</div>;

    return (
       <div>
            <h2 className="text-5xl"> Payment history </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Tuition</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((item) => <tr key={item.application?._id}>
                              
                                <td>{item.studentName}
                                </td>
                                <td>
                                    {item.subjectName}
                                    {item.NameOfclass}

                                </td>
                                <td>
                                    <p className={`${item.applications[0].status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{item.applications[0].status}</p>
                                </td>
                                <td>
                                  
                                </td>
                                <td>
                           
                                  
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;