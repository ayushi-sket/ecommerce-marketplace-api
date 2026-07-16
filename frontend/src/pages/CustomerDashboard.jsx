import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaUser,
} from "react-icons/fa";

function CustomerDashboard() {
  const cards = [
    {
      title: "Wishlist",
      icon: <FaHeart className="text-3xl text-pink-500" />,
      link: "/wishlist",
    },
    {
      title: "Cart",
      icon: <FaShoppingCart className="text-3xl text-blue-500" />,
      link: "/cart",
    },
    {
      title: "My Orders",
      icon: <FaBoxOpen className="text-3xl text-green-500" />,
      link: "/orders",
    },
    {
      title: "Profile",
      icon: <FaUser className="text-3xl text-purple-500" />,
      link: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-2">
        Welcome 👋
      </h1>

      <p className="text-gray-600 mb-8">
        Manage your shopping experience from here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <div className="mb-4">{card.icon}</div>

            <h2 className="text-xl font-semibold">
              {card.title}
            </h2>

            <p className="text-gray-500 mt-2">
              Click to view
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Quick Overview
        </h2>

        <p className="text-gray-600">
          Browse products, manage your cart, track orders,
          and update your profile—all from one place.
        </p>
      </div>
    </div>
  );
}

export default CustomerDashboard;
