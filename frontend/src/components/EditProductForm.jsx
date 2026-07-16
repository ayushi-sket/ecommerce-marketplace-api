import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProductForm({ redirectPath }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchData = async () => {
      try {

        const productRes = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        const p = productRes.data.product;

        setForm({
          name: p.name || "",
          description: p.description || "",
          price: p.price || "",
          stock: p.stock || "",
          category: p.category?._id || p.category || "",
          image: p.image || "",
        });

        const categoryRes = await axios.get(
          "http://localhost:5000/api/categories"
        );

        setCategories(categoryRes.data.categories || categoryRes.data || []);

      } catch (err) {
        console.log(err);
        setMessage("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage("Product updated successfully!");

      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);

    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return <p className="p-8 text-center">Loading product...</p>;
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-8">

        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        {message && (
          <p className="mb-4 text-purple-600 font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(redirectPath)}
              className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProductForm;
