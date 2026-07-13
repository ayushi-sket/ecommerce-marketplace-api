import { Link } from "react-router-dom";

function Products() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Product Management
        </h1>

        <Link
          to="/admin/products/add"
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td className="p-3">No Image</td>
              <td className="p-3">Sample Product</td>
              <td className="p-3">₹999</td>
              <td className="p-3">20</td>

              <td className="p-3 flex gap-3">

                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Products;
