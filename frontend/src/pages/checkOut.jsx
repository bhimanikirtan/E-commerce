import {
  Box,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../components/header/header";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartData } from "../Thunk/cartThunk";
import { fetchUser, getAddress } from "../redux/authSlice";
import { sendPaymentData } from "../Thunk/paymentThunk";
import { openSnackbar } from "../redux/snackBarSlice";
import { addOrderData } from "../Thunk/orderThunk";

function CheckOut() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { cartData, total } = useSelector((state) => state.cart);
  const { user, address } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const selectId = event.target.value;
    const fullAddress = address.find((a) => a._id === selectId);
    setSelectedAddress(fullAddress);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handlePayment = async () => {
    if (!selectedAddress) {
      dispatch(
        openSnackbar({ massage: "Please select Address", severity: "error" })
      );
    } else {
      setChecked(true);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const test = await dispatch(addOrderData({ ...selectedAddress }));
      const orderId = test.payload.orderId;
      if (!orderId) throw new Error("Order ID missing");
      const paymentRes = await dispatch(sendPaymentData({ orderId })).unwrap();
      if (paymentRes?.url) {
        window.location.href = paymentRes.url;
      } else {
        throw new Error("Stripe URL not returned");
      }
    } catch (err) {
      console.error("Error placing order:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getAllCartData());
    dispatch(getAddress());
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const defaultAddress = address.find((addr) => addr.default === true);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [address]);

  return (
    <>
      <Header />
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={80} color="primary" />
        </Box>
      ) : (
        <Container maxWidth={false} disableGutters>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ width: "100%", px: 2 }}>
              {checked ? (
                <>
                  <Typography variant="h5" textAlign="center" mb={2}>
                    Select Payment Method
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="payment"
                      value={selectedPayment}
                      onChange={handlePaymentChange}
                    >
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label="Card"
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              ) : (
                <>
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    textAlign="center"
                  >
                    PERSONAL DETAILS
                  </Typography>
                  {user && (
                    <Box mt={4}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={user.fullName}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Number"
                        value={user.number}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        value={user.email}
                        sx={{ mb: 2 }}
                      />
                      <FormControl component="fieldset">
                        <RadioGroup
                          name="address"
                          value={selectedAddress?._id || ""}
                          onChange={handleChange}
                        >
                          {address?.map((add) => (
                            <FormControlLabel
                              key={add._id}
                              value={add._id}
                              control={<Radio />}
                              label={`${add.address}, ${add.city}, ${add.pincode}, ${add.state}, ${add.country}`}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  )}
                </>
              )}
            </Box>

            <Box sx={{ width: { md: "70%" }, px: 2 }}>
              <Box mt={5}>
                {cartData?.map((product) => (
                  <Box
                    key={product.productId._id}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <Box sx={{ width: 100, mr: 2 }}>
                      <img
                        style={{ width: "100%" }}
                        src={`http://192.168.2.222:5000/${product.productId.image}`}
                        alt=""
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6">
                        {product.productId.name}
                      </Typography>
                      <Typography>
                        ${product.productId.price} x {product.quantity}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box mt={4}>
                <Typography variant={isMobile ? "h4" : "h3"}>
                  Order Summary
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="h6">Subtotal</Typography>
                  <Typography variant="h6">${total}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" color="green">
                    Delivery Free
                  </Typography>
                  <Typography variant="h6" color="green">
                    $0
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="h5">Total</Typography>
                  <Typography variant="h5">${total}</Typography>
                </Box>
              </Box>

              <Box mt={5}>
                <Button
                  onClick={checked ? handlePlaceOrder : handlePayment}
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 7, p: 1.5 }}
                >
                  {checked ? "Place Order" : "Make A Payment"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

export default CheckOut;
