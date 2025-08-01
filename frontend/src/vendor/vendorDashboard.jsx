import { Box, Typography } from "@mui/material";
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
      <Box>
        <Typography variant="h3" gutterBottom>
          Welcome, Vendor!
        </Typography>
      </Box>
    </Box>
  );
};

export default VendorDashboard;
