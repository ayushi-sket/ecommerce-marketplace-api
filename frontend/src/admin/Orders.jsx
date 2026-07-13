import { useState } from "react";

function Orders() {
  const [status, setStatus] = useState("Pending");

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Order Management
      </h1>

      <div className="bg-white shadow rounded-lg p-6">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Product</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-4">Ayushi</td>
              <td>Phone</td>
              <td>₹45,000</td>

              <td>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>

              <td>
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  Update
                </button>
              </td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;
