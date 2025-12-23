import React from 'react';

import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

 
  const { data: transactions = [], isLoading: txLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("transactions");
      return res.data;
    }
  });


  const { data: earningsData = [], isLoading: earningsLoading } = useQuery({
    queryKey: ["platform-earnings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/platform-earnings");
      return res.data.map(item => ({
        month: `${item._id.month}-${item._id.year}`,
        platformEarnings: item.platformEarnings
      }));
    }
  });

  if (txLoading || earningsLoading) {
    return <div className="text-center py-20">Loading reports...</div>;
  }

  
  const totalPlatformEarnings = earningsData.reduce(
    (sum, item) => sum + item.platformEarnings,
    0
  );

  const totalTransactions = transactions.length;


  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Platform Earnings (20% Commission)</p>
          <h2 className="text-2xl font-bold">৳ {totalPlatformEarnings}</h2>
        </div>

       
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Transactions</p>
          <h2 className="text-2xl font-bold">{totalTransactions}</h2>
        </div>

       
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Payment Transaction History</p>
          <h2 className="text-2xl font-bold">{transactions.length}</h2>
          <p className="text-gray-400 text-sm">All successful payments</p>
        </div>
      </div>

   
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Platform Earnings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earningsData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `৳ ${value}`} />
            <Bar dataKey="platformEarnings" fill="#1E40AF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Payment Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Student</th>
                <th>Tutor</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx._id}>
                  <td>{tx.studentName}</td>
                  <td>{tx.tutorName}</td>
                  <td>৳ {tx.amount}</td>
                  <td className="text-xs">{tx.transactionId}</td>
                  <td>{new Date(tx.paidAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <p className="text-center py-6 text-gray-500">No transactions found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;


