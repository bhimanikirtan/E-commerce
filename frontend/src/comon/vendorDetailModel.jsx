import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addVendorDetailsData } from "../Thunk/vendorThunk";
import { useState } from "react";

function AddVendorDetails({ open, onClose }) {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const validationSchema = yup.object({
    businessname: yup.string().required("businessname is required"),
    businessemail: yup
      .string()
      .email("Invalid email")
      .required("businessemail is required"),
    businessnumber: yup.string().required("businessnumber is required"),
    address: yup.string().required("address is required"),
    city: yup.string().required("city is required"),
    pincode: yup.string().required("pincode is required"),
    country: yup.string().required("country is required"),
    state: yup.string().required("state is required"),
  });
  const formik = useFormik({
    initialValues: {
      businessname: "",
      businessemail: "",
      businessnumber: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
      state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const formData = new FormData();

        formData.append("businessname", values.businessname);
        formData.append("businessemail", values.businessemail);
        formData.append("businessnumber", values.businessnumber);
        formData.append("address", values.address);
        formData.append("city", values.city);
        formData.append("state", values.state);
        formData.append("pincode", values.pincode);
        formData.append("country", values.country);

        if (imageFile instanceof File) {
          formData.append("companylogo", imageFile);
        }

        await dispatch(addVendorDetailsData(formData)).unwrap();

        formik.resetForm();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4">Add Vendor Detail</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={
                    imageFile
                      ? typeof imageFile === "string"
                        ? imageFile
                        : URL.createObjectURL(imageFile)
                      : ""
                  }
                  alt="Company Logo"
                  sx={{ width: 56, height: 56 }}
                />
                <Button variant="outlined" component="label">
                  {formik.values.companylogo
                    ? formik.values.companylogo.name
                    : "Upload Company Logo"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="companylogo"
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>

              {formik.touched.companylogo && formik.errors.companylogo && (
                <Typography color="error" variant="body2" mt={1}>
                  {formik.errors.companylogo}
                </Typography>
              )}
              <Box>
                <TextField
                  label="Businessname"
                  name="businessname"
                  value={formik.values.businessname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessname &&
                    Boolean(formik.errors.businessname)
                  }
                  helperText={
                    formik.touched.businessname && formik.errors.businessname
                  }
                  fullWidth
                />
              </Box>

              <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
                <TextField
                  label="Businessemail"
                  name="businessemail"
                  value={formik.values.businessemail}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessemail &&
                    Boolean(formik.errors.businessemail)
                  }
                  helperText={
                    formik.touched.businessemail && formik.errors.businessemail
                  }
                  fullWidth
                />
                <TextField
                  label="Businessnumber"
                  name="businessnumber"
                  type="number"
                  value={formik.values.businessnumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessnumber &&
                    Boolean(formik.errors.businessnumber)
                  }
                  helperText={
                    formik.touched.businessnumber &&
                    formik.errors.businessnumber
                  }
                  fullWidth
                />
              </Box>

              <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
                <TextField
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  fullWidth
                />
                <TextField
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  fullWidth
                />
              </Box>

              <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
                <TextField
                  label="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                  fullWidth
                />
                <TextField
                  label="Pincode"
                  name="pincode"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pincode && Boolean(formik.errors.pincode)
                  }
                  helperText={formik.touched.pincode && formik.errors.pincode}
                  fullWidth
                />
              </Box>

              <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
                <TextField
                  label="Country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddVendorDetails;
