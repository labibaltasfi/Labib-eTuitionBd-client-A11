
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();


  const { data: monthlyEarnings = [], isLoading: earningsLoading } =
    useQuery({
      queryKey: ["monthly-earnings"],
      queryFn: async () => {
        const res = await axiosSecure.get("/admin/monthly-earnings");
        return res.data.map(item => ({
          month: `${item._id.month}-${item._id.year}`,
          earnings: item.totalEarnings,
          transactions: item.totalTransactions
        }));
      }
    });

  const { data: transactions = [], isLoading: txLoading } =
    useQuery({
      queryKey: ["transactions"],
      queryFn: async () => {
        const res = await axiosSecure.get("/admin/transactions");
        return res.data;
      }
    });

  if (earningsLoading || txLoading) {
    return <div className="text-center py-20">Loading reports...</div>;
  }


  const totalEarnings = transactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthEarnings = transactions
    .filter(tx => {
      const d = new Date(tx.paidAt);
      return (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>

      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Earnings</p>
          <h2 className="text-2xl font-bold">৳ {totalEarnings}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Transactions</p>
          <h2 className="text-2xl font-bold">
            {transactions.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">This Month Earnings</p>
          <h2 className="text-2xl font-bold">
            ৳ {thisMonthEarnings}
          </h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Monthly Earnings Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyEarnings}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="earnings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Transaction History Table ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Payment Transaction History
        </h2>

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
                  <td className="text-xs">
                    {tx.transactionId}
                  </td>
                  <td>
                    {new Date(tx.paidAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length === 0 && (
            <p className="text-center py-6 text-gray-500">
              No transactions found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

