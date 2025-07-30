import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  Typography,
  Stack,
  Grid,
  InputBase,
  Badge,
  IconButton,
  Drawer,
  useMediaQuery,
  Tooltip,
  TextField,
  MenuItem,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/snackBarSlice";
import { getAllCartData } from "../../Thunk/cartThunk";
import { useTranslation } from "react-i18next";

export default function Header() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const navBarHalf =
    location.pathname.startsWith("/productDetail") ||
    location.pathname.startsWith("/categoryPage");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    dispatch(getAllCartData());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const DesktopMenu = () => (
    <>
      {!navBarHalf ? (
        <Toolbar
          sx={{
            height: "50px",
            display: "flex",

            justifyContent: "flex-end",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <TextField
              select
              sx={{ minWidth: 120 }}
              value={i18n.language == "en-GB" ? "en" : i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              variant="standard"
              size="small"
            >
              <MenuItem value="en">
                <img
                  src="https://hatscripts.github.io/circle-flags/flags/us.svg"
                  alt="English"
                  style={{
                    width: 20,
                    height: 14,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                />
                English
              </MenuItem>
              <MenuItem value="hi">
                <img
                  src="https://hatscripts.github.io/circle-flags/flags/in.svg"
                  alt="Hindi"
                  style={{
                    width: 20,
                    height: 14,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                />
                हिंदी
              </MenuItem>
              <MenuItem value="gu">
                <img
                  src="https://hatscripts.github.io/circle-flags/flags/in.svg"
                  alt="Gujarati"
                  style={{
                    width: 20,
                    height: 14,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                />
                ગુજરાતી
              </MenuItem>
              <MenuItem value="de">
                <img
                  src="https://hatscripts.github.io/circle-flags/flags/de.svg"
                  alt="Germany"
                  style={{
                    width: 20,
                    height: 14,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                />
                Germany
              </MenuItem>
              <MenuItem value="zh">
                <img
                  src="https://hatscripts.github.io/circle-flags/flags/cn.svg"
                  alt="China"
                  style={{
                    width: 20,
                    height: 14,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                />
                China
              </MenuItem>
            </TextField>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f1f1f1",
                borderRadius: "50px",
                padding: "6px 16px",
                maxWidth: 500,
                width: "100%",
              }}
            >
              <SearchIcon sx={{ color: "#888", mr: 1 }} />
              <InputBase
                placeholder={t("Search for products...")}
                fullWidth
                sx={{
                  color: "#333",
                  "& .MuiInputBase-input": {
                    padding: 0,
                  },
                }}
              />
            </Box>
            <IconButton
              onClick={() => {
                navigate("/Cart");
              }}
            >
              <Badge badgeContent={cartData.length} color="error">
                <ShoppingCartIcon color="info" />
              </Badge>
            </IconButton>
            {token
              ? [
                  <>
                    <IconButton
                      onClick={() => {
                        navigate("/profile/myProfile");
                      }}
                    >
                      <AccountCircleIcon color="primary" />
                    </IconButton>
                    <Button
                      variant="outlined"
                      className="white"
                      sx={{
                        borderRadius: "50px",
                        p: "5px  40px",
                      }}
                      onClick={() => {
                        dispatch(
                          openSnackbar({
                            massage: "Logout Successfully",
                            severity: "success",
                          })
                        );
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      {t("logout")}
                    </Button>
                  </>,
                ]
              : [
                  <>
                    <Grid
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        className="white"
                        sx={{
                          borderRadius: "50px",
                          p: "5px  50px",
                        }}
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        {t("Register")}
                      </Button>
                      <Button
                        variant="outlined"
                        className="white"
                        sx={{
                          borderRadius: "50px",
                          p: "5px 40px",
                        }}
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        {" "}
                        {t("Login")}
                      </Button>
                    </Grid>
                  </>,
                ]}
          </Stack>
        </Toolbar>
      ) : (
        <Toolbar
          sx={{
            height: "50px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <IconButton
                onClick={() => {
                  navigate("/Cart");
                }}
              >
                <Badge badgeContent={cartData.length} color="error">
                  <ShoppingCartIcon color="info" />
                </Badge>
              </IconButton>
              {token
                ? [
                    <>
                      <IconButton
                        onClick={() => {
                          navigate("/profile/myProfile");
                        }}
                      >
                        <AccountCircleIcon color="primary" />
                      </IconButton>
                      <Button
                        variant="outlined"
                        className="white"
                        sx={{
                          borderRadius: "50px",
                          p: "6px  30px",
                        }}
                        onClick={() => {
                          dispatch(
                            openSnackbar({
                              massage: "Logout Successfully",
                              severity: "success",
                            })
                          );
                          localStorage.removeItem("token");
                          navigate("/login");
                        }}
                      >
                        {t("logout")}
                      </Button>
                    </>,
                  ]
                : [
                    <>
                      <Grid
                        sx={{
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          className="white"
                          sx={{
                            borderRadius: "50px",
                            p: "5px  50px",
                          }}
                          onClick={() => {
                            navigate("/register");
                          }}
                        >
                          Register
                        </Button>
                        <Button
                          variant="outlined"
                          className="white"
                          sx={{
                            borderRadius: "50px",
                            p: "5px 40px",
                          }}
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          {" "}
                          Login
                        </Button>
                      </Grid>
                    </>,
                  ]}
            </Box>
          </Stack>
        </Toolbar>
      )}
    </>
  );
  const MobileDrawer = () => (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "50%",
          backgroundColor: "background.default",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 5,
          gap: 4,
          pt: 5,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          onClick={() => {
            navigate("/categoryPage");
          }}
        >
          Shop
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Typography
            variant="body1"
            fontWeight={500}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Typography>

          <IconButton onClick={() => navigate("/cart")} sx={{ p: 0 }}>
            <Badge
              badgeContent={cartData?.length || 0}
              color="error"
              overlap="rectangular"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        {token ? (
          <Typography
            variant="body1"
            fontWeight={400}
            onClick={() => {
              navigate("/profile/myProfile");
            }}
          >
            Profile
          </Typography>
        ) : (
          <>
            <Typography
              variant="body1"
              fontWeight={400}
              onClick={() => {
                navigate("/register");
              }}
              sx={{
                cursor: "pointer",
                transition: "color 0.3s",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Register
            </Typography>
            <Typography
              variant="body1"
              fontWeight={400}
              onClick={() => {
                navigate("/login");
              }}
              sx={{
                cursor: "pointer",
                transition: "color 0.3s",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Login
            </Typography>
          </>
        )}
      </Box>
    </Drawer>
  );
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.background.container,
            boxShadow: "none",
            borderBottom: "2px solid black",
            p: 1,
          }}
        >
          <Toolbar
            sx={{
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={{ md: 3, lg: 4, xl: 2 }}
            >
              <Box>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  SHOP.CO
                </Typography>
              </Box>
              {isMobile ? (
                <></>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="text"
                      onClick={() => {
                        navigate("/categoryPage");
                      }}
                    >
                      {t("shop")}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Stack>
            {isMobile ? (
              <Box>
                <Tooltip title="Open Menu">
                  <IconButton
                    edge="end"
                    onClick={handleDrawerToggle}
                    aria-label="menu"
                  >
                    <Badge badgeContent={cartData?.length || 0} color="error">
                      <MenuIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <DesktopMenu />
            )}
          </Toolbar>
        </AppBar>
        {isMobile && <MobileDrawer />}
      </Box>
    </>
  );
}
