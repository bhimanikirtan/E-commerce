import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";

import { login, loginUser } from "../redux/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(loginUser(values)).unwrap();
        const { user, token } = response;
        localStorage.setItem("token", token);
        dispatch(login({ user, token }));
        if (user.role === "admin") {
          navigate("/admin/adminDashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">SHOP.CO</Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "90%",
                    sm: "60%",
                    md: "50%",
                    lg: "40%",
                    xl: "30%",
                  },
                  border: "2px solid black",
                  borderRadius: 3,
                  p: isMobile ? 2 : isTab ? 2 : 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant={isMobile ? "h5" : "h4"}>
                    Login
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Box
                        sx={{
                          width: "100%",
                          mt: 3,
                        }}
                      >
                        <TextField
                          name="email"
                          type="email"
                          fullWidth
                          label="Email Address"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && formik.errors.email}
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          name="password"
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          label="Password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.password && formik.errors.password
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      <Button
                        className="black"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 1, py: 1.5 }}
                      >
                        Login
                      </Button>
                    </Grid>
                  </form>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 2,
                    }}
                  >
                    <Typography textAlign="center" variant="body1">
                      <Link
                        component={RouterLink}
                        to="/forgotPassword"
                        underline="hover"
                        fontWeight="bold"
                        sx={{}}
                      >
                        ForgotPassword
                      </Link>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography textAlign="center" variant="body1">
                      Don’t have an account?{" "}
                      <Link
                        component={RouterLink}
                        to="/register"
                        underline="hover"
                        fontWeight="bold"
                        sx={{}}
                      >
                        RegisterNow
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
