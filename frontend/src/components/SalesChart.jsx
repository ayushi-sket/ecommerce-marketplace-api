import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ orders = [] }) {
  // Orders ko date-wise group karke revenue nikalna
  const groupedData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    if (!acc[date]) {
      acc[date] = { date, revenue: 0, orders: 0 };
    }
    acc[date].revenue += order.totalAmount || 0;
    acc[date].orders += 1;
    return acc;
  }, {});

  const chartData = Object.values(groupedData);

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Sales Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="revenue" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
