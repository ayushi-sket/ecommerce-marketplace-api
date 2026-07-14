import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");


  const fetchWishlist = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setWishlist(res.data.wishlist);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {
    fetchWishlist();
  }, []);



  const handleRemove = async (productId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId)
      );

    } catch (err) {
      console.log(err);
    }

  };



  const handleAddToCart = async (productId) => {

    try {

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Added to cart!");

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to add to cart"
      );
    }

    setTimeout(() => setMessage(""), 2000);

  };



  if (loading)
    return <p className="text-center mt-20">Loading wishlist...</p>;



  return (

    <div className="min-h-screen bg-gray-50 px-8 py-12">

      <h1 className="text-3xl font-bold text-center mb-8">
        My Wishlist
      </h1>


      {
        message &&
        <p className="text-center text-purple-600 mb-5">
          {message}
        </p>
      }


      {
        wishlist.length === 0 ? (

          <div className="text-center mt-20">

            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />

            <p className="text-gray-500 mb-4">
              Your wishlist is empty
            </p>

            <Link
              to="/products"
              className="text-purple-600 font-semibold hover:underline"
            >
              Browse Products
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

            {
              wishlist.map((product) => (

                <div
                  key={product._id}
                  className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
                >

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:scale-110 transition-transform"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>


                  <Link to={`/products/${product._id}`}>

                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/300"
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />

                    <h2 className="text-lg font-semibold hover:text-purple-600">
                      {product.name}
                    </h2>

                  </Link>


                  <p className="text-purple-600 font-bold mt-2">
                    ₹{product.price}
                  </p>


                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );
}

export default Wishlist;
