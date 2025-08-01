import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Chip,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendorsData, updateVendorStatusData } from "../Thunk/adminThunk";

function ManageVendors() {
  const dispatch = useDispatch();
  const { allVendors } = useSelector((state) => state.admin);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(getAllVendorsData());
  }, [dispatch]);

  const handleApprove = async (vendorId) => {
    await dispatch(updateVendorStatusData(vendorId));
    await dispatch(getAllVendorsData());
  };

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ p: 2 }}>
      <Box>
        <Box>
          <Typography variant="h4">Manage Vendors</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Manage Vendors" />
            <Tab label="Blocked Vendors" />
            <Tab label="Settings" />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {tab === 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Business Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allVendors?.map((vendor) => (
                  <TableRow key={vendor._id}>
                    <TableCell>{vendor.businessname}</TableCell>
                    <TableCell>{vendor.businessemail}</TableCell>
                    <TableCell>{vendor.businessnumber}</TableCell>
                    <TableCell>
                      <Chip
                        label={vendor.status}
                        color={
                          vendor.status === "Approved" ? "success" : "warning"
                        }
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {vendor.status === "pending" ? (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleApprove(vendor._id)}
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button variant="outlined" size="small" disabled>
                          Approved
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 1 && (
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Blocked Vendors feature coming soon...
            </Typography>
          </Box>
        )}

        {tab === 2 && (
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Settings page coming soon...
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ManageVendors;
