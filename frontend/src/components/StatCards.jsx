export default function StatCards({ totalRevenue, totalOrders, totalUsers }) {
  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "from-purple-500 to-blue-500" },
    { label: "Total Orders", value: totalOrders, color: "from-blue-500 to-cyan-500" },
    { label: "Total Users", value: totalUsers, color: "from-pink-500 to-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl p-5 text-white bg-gradient-to-br ${stat.color} shadow-lg`}
        >
          <p className="text-sm opacity-90">{stat.label}</p>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
