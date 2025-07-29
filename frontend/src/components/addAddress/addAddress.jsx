import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addAddress, getAddress, updateAddress } from "../../redux/authSlice";
import { useEffect } from "react";

function AddAddress({ open, onClose, editData, editId, editAddMode }) {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    address: yup.string().required("address is required"),
    city: yup.string().required("city is required"),
    pincode: yup.string().required("pincode is required"),
    country: yup.string().required("country is required"),
    state: yup.string().required("state is required"),
  });
  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      pincode: "",
      country: "",
      state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (editAddMode && editData) {
          await dispatch(updateAddress({ id: editId, values })).unwrap();
        } else {
          await dispatch(addAddress(values)).unwrap();
        }
        formik.resetForm();
        onClose();
        await dispatch(getAddress()).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  useEffect(() => {
    if (editAddMode && editData) {
      formik.setValues({
        address: editData.address || "",
        city: editData.city || "",
        pincode: editData.pincode || "",
        country: editData.country || "",
        state: editData.state || "",
      });
    }
  }, [editAddMode, editData]);
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4">
            {editAddMode ? "Update Address" : "Add Address"}
          </Typography>
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
              <Box>
                <TextField
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 3,
                }}
              >
                <TextField
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
                <TextField
                  label="Pincode"
                  name="pincode"
                  type="number"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pincode && Boolean(formik.errors.pincode)
                  }
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 3,
                }}
              >
                <TextField
                  label="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
                <TextField
                  label="Country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
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
                  {editAddMode ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddAddress;
