import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../component/layout/DefaultLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import Fav from "../pages/cart/Fav";
import ProductLandingPage from "../pages/product/ProductLandingPage";
import UserLayout from "../component/layout/UserLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Allproduct from "../pages/home/Allproduct";
import CategoryPage from "../pages/category/CategoryPage";
import OrderHistory from "../pages/order/OrderHistory";
import Profile from "../pages/profile/Profile";
import LeaveReview from "../pages/review/LeaveReview";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
        <Route index element={<Home/>} />
        <Route path="/product/:_id" element={<ProductLandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/fav" element={<Fav />} />
        <Route path="/allProduct" element={<Allproduct/>} />
        <Route path="/category/:slug" element={<CategoryPage/>} />
        </Route>

        {/* private pages  */}
        <Route path="/user" element={<UserLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="order-history" element={<OrderHistory/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="leave-review" element={<LeaveReview/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
