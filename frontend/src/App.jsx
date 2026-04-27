import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Restaurants from "./pages/restaurants/Restaurants";
import RestaurantMenu from "./pages/restaurants/RestaurantMenu";
import Products from "./pages/products/Products";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Error from "./pages/error/Error";
import FoodDetails from "./pages/food/FoodDetails";
import Cart from "./pages/cart/Cart";
import OrderConfirmation from "./pages/cart/OrderConfirmation";
import Dashboard from "./pages/vendor/Dashboard";
import AddFoodItem from "./pages/vendor/AddFoodItem";
import EditFoodItem from "./pages/vendor/EditFoodItem";
import NavBare from "./components/NavBare";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AnimatedBackground from "./components/AnimatedBackground";
import { ThemeProvider } from "./context/ThemeContext";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { current } from "./JS/actions/auth.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(current());
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <div className="app-shell">
        <AnimatedBackground />
        <NavBare />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantMenu />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<FoodDetails />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmed" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
            <Route path="/vendor/dashboard" element={<ProtectedRoute requiredRole="restaurant"><Dashboard /></ProtectedRoute>} />
            <Route path="/vendor/add-food" element={<ProtectedRoute requiredRole="restaurant"><AddFoodItem /></ProtectedRoute>} />
            <Route path="/vendor/edit-food/:id" element={<ProtectedRoute requiredRole="restaurant"><EditFoodItem /></ProtectedRoute>} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
