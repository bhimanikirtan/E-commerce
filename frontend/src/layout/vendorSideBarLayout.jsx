import React from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  ExitToApp,
  ShoppingCart,
  Settings,
} from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";

const drawerWidth = 220;

function VendorLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(
      openSnackbar({ massage: "Logout Successfully", severity: "success" })
    );
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <Dashboard />,
      path: "/vendor/vendorDashboard",
    },
    { label: "Products", icon: <Inventory />, path: "/vendor/vendorProducts" },
    { label: "Orders", icon: <ShoppingCart />, path: "/vendor/vendorOrders" },
    {
      label: "Account Setting",
      icon: <Settings />,
      path: "/vendor/vendorAccount",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          ml: `${drawerWidth}px`,
          bgcolor: "#A66914",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Vendor Panel
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            startIcon={<ExitToApp />}
            sx={{
              borderColor: "#fff",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#F5F5F5",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 3 }}>
          <List sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    backgroundColor: isActive(item.path)
                      ? "#A66914"
                      : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive(item.path) ? "#000" : "#A66914",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#FAFAFA", p: 3, minHeight: "100vh" }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default VendorLayout;
