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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { addVendorDetailsData } from "../Thunk/vendorThunk";

function AddVendorDetails({ open, onClose, editData, editAddMode }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
        await dispatch(addVendorDetailsData(values)).unwrap();

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
            {editAddMode ? t("Update Vendor Detail") : t("Add Vendor Detail")}
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
                  label={t("businessname")}
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
                  label={t("businessemail")}
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
                  label={t("businessnumber")}
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
                  label={t("address")}
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
                  label={t("city")}
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
                  label={t("state")}
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                  fullWidth
                />
                <TextField
                  label={t("pincode")}
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
                  label={t("country")}
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
                  {editAddMode ? t("Update") : t("Add")}
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
