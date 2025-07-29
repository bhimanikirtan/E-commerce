import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteAddress,
  getAddress,
  setDefaultAddressData,
} from "../../redux/authSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddAddress from "../addAddress/addAddress";

function MyAddress() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [editAddMode, setEditAddMode] = useState(false);
  const [editAddId, setEditAddId] = useState(null);
  const [editAddData, setEditAddData] = useState("");
  const { address, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  const handleDeleteAddress = async (id) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAddress = (add) => {
    setOpen(true);
    setEditAddMode(true);
    setEditAddId(add._id);
    setEditAddData(add);
  };

  const handleSetDefault = async (id) => {
    try {
      await dispatch(setDefaultAddressData(id)).unwrap();
      dispatch(getAddress());
    } catch (error) {
      console.error("Failed to set default address", error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const currentItems = (address || []).slice(startIndex, endIndex);
  const totalPage = Math.ceil((address?.length || 0) / itemPerPage);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              width: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography variant={isMobile ? "h6" : "h4"} fontWeight={600}>
                My Address
              </Typography>
            </Box>

            <Box>
              {user?.isSubscribe === "basic" ||
              (user?.isSubscribe === "free" && address?.length >= 1) ? null : (
                <Button variant="contained" onClick={() => setOpen(true)}>
                  + Add New Address
                </Button>
              )}
            </Box>
          </Box>
          <AddAddress
            open={open}
            editAddMode={editAddMode}
            editData={editAddData}
            editId={editAddId}
            onClose={() => {
              setOpen(false);
              setEditAddMode(false);
            }}
          />
          <Paper elevation={3} sx={{ mt: 2, p: 1 }}>
            <TableContainer style={{ height: 430 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Default</TableCell>
                    <TableCell>S. No</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Pincode</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>

                {currentItems?.length === 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={8}>No address found</TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {currentItems?.map((add, index) => (
                      <TableRow key={add._id}>
                        <TableCell>
                          <Checkbox
                            checked={add.default || false}
                            onChange={() => handleSetDefault(add._id)}
                          />
                        </TableCell>
                        <TableCell>{startIndex + index + 1}</TableCell>
                        <TableCell>{add.address}</TableCell>
                        <TableCell>{add.city}</TableCell>
                        <TableCell>{add.pincode}</TableCell>
                        <TableCell>{add.state}</TableCell>
                        <TableCell>{add.country}</TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton
                              onClick={() => handleDeleteAddress(add._id)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                            <IconButton onClick={() => handleEditAddress(add)}>
                              <EditIcon color="info" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {address?.length > 5 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  p: 1,
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={goPrev} disabled={currentPage === 1}>
                  Previous
                </Button>
                {Array.from({ length: totalPage }, (_, index) => {
                  const page = index + 1;
                  return (
                    <Box sx={{}} key={page}>
                      <Button
                        onClick={() => handleClickPage(page)}
                        sx={{
                          borderRadius: 5,
                          backgroundColor:
                            currentPage === page ? "#000" : "#fff",
                          color: currentPage === page ? "#fff" : "#000",
                          cursor: "pointer",
                        }}
                      >
                        {page}
                      </Button>
                    </Box>
                  );
                })}
                <Button onClick={goNext} disabled={currentPage === totalPage}>
                  Next
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default MyAddress;
