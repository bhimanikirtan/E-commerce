import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  fetchUser,
  getAddress,
  updateAddress,
  updateUser,
} from "../redux/authSlice";

import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, address } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const defaultAddress = Array.isArray(address)
    ? address?.find((addr) => addr.default === true)
    : null;

  console.log(defaultAddress);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
  });
  const [addressFormData, setAddressFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAddress());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        number: user.number || "",
      });
      setImageFile(`http://192.168.2.222:5000/${user.image}`);
    }
    if (defaultAddress) {
      setAddressFormData({
        address: defaultAddress?.address || "",
        city: defaultAddress?.city || "",
        pincode: defaultAddress?.pincode || "",
        state: defaultAddress?.state || "",
        country: defaultAddress?.country || "",
      });
    }
  }, [user, defaultAddress]);
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["fullName", "email", "number"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setAddressFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("number", formData.number);
      if (imageFile instanceof File) {
        form.append("image", imageFile);
      }
      await dispatch(updateUser(form)).unwrap();
      console.log(addressFormData);
      if (defaultAddress) {
        await dispatch(
          updateAddress({ id: defaultAddress._id, values: addressFormData })
        ).unwrap();
      } else {
        await dispatch(addAddress(addressFormData)).unwrap();
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ p: 1 }}>
        <Typography
          variant={isMobile ? "h6" : "h4"}
          gutterBottom
          fontWeight={600}
        >
          My Profile
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Update your profile and preferences.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            src={
              imageFile
                ? typeof imageFile === "string"
                  ? imageFile
                  : URL.createObjectURL(imageFile)
                : ""
            }
            sx={{ width: 80, height: 80 }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => fileInputRef.current.click()}
          >
            Upload
          </Button>
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveImage}
          >
            Remove
          </Button>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Full Name
        </Typography>

        <TextField
          placeholder="Enter your full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          sx={{
            mb: 1,
            // backgroundColor: "#f5f5f5",
            borderRadius: 1,
          }}
        />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Email
        </Typography>
        <TextField
          name="email"
          value={formData.email}
          disabled
          fullWidth
          sx={{
            mb: 1,
            // backgroundColor: "#f5f5f5",
            borderRadius: 1,
          }}
        />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Number
        </Typography>
        <TextField
          name="number"
          value={formData.number}
          onChange={handleChange}
          fullWidth
          sx={{
            mb: 1,
            // backgroundColor: "#f5f5f5",
            borderRadius: 1,
          }}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                🇮🇳 +91
              </Box>
            ),
          }}
        />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Address
        </Typography>
        <TextField
          name="address"
          value={addressFormData.address}
          onChange={handleChange}
          fullWidth
          sx={{
            mb: 1,
            // backgroundColor: "#f5f5f5",
            borderRadius: 1,
          }}
        />
        <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
          <Box sx={{ width: "40%", display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              City
            </Typography>
            <TextField
              name="city"
              value={addressFormData.city}
              onChange={handleChange}
              sx={{
                mb: 1,
                // backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
            />
          </Box>
          <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Pincode
            </Typography>
            <TextField
              name="pincode"
              value={addressFormData.pincode}
              onChange={handleChange}
              sx={{
                mb: 1,
                // backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
          <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              State
            </Typography>
            <TextField
              name="state"
              value={addressFormData.state}
              onChange={handleChange}
              sx={{
                mb: 1,
                // backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
            />
          </Box>
          <Box sx={{ width: "40%", display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Country
            </Typography>
            <TextField
              name="country"
              value={addressFormData.country}
              onChange={handleChange}
              sx={{
                mb: 1,
                // backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" className="black" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
