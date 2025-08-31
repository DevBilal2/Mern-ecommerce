import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/LayoutHomePage";
import HomePage from "../Pages/HomePage";
import FilterProductPage from "../Pages/FilterProductPage";
import ProductDetail from "../Pages/ProductDetail";
import Login from "../components/Forms/Login";
import Register from "../components/Forms/Register";
import Account from "../Pages/Account";
import ShoppingCart from "../components/Cart/Cart";
import CartPage from "../Pages/CartPage";
import CheckoutPage from "../Pages/CheckoutPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/filter" element={<FilterProductPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
