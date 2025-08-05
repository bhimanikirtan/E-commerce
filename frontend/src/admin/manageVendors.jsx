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
import {
  getAllVendorswithProductsData,
  updateVendorProductStatusData,
  updateVendorStatusData,
} from "../Thunk/adminThunk";

function ManageVendors() {
  const dispatch = useDispatch();
  const { allVendors } = useSelector((state) => state.admin);
  const [tab, setTab] = useState(0);
  console.log(allVendors);

  useEffect(() => {
    dispatch(getAllVendorswithProductsData());
  }, [dispatch]);

  const handleApprove = async (vendorId) => {
    await dispatch(updateVendorStatusData(vendorId));
    await dispatch(getAllVendorswithProductsData());
  };
  const handleProductApprove = async (vendorId) => {
    await dispatch(updateVendorProductStatusData(vendorId));
    await dispatch(getAllVendorswithProductsData());
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
            <Tab label="Manage VendorProducts" />
            <Tab label="Settings" />
          </Tabs>
        </Box>

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
          <Box
            sx={{
              border: "2px solid black",
              width: "100%",
            }}
          >
            <TableContainer
              id="scrollableDiv"
              style={{ height: 530, overflow: "auto" }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ Width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>colors</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allVendors?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10}>No Product Data Found</TableCell>
                    </TableRow>
                  ) : (
                    allVendors?.map((vendor) =>
                      vendor.products?.map((prod) => (
                        <TableRow key={prod._id}>
                          <TableCell>{prod.name}</TableCell>
                          <TableCell>
                            {prod?.addedBy == null
                              ? "Admin"
                              : vendor?.businessname}
                          </TableCell>
                          <TableCell>
                            {prod.image && (
                              <img
                                src={`http://192.168.2.222:5000/${prod.image}`}
                                width="60"
                                height="60"
                              />
                            )}
                          </TableCell>
                          <TableCell>{prod.price}</TableCell>
                          <TableCell
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {prod.description}
                          </TableCell>
                          <TableCell>{prod.stock}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              {prod.size?.map((name, index) => (
                                <Chip key={index} label={name} />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1,
                              }}
                            >
                              {prod.color?.map((color, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    backgroundColor: color,
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                  }}
                                ></Box>
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Chip
                              label={prod?.productStatus}
                              color={
                                prod?.productStatus === "Approved"
                                  ? "success"
                                  : "warning"
                              }
                              variant="filled"
                              size="medium"
                            />
                          </TableCell>
                          <TableCell>
                            {prod.productStatus === "pending" ? (
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleProductApprove(prod._id)}
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
                      ))
                    )
                  )}
                </TableBody>
              </Table>
              {/* <Box
                ref={loaderRef}
                id="loader"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  px: 2,
                  py: 3,
                }}
              >
                {loading && (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Skeleton width="15%" height={80} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton variant="rectangular" width={70} height={60} />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 2,
                      }}
                    >
                      <Skeleton width="7%" height={40} />
                      <Skeleton width="15%" height={40} />
                      <Skeleton width="7%" height={40} />
                      <Skeleton width="15%" height={90} />
                      <Skeleton width="10%" height={40} />
                      <Skeleton width="25%" height={70} />
                      <Skeleton width="15%" height={50} />
                    </Box>
                  </Box>
                )}
              </Box> */}
            </TableContainer>
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
