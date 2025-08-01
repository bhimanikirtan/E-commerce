import { Box, Typography, Toolbar, Grid, Paper } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useState } from "react";
import { useEffect } from "react";
import AddVendorDetails from "../comon/vendorDetailModel";
import { useDispatch, useSelector } from "react-redux";
import { getVendorDetailsData } from "../Thunk/vendorThunk";

const VendorDashboard = () => {
  const { vendor } = useSelector((state) => state.vendor);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getVendorDetailsData());
  }, [dispatch]);

  useEffect(() => {
    if (!vendor) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [vendor]);

  return (
    <Box sx={{ display: "flex" }}>
      <AddVendorDetails
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome, Vendor!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center">
                <LocalMallIcon color="primary" fontSize="large" />
                <Box ml={2}>
                  <Typography variant="h6">Total Orders</Typography>
                  <Typography variant="subtitle1">120</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center">
                <HourglassTopIcon color="warning" fontSize="large" />
                <Box ml={2}>
                  <Typography variant="h6">Pending Orders</Typography>
                  <Typography variant="subtitle1">12</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center">
                <MonetizationOnIcon color="success" fontSize="large" />
                <Box ml={2}>
                  <Typography variant="h6">Revenue</Typography>
                  <Typography variant="subtitle1">₹24,000</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center">
                <StorefrontIcon color="secondary" fontSize="large" />
                <Box ml={2}>
                  <Typography variant="h6">Products</Typography>
                  <Typography variant="subtitle1">56</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VendorDashboard;
