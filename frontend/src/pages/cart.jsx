import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import Header from "../components/header/header";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCartData,
  getAllCartData,
  plusData,
  minusData,
  removeFromCartData,
} from "../Thunk/cartThunk";
import { openSnackbar } from "../redux/snackBarSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm", "ssm", "xs"));
  const { cartData } = useSelector((state) => state.cart);
  const total = useSelector((state) => state.cart.total);
  useEffect(() => {
    dispatch(getAllCartData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            p: 3,
            width: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant={isMobile ? "h4" : "h3"}>Your cart</Typography>
          <Box>
            <Button
              variant="contained"
              sx={{
                borderRadius: 7,
                px: { xs: 1, md: 4, xl: 4 },
                py: { xs: 0.5, md: 1, xl: 1 },
              }}
              className="black"
              onClick={() => {
                dispatch(clearCartData());
              }}
            >
              clear
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "auto",
            display: "flex",
            flexDirection: {
              xs: "column",
              ssm: "column",
              sm: "column",
              md: "column",
              lg: "row",
              xl: "row",
              xxl: "row",
            },
            justifyContent: "center",
            gap: 3,
          }}
        >
          {cartData?.length === 0 ? (
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
              }}
            >
              Cart is Empty
            </Typography>
          ) : (
            <Box
              sx={{
                width: "auto",
                border: "2px solid #0000001A",
                borderRadius: 3,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <>
                {cartData.map((product) => {
                  return (
                    <>
                      <Box
                        sx={{ width: "100%", display: "flex", gap: 2 }}
                        key={product.productId._id}
                      >
                        <Box sx={{ width: { xs: "30%" } }}>
                          <img
                            style={{
                              width: "100%",
                            }}
                            src={`http://192.168.2.222:5000/${product.productId.image}`}
                            alt=" "
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              width: "auto",
                              display: "flex",
                              flexDirection: "column",
                              gap: { sm: 2, md: 2, xl: 2 },
                            }}
                          >
                            <Typography variant={isMobile ? "body1" : "h4"}>
                              {product.productId.name}
                            </Typography>
                            <Typography variant="body2">
                              Size: {product.size}
                            </Typography>
                            <Typography variant="body2">
                              Color: {product.color}
                            </Typography>
                            <Typography variant={isMobile ? "body2" : "h5"}>
                              ${product.productId.price} x {product.quantity}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "auto",
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "flex-end",
                              alignItems: "end",
                              position: "relative",
                            }}
                          >
                            <Button
                              onClick={() => {
                                dispatch(removeFromCartData(product._id));
                              }}
                              sx={{ position: "absolute", top: 0, right: 0 }}
                            >
                              <DeleteIcon color="error" />
                            </Button>
                            <Box
                              sx={{
                                width: "auto",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#f0f0f0",
                                borderRadius: "62px",
                                justifyContent: "space-between",
                                p: { xs: 0, sm: 1, md: 1, xl: 1 },
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  dispatch(minusData(product._id));
                                }}
                                size="small"
                              >
                                <RemoveIcon sx={{ color: "#000000" }} />
                              </IconButton>

                              <Typography
                                sx={{ color: "#000000" }}
                                variant={isMobile ? "body2" : "body1"}
                              >
                                {product.quantity}
                              </Typography>

                              <IconButton
                                onClick={() => {
                                  dispatch(plusData(product._id));
                                }}
                                size="small"
                              >
                                <AddIcon sx={{ color: "#000000" }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                })}
              </>
            </Box>
          )}
          {cartData?.length === 0 ? (
            <></>
          ) : (
            <Box
              sx={{
                width: "auto",
                height: "460px",
                border: "2px solid #0000001A",
                borderRadius: 3,
                p: { xs: 1.5, md: 3, xl: 3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant={isMobile ? "h4" : "h3"}>
                    Order Summary
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant={isMobile ? "h6" : "h5"}>
                    Subtotal
                  </Typography>
                  <Typography variant={isMobile ? "h6" : "h5"}>
                    ${total}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant={isMobile ? "h6" : "h5"} color="green">
                    Delivery Free
                  </Typography>
                  <Typography variant={isMobile ? "h6" : "h5"} color="green">
                    $0
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    width: "100%",
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant={isMobile ? "h5" : "h4"}>
                    Total
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"}>
                    ${total}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      backgroundColor: "#f0f0f0",
                      borderRadius: 7,
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                    }}
                  >
                    <TextField
                      variant="standard"
                      fullWidth
                      name="code"
                      placeholder="Add promo code"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      sx={{
                        backgroundColor: "transparent",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      width: "25%",
                    }}
                  >
                    <Button
                      variant="contained"
                      className="black"
                      sx={{
                        borderRadius: 7,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      if (cartData == "") {
                        dispatch(
                          openSnackbar({
                            massage: "The cart is empty",
                            severity: "error",
                          })
                        );
                      } else {
                        navigate("/checkOut");
                      }
                    }}
                    sx={{
                      width: "100%",
                      borderRadius: 7,
                      p: 2,
                    }}
                    variant="contained"
                    className="black"
                  >
                    Go to Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Cart;
