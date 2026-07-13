import { useState, useEffect } from "react";
import axios from "axios";

function getStatusColor(status) {
  if (status === "Delivered") return "bg-green-100 text-green-700";
  if (status === "Shipped") return "bg-blue-100 text-blue-700";
  if (status === "Cancelled") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Please login to view your orders");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-5 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p className="text-gray-700">
                {order.items.map((item) => item.product?.name).join(", ")}
              </p>

              <div className="text-right font-bold text-purple-600">
                ₹{order.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
