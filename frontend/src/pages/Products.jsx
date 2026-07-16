import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, Pencil, Trash2 } from "lucide-react";

// 🔑 Helper: detects role from whichever storage pattern your app uses
function getUserRole() {
  // 1. Direct role key
  const directRole = localStorage.getItem("role");
  if (directRole) return directRole;

  // 2. User object stored as JSON (e.g. localStorage.setItem("user", JSON.stringify(userObj)))
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user?.role) return user.role;
    } catch (e) {}
  }

  // 3. Decode role directly from JWT token payload
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      if (payload?.role) return payload.role;
    } catch (e) {}
  }

  return null; // not logged in / role not found
}

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [wishlistIds, setWishlistIds] = useState([]);

  const token = localStorage.getItem("token");
  const role = getUserRole(); // "customer" | "manager" | "admin" | null


  // Fetch current wishlist (only if logged in)
  const fetchWishlist = async () => {

    if (!token) return;

    try {

      const res = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const ids = res.data.wishlist.map((p) => p._id);
      setWishlistIds(ids);

    } catch (err) {
      console.log(err);
    }

  };


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/products?search=${search}`
        );

        setProducts(res.data.products);


      } catch(err){

        console.log(err);
        setError("Failed to load products");


      } finally {

        setLoading(false);

      }

    };


    fetchProducts();


  }, [search]);


  useEffect(() => {
    fetchWishlist();
  }, []);




  const handleAddToCart = async(productId)=>{

    if(!token){

      setMessage("Please login to add items");
      return;

    }


    try{

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity:1
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setMessage("Added to cart!");

    }
    catch(err){

      setMessage(
        err.response?.data?.message ||
        "Failed to add cart"
      );

    }


    setTimeout(()=>{
      setMessage("");
    },2000);

  };


  const handleBuyNow = (productId) => {
    // Redirect to checkout/product page — adjust route as needed
    window.location.href = `/checkout/${productId}`;
  };


  const handleEditProduct = (productId) => {
    window.location.href = `/products/edit/${productId}`;
  };


  const handleDeleteProduct = async (productId) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setMessage("Product deleted");

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to delete product"
      );
    }

    setTimeout(() => setMessage(""), 2000);

  };



  // Toggle Wishlist (Add/Remove)
  const handleToggleWishlist = async (productId) => {

    if (!token) {
      setMessage("Please login to use wishlist");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {

      const res = await axios.put(
        `http://localhost:5000/api/wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.inWishlist) {
        setWishlistIds((prev) => [...prev, productId]);
      } else {
        setWishlistIds((prev) =>
          prev.filter((id) => id !== productId)
        );
      }

    } catch (err) {
      console.log(err);
    }

  };





  if(loading)
    return <p className="text-center mt-20">Loading products...</p>;


  if(error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;





  return (

    <div className="min-h-screen bg-gray-50 px-8 py-12">


      <h1 className="text-3xl font-bold text-center mb-5">
        Our Products
      </h1>


      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="block mx-auto mb-8 w-full max-w-md border rounded-lg px-4 py-3"
      />



      {
        message &&
        <p className="text-center text-purple-600 mb-5">
          {message}
        </p>
      }




      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">


        {
          products.length > 0 ? (

          products.map((product)=>{

            const isWishlisted = wishlistIds.includes(product._id);

            return (

            <div
              key={product._id}
              className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
            >

              {/* Wishlist Heart Icon — Customer only */}
              {role === "customer" && (
                <button
                  onClick={() => handleToggleWishlist(product._id)}
                  className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              )}

              {/* Admin: Edit + Delete icons */}
              {role === "admin" && (
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:scale-110 transition-transform"
                  >
                    <Pencil className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:scale-110 transition-transform"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              )}

              {/* Manager: Edit icon only */}
              {role === "manager" && (
                <button
                  onClick={() => handleEditProduct(product._id)}
                  className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:scale-110 transition-transform"
                >
                  <Pencil className="w-5 h-5 text-blue-600" />
                </button>
              )}


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


              {/* Action buttons — Customer only (Manager/Admin use icons above instead) */}
              {role === "customer" && (
                <div className="flex flex-col gap-2 mt-3">
                  <button
                    onClick={()=>handleAddToCart(product._id)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={()=>handleBuyNow(product._id)}
                    className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {/* Not logged in — show login-required cart button like before */}
              {!role && (
                <button
                  onClick={()=>handleAddToCart(product._id)}
                  className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  Add to Cart
                </button>
              )}


            </div>

            );

          })

          ) : (

            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>

          )
        }


      </div>


    </div>

  );
}


export default Products;
