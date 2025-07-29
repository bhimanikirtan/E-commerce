import { Navigate, Outlet } from "react-router-dom";
import { fetchUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const PublicRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch, token]);

  if (token && user?.role === "admin") {
    return <Navigate to="/admin/adminDashboard" />;
  } else if (token && user?.role === "user") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
