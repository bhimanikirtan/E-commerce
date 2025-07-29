import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserWishlistData,
  getUserWishlistData,
} from "../../Thunk/wishlistThunk";
import { useEffect } from "react";
import { getOneproductData } from "../../Thunk/productThunk";
import { useNavigate } from "react-router-dom";

function MyWishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userLikes } = useSelector((state) => state.wishList);
  console.log(userLikes);
  useEffect(() => {
    dispatch(getUserWishlistData());
  }, [dispatch]);
  const handleSelect = async (id) => {
    try {
      await dispatch(getOneproductData(id));
      navigate(`/productDetail/${id}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUserWishlistData({ id })).unwrap();
      console.log("Deleted successfully");
    } catch (err) {
      console.error("Error deleting wishlist item", err);
    }
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Typography
        variant={isMobile ? "h6" : "h4"}
        gutterBottom
        fontWeight={600}
      >
        My Wishlist
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        {userLikes?.length > 0 ? (
          userLikes.map((likes) => (
            <Box key={likes._id}>
              <Box
                sx={{ position: "relative", maxWidth: "295px" }}
                onClick={() => {
                  handleSelect(likes.productId._id);
                }}
              >
                <img
                  style={{ width: "auto" }}
                  src={`http://192.168.2.222:5000/${likes.productId.image}`}
                  alt=""
                />
                <Tooltip title="Remove Like" placement="top" arrow>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#fdd" },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(likes.productId._id);
                    }}
                  >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </Tooltip>
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {likes.productId.name}
                  </Typography>
                  <Typography variant="h6" color="primary" mt={1}>
                    ${likes.productId.price}
                  </Typography>
                </CardContent>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="h6" sx={{ m: 2 }}>
            Your wishlist is empty.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default MyWishlist;
