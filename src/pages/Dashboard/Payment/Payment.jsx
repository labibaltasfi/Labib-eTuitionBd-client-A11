import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const Payment = () => {
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
            tutorName: applications.tutorName,
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