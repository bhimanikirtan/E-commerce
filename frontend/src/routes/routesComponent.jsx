import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import ProductDetail from "../pages/productDetail";
import CategoryPage from "../pages/categoryPage";
import Cart from "../pages/cart";
import CheckOut from "../pages/checkOut";
import LoginPage from "../pages/login";
import ProfilePage from "../pages/profile";
import RegisterPage from "../pages/register";
import PrivateRoute from "./privateRoute";
import AdminDashboard from "../admin/adminDashboard";
import Layout from "../layout/adminSideBarLayout";
import ManageProducts from "../admin/manageProducts";
import PublicRoute from "./publicRoute";
import ManageOrders from "../admin/manageOrders";
import ManageUsers from "../admin/manageusers";
import UserProfileLayout from "../layout/userSideBarLayout";
import MyAddress from "../components/profile/myAddress";
import MyOrders from "../components/profile/myOrders";
import ForgotPassword from "../components/password/forgotPassword";
import ResetPassword from "../components/password/resetPassword";
import MyWishlist from "../components/profile/myWishlist";
import DashboardCharts from "../admin/dashBoardCharts";
import NewsLetter from "../admin/newsLetter";
import MySubscription from "../components/profile/mySubscription";
import OrderSuccessPage from "../pages/orderSuccess";
import SubscribSuccessPage from "../pages/subscribeSuccess";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPaasword" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/categoryPage" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orderSuccess" element={<OrderSuccessPage />} />
          <Route path="/subscribSuccess" element={<SubscribSuccessPage />} />
          <Route element={<Layout />}>
            <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
            <Route path="/admin/manageProducts" element={<ManageProducts />} />
            <Route path="/admin/manageOrders" element={<ManageOrders />} />
            <Route path="/admin/manageUsers" element={<ManageUsers />} />
            <Route path="/admin/manageNewsLetter" element={<NewsLetter />} />
            <Route path="/dashBoardCharts" element={<DashboardCharts />} />
          </Route>
          <Route element={<UserProfileLayout />}>
            <Route path="/profile/myProfile" element={<ProfilePage />} />
            <Route path="/profile/myAddress" element={<MyAddress />} />
            <Route path="/profile/myOrders" element={<MyOrders />} />
            <Route path="/profile/myWishlist" element={<MyWishlist />} />
            <Route
              path="/profile/mySubscription"
              element={<MySubscription />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
