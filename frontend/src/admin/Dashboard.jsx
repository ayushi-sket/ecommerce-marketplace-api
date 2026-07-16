import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SalesChart from "../components/SalesChart";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch Orders
        const ordersRes = await axios.get(
          "http://localhost:5000/api/orders",
          config
        );

        const ordersData = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data.orders || [];

        setOrders(ordersData);

        // Fetch Products
        const productsRes = await axios.get(
          "http://localhost:5000/api/products",
          config
        );

        const productsData = Array.isArray(productsRes.data)
          ? productsRes.data
          : productsRes.data.products || [];

        setTotalProducts(productsData.length);

        // Update later if Users API exists
        setTotalUsers(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500">Total Users</h2>
              <p className="text-3xl font-bold mt-2">
                {totalUsers}
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500">Total Products</h2>
              <p className="text-3xl font-bold mt-2">
                {totalProducts}
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-500">Total Orders</h2>
              <p className="text-3xl font-bold mt-2">
                {orders.length}
              </p>
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
