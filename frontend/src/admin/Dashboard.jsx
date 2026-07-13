import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹0</p>
        </div>

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

    </div>
  );
}

export default Dashboard;
