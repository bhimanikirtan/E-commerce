import {
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { getAllproductsData } from "../Thunk/productThunk";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../comon/productCard";
import { useState, useEffect } from "react";

function TopSellingProduct() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { products } = useSelector((state) => state.products);

  const topSellingProduct = products.filter(
    (product) => product.productType === "topSelling"
  );

  const [visible, setVisible] = useState(4);

  useEffect(() => {
    dispatch(getAllproductsData({ skip: 0, limit: 41 }));
  }, [dispatch]);

  const handleViewAll = () => {
    setVisible(topSellingProduct.length);
  };

  const displayProducts = topSellingProduct.slice(0, visible);

  return (
    <>
      <Container maxWidth={false} disableGutters  sx={{ backgroundColor: theme.palette.background.container }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "180px",
          }}
        >
          <Typography variant={isMobile ? "h4" : "h2"} component="h2">
            TOP SELLING
          </Typography>
        </Grid>
        <Grid
          container
          spacing={0}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
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
              {visible < topSellingProduct.length && (
                <Button
                  variant="outlined"
                  className="white"
                  onClick={handleViewAll}
                  sx={{
                    width: "20%",
                    p: 1.5,
                    borderRadius: 10,
                  }}
                >
                  View All
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default TopSellingProduct;
