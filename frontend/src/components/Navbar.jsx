import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-purple-600">
        ShopSphere
      </Link>

      {/* Menu */}
      <div className="hidden md:flex gap-8 text-gray-700 font-medium">

        {/* Customer */}
        {(!token || user?.role === "customer") && (
          <>
            <Link to="/" className="hover:text-purple-600">
              Home
            </Link>

            <Link to="/products" className="hover:text-purple-600">
              Products
            </Link>

            {token && (
              <Link to="/orders" className="hover:text-purple-600">
                My Orders
              </Link>
            )}
          </>
        )}

        {/* Manager */}
        {user?.role === "manager" && (
          <>
            <Link to="/manager" className="hover:text-purple-600">
              Dashboard
            </Link>

            <Link to="/admin/products" className="hover:text-purple-600">
              Products
            </Link>

            <Link to="/admin/orders" className="hover:text-purple-600">
              Orders
            </Link>
          </>
        )}

        {/* Admin */}
        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="hover:text-purple-600">
              Dashboard
            </Link>

            <Link to="/admin/products" className="hover:text-purple-600">
              Products
            </Link>

            <Link to="/admin/orders" className="hover:text-purple-600">
              Orders
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {token ? (
          <>
            <span className="text-gray-700 font-medium">
              Hi, {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-500 font-medium hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Login
          </Link>
        )}

        {/* Customer Only */}
        {user?.role === "customer" && (
          <>
            <Link to="/wishlist">
              <FaHeart
                size={22}
                className="text-gray-700 hover:text-red-500"
              />
            </Link>

            <Link to="/cart">
              <FaShoppingCart
                size={22}
                className="text-gray-700 hover:text-purple-600"
              />
            </Link>

            <Link to="/profile">
              <FaUser
                size={22}
                className="text-gray-700 hover:text-purple-600"
              />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
