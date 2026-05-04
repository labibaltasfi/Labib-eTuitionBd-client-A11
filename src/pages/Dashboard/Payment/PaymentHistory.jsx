import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';



const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: paymentsData = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        },
        enabled: !!user?.email,
    })

    const payments = Array.isArray(paymentsData)
        ? paymentsData
        : Array.isArray(paymentsData?.payments)
            ? paymentsData.payments
            : [];

    return (
        <div>
            <h2 className="text-5xl">Payment History: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tutor Name</th>
                            <th>Amount</th>
                            <th>Paid Time</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.tutorName}</td>
                                <td>৳{payment.amount}</td>
                                <td>{payment.paidAt}</td>
                                <td>{payment.transactionId}</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;