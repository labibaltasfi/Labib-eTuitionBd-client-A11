import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const Payment = () => {
    const {user} = useAuth();
    const { applicationId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: applications } = useQuery({
        queryKey: ['parcels', applicationId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/by-id/${applicationId}`);
            return res.data;
        }
    })

    const handlePayment = async() => {
        const paymentInfo = {
            studentName: user.displayName,
            studentEmail: user.email,
            tutorName: applications.tutorName,
            tuitionId: applications.tuitionId,
            tutorEmail: applications.tutorEmail,
            expectedSalary: applications.expectedSalary,
            applicationId: applications._id,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        console.log(res.data);
        
        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    return (
        <div>
            <h2>Please Pay ${applications.expectedSalary}</h2>
            <button onClick={handlePayment} className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;