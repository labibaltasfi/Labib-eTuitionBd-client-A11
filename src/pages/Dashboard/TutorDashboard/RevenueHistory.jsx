import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const RevenueHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data = { history: [], totals: { totalGross: 0, totalNet: 0 } }, isLoading } = useQuery({
        queryKey: ['revenueHistory', user?.email],
        queryFn: async () => (await axiosSecure.get(`/tutor-revenue?email=${user?.email}`)).data,
        enabled: !!user?.email,
    });

    if (isLoading) return <div className="loading loading-spinner text-primary"></div>;

    return (
        <div className="p-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card title="Gross Amount Paid" amount={data.totals.totalGross} bg="bg-[#192489]" />
                <Card title="Your Net Earnings (80%)" amount={data.totals.totalNet} bg="bg-emerald-600" />
            </div>

            {/* History Table */}
            <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
                <table className="table w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-left">
                            <th className="py-4 px-6">Date</th>
                            <th>Student Details</th>
                            <th>Transaction ID</th>
                            <th>Gross Amount</th>
                            <th className="text-right px-6">Your Earnings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.history.map((item) => (
                            <tr key={item._id.$oid} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6 text-sm text-gray-500">
                                    {new Date(item.paidAt.$date).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="font-bold text-gray-800 capitalize">{item.studentName}</div>
                                    <div className="text-xs text-gray-500">{item.studentEmail}</div>
                                </td>
                                <td className="text-xs font-mono text-gray-400">{item.transactionId}</td>
                                <td className="text-gray-600">{item.amount} BDT</td>
                                <td className="text-right px-6">
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold">
                                        {item.tutorNet} BDT
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Small reusable card component
const Card = ({ title, amount, bg }) => (
    <div className={`${bg} text-white p-6 rounded-2xl shadow-xl`}>
        <p className="text-xs font-medium uppercase tracking-wider">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{amount.toLocaleString()} BDT</h2>
    </div>
);

export default RevenueHistory;
