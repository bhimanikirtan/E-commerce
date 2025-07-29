import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderData, getAllOrderData } from "../../Thunk/orderThunk";
import {
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Chip,
  Rating,
  TextField,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { openSnackbar } from "../../redux/snackBarSlice";
import {
  addRatingData,
  getUserRatingData,
  updateUserRatingData,
} from "../../Thunk/ratingThunk";
function MyOrders() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { orderData } = useSelector((state) => state.order);
  const { UserProductRatingData } = useSelector((state) => state.rating);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openRate, setOpenRate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [cancelId, setCancelId] = useState(null);

  const handleClickOpen = (orderId) => {
    setCancelId(orderId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (UserProductRatingData) {
      setRatingValue(UserProductRatingData.rating || 0);
      setComment(UserProductRatingData.comment || "");
    } else {
      setRatingValue(0);
      setComment("");
    }
  }, [openRate, UserProductRatingData]);

  const handleClickOpenRate = (product) => {
    setSelectedProduct(product);
    dispatch(getUserRatingData(product.productId._id));
    setOpenRate(true);
  };

  const handleCloseRate = () => {
    setOpenRate(false);
  };
  const handleRatingSubmit = async () => {
    try {
      if (UserProductRatingData) {
        await dispatch(
          updateUserRatingData({
            ratingId: UserProductRatingData._id,
            rating: ratingValue,
            comment: comment,
          })
        ).unwrap();
      } else {
        await dispatch(
          addRatingData({
            productId: selectedProduct.productId._id,
            rating: ratingValue,
            comment: comment,
          })
        ).unwrap();
      }

      setSelectedProduct(null);
      handleCloseRate();
    } catch (error) {
      dispatch(
        openSnackbar({
          massage: "Failed to submit rating",
          severity: "error",
        })
      );
      console.error("Rating submission failed:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllOrderData());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth={false} disableGutters>
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
          <>
            <Box direction="column" p={1}>
              <Typography
                variant={isMobile ? "h6" : "h4"}
                gutterBottom
                fontWeight={600}
              >
                My Orders
              </Typography>

              {orderData?.length === 0 ? (
                <Typography variant="body1">No orders found.</Typography>
              ) : (
                orderData.map((order) => (
                  <>
                    <Card key={order._id} sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Order ID: {order._id}
                        </Typography>
                        <Typography>
                          Status:{" "}
                          <Chip
                            label={order.status}
                            color={
                              order.status === "pending"
                                ? "warning"
                                : order.status === "canceled"
                                ? "error"
                                : "success"
                            }
                          />
                        </Typography>{" "}
                        <Typography>Total: ₹{order.total}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Shipping Address
                        </Typography>
                        <Box>
                          <Typography>Address: {order.info.address}</Typography>
                          <Typography>City: {order.info.city}</Typography>
                          <Typography>Pincode: {order.info.pincode}</Typography>
                          <Typography>Country: {order.info.country}</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Products
                        </Typography>
                        <Box
                          sx={{
                            display:
                              order.orderData?.products?.length <= 3
                                ? "flex"
                                : "grid",
                            justifyContent:
                              order.orderData?.products?.length <= 3
                                ? "flex-start"
                                : "center",
                            alignItems: "flex-start",
                            gap: 2,
                            flexWrap:
                              order.orderData?.products?.length <= 3
                                ? "wrap"
                                : undefined,
                            gridTemplateColumns:
                              order.orderData?.products?.length > 3
                                ? "repeat(auto-fit, minmax(300px, 1fr))"
                                : undefined,
                            mx:
                              order.orderData?.products?.length > 3
                                ? "auto"
                                : undefined,
                            width:
                              order.orderData?.products?.length > 3
                                ? "100%"
                                : undefined,
                          }}
                        >
                          {order.status === "delivered" ? (
                            order.orderData?.products?.map((productItem) => (
                              <Box key={productItem._id}>
                                <Card
                                  variant="outlined"
                                  sx={{ display: "flex", p: 1 }}
                                >
                                  {productItem.productId && (
                                    <img
                                      src={`http://192.168.2.222:5000/${productItem.productId.image}`}
                                      alt={productItem.productId.name}
                                      width={70}
                                      height={100}
                                      style={{
                                        objectFit: "cover",
                                        marginRight: 10,
                                      }}
                                    />
                                  )}

                                  <Box sx={{ p: 2 }}>
                                    <Typography>
                                      {productItem.productId?.name}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      sx={{ color: "green" }}
                                    >
                                      ₹{productItem.productId?.price}
                                    </Typography>
                                    <Box
                                      sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 4,
                                      }}
                                    >
                                      <Button
                                        onClick={() => {
                                          handleClickOpenRate(productItem);
                                        }}
                                        className="black"
                                        variant="contained"
                                        sx={{
                                          borderRadius: 7,
                                          display: "flex",
                                          gap: 2,
                                        }}
                                      >
                                        Rate
                                        <StarIcon color="warning" />
                                      </Button>
                                    </Box>
                                  </Box>
                                </Card>
                              </Box>
                            ))
                          ) : (
                            <>
                              {order.orderData?.products?.map((productItem) => (
                                <Box key={productItem._id}>
                                  <Card
                                    variant="outlined"
                                    sx={{ display: "flex", p: 1 }}
                                  >
                                    {productItem.productId && (
                                      <img
                                        src={`http://192.168.2.222:5000/${productItem.productId.image}`}
                                        alt={productItem.productId.name}
                                        width={70}
                                        height={100}
                                        style={{
                                          objectFit: "cover",
                                          marginRight: 10,
                                        }}
                                      />
                                    )}
                                    <Box>
                                      <Typography>
                                        Name: {productItem.productId?.name}
                                      </Typography>
                                      <Typography>
                                        Color: {productItem.color}
                                      </Typography>
                                      <Typography>
                                        Size: {productItem.size}
                                      </Typography>
                                      <Typography>
                                        Quantity: {productItem.quantity}
                                      </Typography>
                                      <Typography>
                                        Price: ₹{productItem.productId?.price}
                                      </Typography>
                                    </Box>
                                  </Card>
                                </Box>
                              ))}
                            </>
                          )}
                        </Box>
                        {order.status == "pending" ? (
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              onClick={() => {
                                console.log(order._id);
                                handleClickOpen(order._id);
                              }}
                              variant="contained"
                              sx={{ borderRadius: 7, px: 3 }}
                              className="black"
                            >
                              Cancel
                            </Button>
                          </Box>
                        ) : (
                          <></>
                        )}
                      </CardContent>
                    </Card>

                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>{"Alert"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          <Typography variant="" color="error">
                            Are you sure you want to delete this Order
                          </Typography>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="outlined"
                          className="white"
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outlined"
                          className="white"
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await dispatch(cancelOrderData(cancelId));
                              handleClose();
                            } catch (error) {
                              console.error("Order canceled failed", error);
                            } finally {
                              dispatch(getAllOrderData());
                              setLoading(false);
                            }
                          }}
                          autoFocus
                        >
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog open={openRate} onClose={handleCloseRate}>
                      <DialogTitle>Rate Product</DialogTitle>
                      <DialogContent>
                        {selectedProduct && (
                          <Box
                            sx={{
                              width: "500px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                              }}
                            >
                              <img
                                src={`http://192.168.2.222:5000/${selectedProduct.productId.image}`}
                                alt={selectedProduct.productId.name}
                                width={120}
                                height={120}
                                style={{
                                  objectFit: "cover",
                                  marginRight: 10,
                                }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography variant="h6">
                                  {selectedProduct.productId.name}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "green",
                                  }}
                                >
                                  ₹{selectedProduct.productId.price}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <Rating
                                    value={ratingValue}
                                    onChange={(e, newValue) =>
                                      setRatingValue(newValue)
                                    }
                                    precision={0.5}
                                  />
                                </Box>
                              </Box>
                            </Box>
                            <>
                              <Box>
                                <TextField
                                  label="Write your feedback"
                                  multiline
                                  rows={5}
                                  fullWidth
                                  variant="outlined"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  sx={{ mt: 2 }}
                                />
                              </Box>
                            </>
                          </Box>
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseRate} variant="outlined">
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleRatingSubmit}
                        >
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ))
              )}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default MyOrders;
