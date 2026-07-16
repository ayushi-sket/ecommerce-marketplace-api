import { useState, useEffect } from "react";
import axios from "axios";
import { Package, ShoppingBag, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function ManagerDashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/manager",
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
    { label: "Manage Products", path: "/manager/products" },
    { label: "Manage Orders", path: "/manager/orders" },
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      <h1 className="text-3xl font-bold mb-2">
        Manager Dashboard
      </h1>
      <p className="text-gray-500 mb-8">
        Welcome back, Manager
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
          <p className="text-gray-500 text-sm mt-1">Total Products</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
          <p className="text-gray-500 text-sm mt-1">Total Orders</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold">—</p>
          <p className="text-gray-500 text-sm mt-1">Pending Orders</p>
        </div>

      </div>

      {/* Management Section */}
      <h2 className="text-xl font-bold mb-4">Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {managementLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-white border-l-4 border-purple-600 rounded-lg px-5 py-4 font-semibold shadow-sm hover:shadow-md transition"
          >
            {item.label}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default ManagerDashboard;
