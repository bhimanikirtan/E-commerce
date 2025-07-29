import { Box, Chip, Container, IconButton, Tooltip } from "@mui/material";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../redux/snackBarSlice";
import Header from "../components/header/header";
import LogoutIcon from "@mui/icons-material/Logout";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../context/themeContext";
import { fetchUser } from "../redux/authSlice";
import { useEffect } from "react";

function UserProfileLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { mode, toggleTheme } = useThemeContext();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const activeStyle = {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "20px",
    padding: "8px 16px",
    textDecoration: "none",
  };

  const inactiveStyle = {
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    textDecoration: "none",
    padding: "8px 16px",
  };
  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#000",
                padding: 2,
                display: { xs: "block", ssm: "block", sm: "flex" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <NavLink
                  to="/profile/myProfile"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  DashBoard
                </NavLink>
                <NavLink
                  to="/profile/myAddress"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  My Address
                </NavLink>
                <NavLink
                  to="/profile/myOrders"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  My Orders
                </NavLink>
                {user?.isSubscribe !== "free" && (
                  <NavLink
                    to="/profile/myWishlist"
                    style={({ isActive }) =>
                      isActive ? activeStyle : inactiveStyle
                    }
                  >
                    My Wishlist
                  </NavLink>
                )}
                <NavLink
                  to="/profile/mySubscription"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  My Subscription
                </NavLink>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user ? (
                  user.isSubscribe === "basic" ? (
                    <Chip label="Basic Plan" color="warning" />
                  ) : user.isSubscribe === "premium" ? (
                    <Chip label="Premium Plan" color="success" />
                  ) : (
                    <Chip label="No Active Plan" color="info" />
                  )
                ) : (
                  <></>
                )}
              </Box>

              <IconButton
                onClick={() => {
                  dispatch(
                    openSnackbar({
                      massage: "Logout SuccessFully",
                      severity: "success",
                    })
                  );
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                <LogoutIcon color="error" />
              </IconButton>
              <Tooltip title="Toggle Theme">
                <IconButton onClick={toggleTheme}>
                  {mode === "dark" ? (
                    <Brightness7 sx={{ color: "#ffffff" }} />
                  ) : (
                    <Brightness4 sx={{ color: "#ffffff" }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default UserProfileLayout;
