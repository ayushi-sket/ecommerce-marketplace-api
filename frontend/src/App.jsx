import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Customer & Manager Dashboards
import CustomerDashboard from "./pages/CustomerDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerProducts from "./manager/ManagerProducts";
import ManagerEditProduct from "./manager/EditProduct";
import ManagerOrders from "./manager/ManagerOrders";

// Admin Dashboard
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminOrders from "./admin/Orders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer Dashboard */}
        <Route
          path="/customer"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </PrivateRoute>
          }
        />

        {/* Manager Dashboard */}
        <Route
          path="/manager"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />

        {/* Manager Products */}
        <Route
          path="/manager/products"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerProducts />
            </PrivateRoute>
          }
        />

        {/* Manager Edit Product */}
        <Route
          path="/manager/products/edit/:id"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerEditProduct />
            </PrivateRoute>
          }
        />

        {/* Manager Orders */}
        <Route
          path="/manager/orders"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerOrders />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/cart"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <Wishlist />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <Orders />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/products"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminProducts />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <EditProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminOrders />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
