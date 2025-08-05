import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Chip,
  FormHelperText,
  TableContainer,
  Checkbox,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Skeleton,
} from "@mui/material";
import useIntersectionObserver from "../components/myHook/intersaction";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  getAllproductsData,
  addProductData,
  updateProductData,
  deleteProductData,
} from "../Thunk/productThunk";
import { useSelector, useDispatch } from "react-redux";
import { OutlinedInput } from "@mui/material";
import { useRef } from "react";
const names = ["Small", "Medium", "Large", "X-Large"];
const colors = [
  {
    id: "1",
    value: "red",
  },
  {
    id: "2",
    value: "green",
  },
  {
    id: "3",
    value: "blue",
  },
  {
    id: "4",
    value: "black",
  },
  {
    id: "5",
    value: "grey",
  },
];

function ManageProducts() {
  const dispatch = useDispatch();
  const loaderRef = useRef(null);
  const { products, total } = useSelector((state) => state.products);
  const selectProduct = products.filter(
    (p) => p.productStatus == "Approved" || p.productStatus == null
  );
  console.log(selectProduct, "*****************");

  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [editMode, setEditmode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState("");
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 9;
  useEffect(() => {
    dispatch(getAllproductsData({ skip: 0, limit }));
    setSkip(limit);
  }, [dispatch]);

  const loadMoreProducts = () => {
    if (loading || products.length >= total) return;
    setLoading(true);
    dispatch(getAllproductsData({ skip, limit })).finally(() => {
      setSkip((prev) => prev + limit);
      setLoading(false);
    });
  };
  useIntersectionObserver({
    target: loaderRef,
    onIntersect: loadMoreProducts,
    enabled: !loading && products.length < total,
  });

  const handaleOpen = () => {
    setOpen(true);
  };
  const handaleClose = () => {
    setOpen(false);
    setEditmode(false);
    setEditId(null);
    setEditData("");
    formik.resetForm();
    setImageFile(null);
  };

  useEffect(() => {
    if (editMode && editData) {
      formik.setValues({
        name: editData.name || "",
        price: editData.price || "",
        image: editData.image || "",
        description: editData.description || "",
        stock: editData.stock || "",
        productType: editData.productType || "",
        size: editData.size || [],
        color: editData.color || [],
      });
      setImageFile(`http://192.168.2.222:5000/${editData.image}`);
    }
  }, [editMode, editData]);

  const validationSchema = yup.object({
    name: yup
      .string("Name must in string")
      .required("Product name is required"),
    price: yup.number("Price must in number").required("price is required"),
    description: yup.string(),
    stock: yup.number("Stock must in number").required("stock is required"),
    size: yup
      .array()
      .min(1, "Select at least one option")
      .of(yup.string())
      .required("This field is required"),
    color: yup
      .array()
      .min(1, "Select at least one option")
      .of(yup.string())
      .required("This field is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      stock: "",
      productType: "",
      size: [],
      color: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("stock", values.stock);
      formData.append("productType", values.productType);
      values.size.forEach((size) => formData.append("size[]", size));
      values.color.forEach((color) => formData.append("color[]", color));
      if (imageFile && imageFile instanceof File) {
        formData.append("image", imageFile);
      }

      try {
        if (editMode) {
          await dispatch(
            updateProductData({ id: editId, values: formData })
          ).unwrap();
          handaleClose();
        } else {
          await dispatch(addProductData(formData)).unwrap();
          handaleClose();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProductData(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ p: 2 }}>
        <Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <h1>Add Product </h1>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mb: 4,
            }}
          >
            <Button
              onClick={handaleOpen}
              variant="contained"
              className="black"
              sx={{
                borderRadius: 5,
              }}
            >
              Add Product
            </Button>
            <Dialog open={open} onClose={handaleClose}>
              <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                  {editMode ? "Update Product" : "Add Product"}
                </DialogTitle>
                <DialogContent>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                      />
                      {imageFile && typeof imageFile === "string" ? (
                        <Box mt={1}>
                          <img
                            src={imageFile}
                            alt="Preview"
                            width={80}
                            height={80}
                          />
                        </Box>
                      ) : imageFile instanceof File ? (
                        <Box mt={1}>
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="New Preview"
                            width={80}
                            height={80}
                          />
                        </Box>
                      ) : null}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />

                      <TextField
                        type="number"
                        label="Price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && formik.errors.price}
                        helperText={formik.touched.price && formik.errors.price}
                      />
                    </Box>

                    <TextField
                      label="Description"
                      name="description"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />

                    <TextField
                      type="number"
                      label="Stock"
                      name="stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.stock && Boolean(formik.errors.stock)
                      }
                      helperText={formik.touched.stock && formik.errors.stock}
                    />
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Product Type</FormLabel>
                        <RadioGroup
                          row
                          name="productType"
                          value={formik.values.productType}
                          onChange={formik.handleChange}
                        >
                          <FormControlLabel
                            value="newArrival"
                            control={<Radio />}
                            label="New Arrival"
                          />
                          <FormControlLabel
                            value="topSelling"
                            control={<Radio />}
                            label="Top Selling"
                          />
                        </RadioGroup>
                      </FormControl>

                      <FormControl
                        sx={{ width: "100%" }}
                        error={
                          formik.touched.size && Boolean(formik.errors.size)
                        }
                      >
                        <InputLabel>Size Select</InputLabel>
                        <Select
                          multiple
                          fullWidth
                          name="size"
                          value={formik.values.size}
                          onChange={formik.handleChange}
                          input={<OutlinedInput label="Size Select" />}
                          renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                              {selected.map((value) => (
                                <Chip
                                  key={value.id}
                                  label={value}
                                  onDelete={() =>
                                    formik.setFieldValue(
                                      "size",
                                      formik.values.size.filter(
                                        (item) => item !== value
                                      )
                                    )
                                  }
                                  deleteIcon={
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  }
                                />
                              ))}
                            </Stack>
                          )}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              sx={{ justifyContent: "space-between" }}
                            >
                              {name}
                              {formik.values.size.includes(name) ? (
                                <CheckIcon color="info" />
                              ) : null}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.size && formik.errors.size && (
                          <FormHelperText>{formik.errors.size}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <FormControl
                        sx={{ width: "100%" }}
                        error={
                          formik.touched.color && Boolean(formik.errors.color)
                        }
                      >
                        <InputLabel>Color Select</InputLabel>
                        <Select
                          multiple
                          fullWidth
                          name="color"
                          value={formik.values.color}
                          onChange={formik.handleChange}
                          input={<OutlinedInput label="Color Select" />}
                          renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                              {selected.map((value) => (
                                <Box
                                  sx={{
                                    backgroundColor: value,
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                  }}
                                  key={value}
                                  label={value}
                                ></Box>
                              ))}
                            </Stack>
                          )}
                        >
                          {colors.map((color) => (
                            <MenuItem key={color.id} value={color.value}>
                              <Checkbox
                                checked={formik.values.color.includes(
                                  color.value
                                )}
                              />
                              {color.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.color && formik.errors.color && (
                          <FormHelperText>{formik.errors.color}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handaleClose}
                    variant="outlined"
                    className="white"
                    sx={{ borderRadius: 5 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    className="white"
                    sx={{ borderRadius: 5 }}
                  >
                    {editMode ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Box>
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
                    <TableCell>ProductType</TableCell>
                    <TableCell>colors</TableCell>
                    <TableCell align="center">Edit/Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectProduct?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10}>No Product Data Found</TableCell>
                    </TableRow>
                  ) : (
                    selectProduct?.map((prod) => {
                      return (
                        <TableRow key={prod._id}>
                          <TableCell>{prod.name}</TableCell>
                          <TableCell>
                            {prod?.addedBy == null
                              ? "Admin"
                              : prod?.addedBy?.businessname}
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
                          <TableCell>{prod.productType}</TableCell>
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
                          <TableCell align="center">
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                onClick={() => {
                                  handaleOpen();
                                  setEditmode(true);
                                  setEditId(prod._id);
                                  setEditData(prod);
                                }}
                              >
                                <EditIcon color="info" />
                              </Button>
                              <Button
                                onClick={() => {
                                  handleDelete(prod._id);
                                }}
                              >
                                <DeleteIcon color="error" />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
              <Box
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
              </Box>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ManageProducts;
