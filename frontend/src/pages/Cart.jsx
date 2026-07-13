import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cart);
    } catch (err) {
      if (err.response?.status === 404) {
        setCart({ items: [] });
      } else {
        setError(err.response?.data?.message || "Failed to load cart");
      }
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (!token) {
      setError("Please login to view your cart");
      setLoading(false);
      return;
    }
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        `http://localhost:5000/api/cart/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    setPlacing(true);
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  const items = cart?.items || [];

  const total = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
            >
              <div className="flex-1">
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-purple-600 font-bold">
                  ₹{item.product.price}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity - 1)
                  }
                  className="bg-gray-200 px-3 py-1 rounded-md"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                  className="bg-gray-200 px-3 py-1 rounded-md"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.product._id)}
                className="text-red-500 font-medium ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total: ₹{total}
          </div>

          <div className="text-right">
            <button
              onClick={handleCheckout}
              disabled={placing}
              className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {placing ? "Placing Order..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
