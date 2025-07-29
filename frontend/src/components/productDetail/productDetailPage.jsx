import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Skeleton,
  Rating,
  CircularProgress,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAllproductsData } from "../../Thunk/productThunk";
import { addToCartData } from "../../Thunk/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { openSnackbar } from "../../redux/snackBarSlice";
import { getOneProductRatingData } from "../../Thunk/ratingThunk";
import RatingCard from "../../comon/ratingCard";
import ProductCard from "../../comon/productCard";

function ProductDetailPage() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const { OneProductRatingData } = useSelector((state) => state.rating);
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const selectedProduct = products.find((p) => p._id === id);
  const newProducts = products.slice(0, 4);
  console.log("selectedProduct", selectedProduct);
  useEffect(() => {
    dispatch(getAllproductsData({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneProductRatingData(id));
  }, [dispatch, id]);

  const handlePlus = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleMins = () => {
    setQuantity((quantity) => {
      if (quantity == 1) {
        return quantity;
      } else {
        return quantity - 1;
      }
    });
  };
  const handleSubmit = () => {
    if (!selectedColor) {
      dispatch(
        openSnackbar({ massage: "Please select color", severity: "error" })
      );
    } else if (!selectedSize) {
      dispatch(
        openSnackbar({ massage: "Please select Size", severity: "error" })
      );
    } else {
      dispatch(
        openSnackbar({
          massage: `${selectedProduct.name}add to Cart`,
          severity: "success",
        })
      );
      dispatch(
        addToCartData({
          productId: selectedProduct._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        })
      );
    }
  };
  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };
  const handleChangeSize = (name) => {
    setSelectedSize(name);
  };
  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            width: "auto",
          }}
        >
          {selectedProduct ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: {
                  xs: "column",
                  ssm: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                  xxl: "row",
                },
                gap: "10px",
                mt: "30px",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "50%",
                    lg: "45%",
                    xl: "40%",
                  },
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={`http://192.168.2.222:5000/${selectedProduct.image}`}
                  style={{
                    width: "90%",
                  }}
                  alt=""
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: { xs: "15px", sm: "30px", md: "30px", lg: "40px" },
                    right: { xs: "30px", sm: "70px", md: "50px", lg: "70px" },
                  }}
                >
                  {selectedProduct.isLiked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon color="primary" />
                  )}
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "50%",
                    lg: "50%",
                    xl: "50%",
                  },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h4">{selectedProduct.name}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {selectedProduct.rating == null ? (
                      <Typography variant="h6">No rating</Typography>
                    ) : (
                      <>
                        <Rating
                          name="read-only"
                          value={Number(selectedProduct.rating?.toFixed(1))}
                          precision={0.5}
                          readOnly
                        />
                        <Typography variant="h6">
                          {selectedProduct.rating?.toFixed(1)}/5
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4">
                      ${selectedProduct.price}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.disabled",
                      }}
                    >
                      $300
                    </Typography>

                    <Chip label="- 40%" color="error" />
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      {selectedProduct.description}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography>Select Colors</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      {selectedProduct.color?.map((color, index) => (
                        <Box
                          value={selectedColor}
                          key={index}
                          required
                          onClick={() => handleChangeColor(color)}
                          sx={{
                            border:
                              selectedColor === color ? "2px solid black" : "",
                            backgroundColor: color,
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        ></Box>
                      ))}
                    </Box>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="body1">Choose Size</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    {selectedProduct.size?.map((name, index) => (
                      <Chip
                        clickable
                        onClick={() => handleChangeSize(name)}
                        value={selectedSize}
                        key={index}
                        label={name}
                        color={selectedSize === name ? "primary" : "default"}
                      />
                    ))}
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "62px",
                        justifyContent: "space-between",
                        p: 1,
                      }}
                    >
                      <IconButton onClick={handleMins} size="small">
                        <RemoveIcon sx={{ color: "#000000" }} />
                      </IconButton>

                      <Typography variant="body1" sx={{ color: "#000000" }}>
                        {quantity}
                      </Typography>

                      <IconButton onClick={handlePlus} size="small">
                        <AddIcon sx={{ color: "#000000" }} />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        width: "80%",
                      }}
                    >
                      <Button
                        variant="contained"
                        className="black"
                        onClick={() => {
                          handleSubmit();
                        }}
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "62px",
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <>
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
            </>
          )}
          <Box
            sx={{
              width: "auto",
              mt: 5,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "auto",
              }}
            >
              <Box
                sx={{
                  width: "auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="h5">All Reviews</Typography>
                <Typography variant="h5">
                  ({OneProductRatingData.length})
                </Typography>
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
                  md: "row",
                  lg: "row",
                  xl: "row",
                  xxl: "row",
                },
                gap: 2,
                justifyContent: "center",
              }}
            >
              {OneProductRatingData.map((item) => (
                <RatingCard key={item.id} item={item} />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              width: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "180px",
              }}
            >
              <Typography variant="h4" component="h2">
                You might also like
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {newProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
