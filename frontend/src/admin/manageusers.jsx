import { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  IconButton,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUserData,
  getAllUsersData,
  updateUserByAdminData,
} from "../Thunk/adminThunk";

function ManageUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsersData());
  }, [dispatch]);

  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    image: "",
    address: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 3;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = users.slice(startIndex, endIndex);
  const totalPage = Math.ceil(users.length / itemPerPage);

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

  useEffect(() => {
    if (editData && isEditing) {
      setFormData({
        fullName: editData.fullName || "",
        email: editData.email || "",
        number: editData.number || "",
        image: editData.image || "",
        address: editData.address || "",
      });
      setImageFile(`http://192.168.2.222:5000/${editData.image}`);
    }
  }, [editData, isEditing]);
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: editData.fullName || "",
      email: editData.email || "",
      image: editData.image || "",
      number: editData.number || "",
      address: editData.address || "",
    });
  };

  const handleSave = async () => {
    try {
      // const form = new FormData();
      // form.append("fullName", formData.fullName);
      // form.append("number", formData.number);
      // form.append("email", formData.email);
      // form.append("address", formData.address);
      // if (imageFile instanceof File) {
      //   formData.image("image", imageFile);
      // }

      await dispatch(
        updateUserByAdminData({ id: editId, values: formData })
      ).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ p: 2 }}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="h4">Users</Typography>
          </Box>
          <Box
            sx={{
              border: "2px solid black",
              width: "100%",
            }}
          >
            <TableContainer style={{ height: 300 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>FullName</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {currentItems?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>No users found</TableCell>
                  </TableRow>
                ) : (
                  currentItems?.map((user) => (
                    <TableBody key={user._id}>
                      <TableRow>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>
                          {user.image && (
                            <Avatar
                              src={`http://192.168.2.222:5000/${user.image}`}
                              width="60"
                              height="60"
                            />
                          )}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell
                          style={{
                            maxWidth: "500px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.address}
                        </TableCell>
                        <TableCell>{user.number}</TableCell>
                        <TableCell>
                          {user.isSubscribe === "basic" ? (
                            <Chip label="Basic Plan" color="warning" />
                          ) : user.isSubscribe === "premium" ? (
                            <Chip label="Premium Plan" color="success" />
                          ) : (
                            <Chip label="Free Plan" color="info" />
                          )}
                        </TableCell>

                        <TableCell>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                dispatch(blockUserData(user._id));
                              }}
                            >
                              <BlockIcon color="error" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setIsEditing(true);
                                setEditId(user._id);
                                setEditData(user);
                              }}
                            >
                              <EditIcon color="info" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))
                )}
              </Table>
            </TableContainer>
            <Box
              sx={{
                width: "98%",
                display: "flex",
                flexDirection: "row",
                p: 1,
                gap: 5,
                justifyContent: "center",
              }}
            >
              <Button onClick={goPrev} disabled={currentPage === 1}>
                Previous
              </Button>
              {Array.from({ length: totalPage }, (_, index) => {
                const page = index + 1;
                return (
                  <Box sx={{}}>
                    <Button
                      key={page}
                      onClick={() => handleClickPage(page)}
                      sx={{
                        borderRadius: 5,
                        backgroundColor: currentPage === page ? "#000" : "#fff",
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
          </Box>
          <Box sx={{ mt: 5, width: "90%" }}>
            {users && (
              <Box sx={{ width: "100%", ml: 10 }}>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      maxWidth: 700,
                    }}
                  >
                    {isEditing ? (
                      <>
                        <Box>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />

                          <Box
                            onClick={handleAvatarClick}
                            sx={{ cursor: "pointer", display: "inline-block" }}
                          >
                            <Avatar
                              src={
                                imageFile
                                  ? typeof imageFile === "string"
                                    ? imageFile
                                    : URL.createObjectURL(imageFile)
                                  : ""
                              }
                              alt="User Avatar"
                              sx={{ width: 80, height: 80 }}
                            />
                          </Box>
                        </Box>
                        <TextField
                          label="Full Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          fullWidth
                        />
                        <TextField
                          label="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          fullWidth
                        />
                        <TextField
                          label="Mobile Number"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          fullWidth
                        />
                        <TextField
                          label="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          fullWidth
                        />
                        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                          <Button
                            sx={{ borderRadius: 7, px: 2 }}
                            variant="contained"
                            className="black"
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                          <Button
                            sx={{ borderRadius: 7, px: 2 }}
                            variant="outlined"
                            className="white"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ManageUsers;
