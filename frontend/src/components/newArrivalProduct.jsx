import {
  Grid,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { getAllproductsData } from "../Thunk/productThunk";
import { useEffect } from "react";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function NewArrivalProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { products } = useSelector((state) => state.products);
  const newArrivalProduct = products.filter(
    (product) => product.productType === "newArrival"
  );

  console.log(newArrivalProduct);

  useEffect(() => {
    dispatch(getAllproductsData({ skip: 0, limit: 9 }));
  }, [dispatch]);
  const displayProducts = newArrivalProduct.slice(0, 4);
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: theme.palette.background.container }}
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
          <Typography variant={isMobile ? "h4" : "h2"} component="h2">
            NEW ARRIVALS
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
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                className="white"
                onClick={() => {
                  navigate("/categoryPage");
                  window.scroll(0, 0);
                }}
                sx={{
                  width: { xs: "100%", md: "20%" },
                  p: 1.5,
                  borderRadius: 10,
                }}
              >
                View All
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default NewArrivalProduct;
