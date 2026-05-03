import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { current } from "./JS/actions/auth.actions";
import { ThemeProvider } from "./context/ThemeContext";

import "./App.css";

// Composants Fixes
import NavBare from "./components/NavBare";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AnimatedBackground from "./components/AnimatedBackground";
import Loader from "./components/Loader";

// Lazy Loaded Pages (Code Splitting)
const Home = lazy(() => import("./pages/home/Home"));
const Restaurants = lazy(() => import("./pages/restaurants/Restaurants"));
const RestaurantMenu = lazy(() => import("./pages/restaurants/RestaurantMenu"));
const Products = lazy(() => import("./pages/products/Products"));
const FoodDetails = lazy(() => import("./pages/food/FoodDetails"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Error = lazy(() => import("./pages/error/Error"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const OrderConfirmation = lazy(() => import("./pages/cart/OrderConfirmation"));
const Dashboard = lazy(() => import("./pages/vendor/Dashboard"));
const AddFoodItem = lazy(() => import("./pages/vendor/AddFoodItem"));
const EditFoodItem = lazy(() => import("./pages/vendor/EditFoodItem"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Savoryx UI updated - cache busted!"); // Force reload
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
          <Suspense fallback={<Loader />}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
