import { useState, useEffect } from "react";
import axios from "axios";
import { Users, Package, ShoppingBag, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setStats(res.data.dashboard);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }

    };

    fetchStats();

  }, []);


  const managementLinks = [
    { label: "Manage Users", path: "/admin/users" },
    { label: "Manage Products", path: "/admin/products" },
    { label: "Manage Orders", path: "/admin/orders" },
    { label: "Manage Categories", path: "/admin/categories" },
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white">Loading dashboard...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-950 px-8 py-10">

      <h1 className="text-3xl font-bold text-white mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-400 mb-8">
        Welcome back, Admin
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="bg-purple-900/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          <p className="text-gray-400 text-sm mt-1">Total Users</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="bg-red-900/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Package className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
          <p className="text-gray-400 text-sm mt-1">Total Products</p>
        </div>

        <div className="bg-gray-900 border-2 border-red-600 rounded-xl p-5 shadow-lg shadow-red-900/30">
          <div className="bg-amber-900/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-bold text-red-500">{stats.totalOrders}</p>
          <p className="text-gray-400 text-sm mt-1">Total Orders</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="bg-yellow-900/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <IndianRupee className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-red-500">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-gray-400 text-sm mt-1">Total Revenue</p>
        </div>

      </div>

      {/* Management Section */}
      <h2 className="text-xl font-bold text-white mb-4">Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {managementLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-gray-900 border-l-4 border-red-600 rounded-lg px-5 py-4 text-white font-semibold hover:bg-gray-800 transition"
          >
            {item.label}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;
