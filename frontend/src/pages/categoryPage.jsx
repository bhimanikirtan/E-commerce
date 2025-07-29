import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Slider,
  Chip,
  ButtonBase,
  Skeleton,
  Container,
} from "@mui/material";
import { useRef, useEffect, useState } from "react";
import useIntersectionObserver from "../components/myHook/intersaction";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getAllproductsData } from "../Thunk/productThunk";
import ProductCard from "../comon/productCard";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/header";
import { fetchUser } from "../redux/authSlice";

function CategoryPage() {
  const dispatch = useDispatch();
  const loaderRef = useRef(null);
  const minmin = 0;
  const maxmax = 1000;
  const { user } = useSelector((state) => state.auth);
  const { products, total } = useSelector((state) => state.products);
  const [priceRangeValue, setPriceRangeValue] = useState([100, 500]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 9;
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    price: [],
    productType: [],
  });
  const handleColorChange = (color) => {
    setFilters((prev) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color],
    }));
  };

  const handleSizeChange = (size) => {
    setFilters((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
    setFilters((prev) => ({ ...prev, price: newValue }));
  };
  const handleProductTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      productType: prev.productType.includes(type)
        ? prev.productType.filter((t) => t !== type)
        : [...prev.productType, type],
    }));
  };

  const handleResetFilters = () => {
    window.scroll(0, 0);
    setFilters({
      color: [],
      size: [],
      price: [100, 500],
      productType: [],
    });
    setPriceRangeValue([100, 500]);
  };

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllproductsData({ skip: 0, limit, filters }));
    setSkip(limit);
  }, [dispatch, filters]);

  useIntersectionObserver({
    target: loaderRef,
    onIntersect: () => {
      if (!loading && products.length < total) {
        loadMoreProducts();
      }
    },
    enabled: true,
  });

  const loadMoreProducts = () => {
    if (loading || products.length >= total) return;
    setLoading(true);
    dispatch(getAllproductsData({ skip, limit, filters })).finally(() => {
      setSkip((prev) => prev + limit);
      setLoading(false);
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "center",
          }}
        >
          {user?.isSubscribe !== "basic" && user?.isSubscribe !== "free" && (
            <Box
              sx={{
                width: { sm: "40%", md: "30%", lg: "25%", xl: "25%" },
                height: "100%",
                overflowY: "auto",
                p: 2,
                position: { xs: "unset", sm: "sticky" },
                top: 80,
              }}
            >
              <Box sx={{ borderRadius: 2, boxShadow: 2, p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Filters</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleResetFilters}
                  >
                    <FilterAltIcon sx={{ mr: 0.5 }} />
                    Reset
                  </Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Product Type
                  </Typography>

                  {["newArrival", "topSelling"].map((type, i) => (
                    <Box
                      key={i}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.productType?.includes(type)}
                        onChange={() => handleProductTypeChange(type)}
                        style={{
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                        }}
                      />
                      <Typography
                        sx={{ ml: 1, fontSize: "1.1rem", fontWeight: 500 }}
                      >
                        {type === "newArrival" ? "New Arrival" : "Top Selling"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Colors
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["black", "red", "green", "grey", "blue"].map(
                      (color, i) => {
                        const isSelected = filters.color.includes(color);
                        return (
                          <ButtonBase
                            key={i}
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              backgroundColor: color,
                              border: isSelected
                                ? "2px solid #000000"
                                : "2px solid white",
                              boxShadow: isSelected
                                ? "0 0 0 1px #000000"
                                : "0 0 0 1px #ccc",
                            }}
                            onClick={() => handleColorChange(color)}
                          />
                        );
                      }
                    )}
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Sizes
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {["Small", "Medium", "Large", "X-Large"].map((size, i) => (
                      <Chip
                        key={i}
                        label={size}
                        onClick={() => handleSizeChange(size)}
                        variant={
                          filters.size.includes(size) ? "filled" : "outlined"
                        }
                        color={
                          filters.size.includes(size) ? "primary" : "default"
                        }
                        sx={{ px: 2, py: 1, fontWeight: 500 }}
                      />
                    ))}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Price
                    </Typography>
                    <Slider
                      getAriaLabel={() => "Price range"}
                      value={priceRangeValue}
                      onChange={handlePriceRangeChange}
                      valueLabelDisplay="auto"
                      min={minmin}
                      max={maxmax}
                      sx={{ mx: 1 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {products ? (
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  ml: { xs: 0, sm: 0, md: 0, lg: 5 },
                  justifyContent: {
                    xs: "center",
                    md: "center",
                    xl: "flex-start",
                  },
                  gap: 3,
                }}
              >
                {products.map((product) => (
                  <Grid key={product._id || product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3">Products Not Found</Typography>
              </Box>
            )}

            <Box
              id="loader"
              ref={loaderRef}
              sx={{
                width: "100%",
                height: 40,
                marginTop: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 295,
                      height: 508,
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      p: 2,
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={298}
                      sx={{ borderRadius: 2 }}
                    />
                    <Skeleton variant="text" height={40} width="80%" />
                    <Skeleton variant="text" height={30} width="60%" />
                    <Skeleton variant="text" height={30} width="40%" />
                    <Skeleton
                      variant="rectangular"
                      height={50}
                      width="100%"
                      sx={{ borderRadius: 2 }}
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CategoryPage;
