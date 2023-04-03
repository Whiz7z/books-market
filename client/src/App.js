import Menu from "./components/Menu";

import { Routes, Route } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import AdminPanelPage from "./Pages/AdminPanelPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CheckOutPage from "./Pages/CheckOutPage";
import StripePage from "./Pages/StripePage";
import MainPage from "./Pages/MainPage";
function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} exact></Route>

        <Route path="/main" element={<MainPage />} exact></Route>

        <Route path="/products/*" element={<ProductsPage />} exact></Route>

        <Route path="/profile/*" element={<ProfilePage />} exact></Route>

        <Route path="/adminpanel/*" element={<AdminPanelPage />} exact></Route>

        <Route path="/cart" element={<CartPage />} exact></Route>

        <Route path="/login" element={<LoginPage />} exact></Route>

        <Route path="/registration" element={<RegisterPage />} exact></Route>

        <Route path="/checkout" element={<CheckOutPage />} exact></Route>

        <Route path="/payment" element={<StripePage />} exact></Route>
      </Routes>
    </div>
  );
}

export default App;
