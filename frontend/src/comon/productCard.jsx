import {
  Box,
  Typography,
  Button,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getOneproductData } from "../Thunk/productThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackbar } from "../redux/snackBarSlice";
import { addToCartData } from "../Thunk/cartThunk";
import {
  addWishlistData,
  deleteUserWishlistData,
} from "../Thunk/wishlistThunk";
import { useEffect, useState } from "react";
import { fetchUser } from "../redux/authSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [like, setLike] = useState(product.isLiked);
  const { user } = useSelector((state) => state.auth);
  const handleSelect = async (id) => {
    try {
      await dispatch(getOneproductData(id));
      navigate(`/productDetail/${id}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (id) => {
    try {
      if (like) {
        setLike(false);
        await dispatch(deleteUserWishlistData({ id }));
      } else {
        setLike(true);
        await dispatch(addWishlistData({ id }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <Box key={product._id}>
      <Box
        sx={{
          maxWidth: "295px",
          maxHeight: "508px",
        }}
      >
        <Box
          sx={{ cursor: "pointer", maxWidth: "295px", position: "relative" }}
          onClick={() => {
            handleSelect(product._id);
          }}
        >
          <img
            style={{ width: "100%" }}
            src={`http://192.168.2.222:5000/${product.image}`}
            alt=""
          />
          {user?.isSubscribe !== "free" && (
            <Tooltip
              title={like ? "Remove Like" : "Like"}
              placement="top"
              arrow
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(product._id);
                }}
              >
                {like ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#000000" }} />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="h5" sx={{ color: "orange" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {product.rating == null ? (
                <Typography variant="h6">No Rating</Typography>
              ) : (
                <>
                  <Rating
                    name="read-only"
                    value={Number(product.rating?.toFixed(1))}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="h6">
                    {product.rating?.toFixed(1)}/5
                  </Typography>
                </>
              )}
            </Box>
          </Typography>
          <Typography variant="h5">${product.price}</Typography>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Button
              sx={{
                width: "100%",
                borderRadius: 10,
                p: 1.5,
              }}
              variant="contained"
              className="black"
              onClick={() => {
                dispatch(
                  addToCartData({
                    productId: product._id,
                    quantity: 1,
                    size: "small",
                    color: "red",
                  })
                );
                dispatch(
                  openSnackbar({
                    massage: `${product.name} add in Cart`,
                    severity: "success",
                  })
                );
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
