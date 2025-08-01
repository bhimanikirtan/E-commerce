import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Divider,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getVendorDetailsData } from "../Thunk/vendorThunk";
import { useRef } from "react";

function VendorAccount() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    businessname: "",
    businessemail: "",
    businessnumber: "",
    fullName: "",
    email: "",
    number: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const { vendor } = useSelector((state) => state.vendor);
  useEffect(() => {
    dispatch(getVendorDetailsData());
  }, [dispatch]);

  useEffect(() => {
    if (vendor) {
      setFormData({
        businessname: vendor.businessname || "",
        businessemail: vendor.businessemail || "",
        businessnumber: vendor.businessnumber || "",
        fullName: vendor.createdBy.fullName || "",
        email: vendor.createdBy.email || "",
        number: vendor.createdBy.number || "",
        address: vendor.businessAddress?.address || "",
        city: vendor.businessAddress?.city || "",
        state: vendor.businessAddress?.state || "",
        pincode: vendor.businessAddress?.pincode || "",
        country: vendor.businessAddress?.country || "",
      });
      setImageFile(`http://192.168.2.222:5000/${vendor.companylogo}`);
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("businessname", formData.businessname);
    form.append("businessnumber", formData.businessnumber);
    form.append("fullName", formData.fullName);
    form.append("number", formData.number);
    form.append("address", formData.address);
    form.append("city", formData.city);
    form.append("state", formData.state);
    form.append("pincode", formData.pincode);
    form.append("country", formData.country);
    if (imageFile instanceof File) {
      form.append("companylogo", imageFile);
    }
    for (let [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Account Settings
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
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
          <Box>
            <Typography variant="h3">{vendor?.businessname}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Business Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <TextField
                fullWidth
                label="Business Name"
                name="businessname"
                value={formData.businessname}
                onChange={handleChange}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Business Email"
                name="businessemail"
                value={formData.businessemail}
                disabled
              />

              <TextField
                type="number"
                fullWidth
                label="Business Number"
                name="businessnumber"
                value={formData.businessnumber}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Business Address
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Owner Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                disabled
              />
            </Box>

            <TextField
              fullWidth
              label="Phone Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </Box>
        </Box>

        <Box textAlign="right">
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default VendorAccount;
