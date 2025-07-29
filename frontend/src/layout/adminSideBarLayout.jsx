import { Box, Typography, Button, Container } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import admin from "../assets/admin.png";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";
import { useState } from "react";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/adminDashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Products",
      path: "/admin/manageProducts",
      icon: <ProductsIcon />,
    },
    { label: "Orders", path: "/admin/manageOrders", icon: <OrdersIcon /> },
    { label: "Users", path: "/admin/manageUsers", icon: <UsersIcon /> },
    {
      label: "NewsLetter",
      path: "/admin/manageNewsletter",
      icon: <SendIcon />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(
      openSnackbar({ massage: "Logout Successfully", severity: "success" })
    );
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
          sx={{
            width: sidebarOpen ? 220 : 70,
            backgroundColor: "#000",
            color: "#fff",
            height: "100%",
            position: "fixed",
            left: 0,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            transition: "width 0.3s",
            zIndex: 1200,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={admin} alt="" width={50} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              mt: 2,
            }}
          >
            {navItems.map(({ label, path, icon }) => {
              return (
                <Button
                  key={label}
                  onClick={() => navigate(path)}
                  sx={{
                    backgroundColor:
                      sidebarOpen && isActive(path) ? "#333" : "transparent",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    borderRadius: sidebarOpen ? 1 : 10,
                    textTransform: "none",
                    minWidth: 0,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        !sidebarOpen && isActive(path) ? "#333" : "transparent",
                      borderRadius: "50%",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </Box>
                  {sidebarOpen && (
                    <Typography variant="" sx={{ ml: 1, fontSize: 16 }}>
                      {label}
                    </Typography>
                  )}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ mt: "auto" }}>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              fullWidth
              sx={{
                borderRadius: 10,
                justifyContent: sidebarOpen ? "flex-start" : "center",
                px: sidebarOpen ? 2 : 0,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: sidebarOpen ? 1 : 0,
              }}
            >
              <LogoutIcon />
              {sidebarOpen && "Logout"}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "auto",
            ml: sidebarOpen ? "220px" : "70px",
            transition: "margin 0.3s",
          }}
        >
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Layout;
