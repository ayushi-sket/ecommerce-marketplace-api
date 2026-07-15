import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SalesChart from "../components/SalesChart";

function Dashboard() {
  // Stores the list of orders fetched from backend
  const [orders, setOrders] = useState([]);

  // Stores total user count (update later if you add a /api/users endpoint)
  const [totalUsers, setTotalUsers] = useState(0);

  // Stores total product count
  const [totalProducts, setTotalProducts] = useState(0);

  // Tracks whether dashboard data is still loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all dashboard data when the component mounts
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Get all orders (used for stats + sales chart)
        const ordersRes = await axios.get(
          "http://localhost:5000/api/orders",
          config
        );

        // Backend returns { orders: [...] }, so we pick that out safely
        const ordersData = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data.orders || ordersRes.data.data || [];
        setOrders(ordersData);

        // Get all products (used for total product count)
        const productsRes = await axios.get(
          "http://localhost:5000/api/products",
          config
        );

        const productsData = Array.isArray(productsRes.data)
          ? productsRes.data
          : productsRes.data.products || productsRes.data.data || [];
        setTotalProducts(productsData.length);

        // If you have a users endpoint on the backend, uncomment this:
        // const usersRes = await axios.get("http://localhost:5000/api/users", config);
        // setTotalUsers(usersRes.data.length);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate total revenue by summing up all order amounts
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  // Total number of orders placed
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500">Total Users</h2>
              <p className="text-3xl font-bold mt-2">{totalUsers}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500">Total Products</h2>
              <p className="text-3xl font-bold mt-2">{totalProducts}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500">Total Orders</h2>
              <p className="text-3xl font-bold mt-2">{totalOrders}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-3xl font-bold mt-2">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <SalesChart orders={orders} />
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              to="/admin/products"
              className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700"
            >
              Manage Products
            </Link>

            <Link
              to="/admin/orders"
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >
              Manage Orders
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
