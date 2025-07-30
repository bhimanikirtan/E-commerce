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
  IconButton,
  Grid,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../components/header/header";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartData } from "../Thunk/cartThunk";
import { deleteAddress, fetchUser, getAddress } from "../redux/authSlice";
import { sendPaymentData } from "../Thunk/paymentThunk";
import { openSnackbar } from "../redux/snackBarSlice";
import { addOrderData } from "../Thunk/orderThunk";
import AddAddress from "../components/addAddress/addAddress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";

function CheckOut() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [editAddMode, setEditAddMode] = useState(false);
  const [editAddId, setEditAddId] = useState(null);
  const [editAddData, setEditAddData] = useState("");
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
  const handleEditAddress = (add) => {
    setOpen(true);
    setEditAddMode(true);
    setEditAddId(add._id);
    setEditAddData(add);
  };
  const handleDeleteAddress = async (id) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
    } catch (error) {
      console.log(error);
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
      <AddAddress
        open={open}
        editAddMode={editAddMode}
        editData={editAddData}
        editId={editAddId}
        onClose={() => {
          setOpen(false);
          setEditAddMode(false);
        }}
      />
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
            <Box sx={{ width: "100%", px: 2, mt: 2 }}>
              {checked ? (
                <>
                  <Typography variant="h5" textAlign="center" mb={2}>
                    {t("Select Payment Method")}
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
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      textAlign="center"
                    >
                      {t("PERSONAL DETAILS")}
                    </Typography>
                  </Box>
                  {user && (
                    <Box mt={4}>
                      <TextField
                        fullWidth
                        label={t("fullName")}
                        value={user.fullName}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label={t("number")}
                        value={user.number}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label={t("email")}
                        value={user.email}
                        sx={{ mb: 2 }}
                      />
                      <FormControl component="fieldset">
                        <RadioGroup
                          name={t("address")}
                          value={selectedAddress?._id || ""}
                          onChange={handleChange}
                        >
                          <Grid container spacing={2}>
                            {address?.map((add) => (
                              <Grid item xs={12} md={6} key={add._id}>
                                <Card variant="outlined" sx={{ p: 2 }}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                  >
                                    <FormControlLabel
                                      value={add._id}
                                      control={<Radio />}
                                      label={
                                        <Typography variant="body1">
                                          {`${add.address}, ${add.city}, ${add.pincode}, ${add.state}, ${add.country}`}
                                        </Typography>
                                      }
                                    />

                                    <Box>
                                      <IconButton
                                        onClick={() => handleEditAddress(add)}
                                        aria-label="edit"
                                      >
                                        <EditIcon color="info" />
                                      </IconButton>
                                      <IconButton
                                        onClick={() =>
                                          handleDeleteAddress(add._id)
                                        }
                                        aria-label="delete"
                                      >
                                        <DeleteIcon color="error" />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                      <Box sx={{ mt: 2 }}>
                        {user?.isSubscribe === "basic" ||
                        (user?.isSubscribe === "free" &&
                          address?.length >= 1) ? null : (
                          <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                          >
                            {t("+ Add New Address")}
                          </Button>
                        )}
                      </Box>
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
                  {t("Order Summary")}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="h6">{t("Subtotal")}</Typography>
                  <Typography variant="h6">${total}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" color="green">
                    {t("Delivery Free")}
                  </Typography>
                  <Typography variant="h6" color="green">
                    $0
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="h5">{t("Total")}</Typography>
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
                  {checked ? t("Place Order") : t("Make A Payment")}
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
