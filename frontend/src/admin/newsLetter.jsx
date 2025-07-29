import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmailData,
  getAllEmailsData,
  sendNewsLetterData,
} from "../Thunk/newSletterThunk";

export default function NewsLetter() {
  const dispatch = useDispatch();
  const { allEmails, loading } = useSelector((state) => state.newSletter);
  console.log("allEmails", allEmails);
  const [form, setForm] = useState({
    subject: "",
    title: "",
    message: "",
  });
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(sendNewsLetterData({ values: form }));
    setForm({ subject: "", title: "", message: "" });
  };

  useEffect(() => {
    dispatch(getAllEmailsData());
  }, [dispatch]);

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs value={value} onChange={handleChangeTab} sx={{ width: "100%" }}>
          <Tab label="Send NewsLetter" sx={{ width: "33%" }} />
          <Tab
            label={`Email List (${allEmails?.length || 0})`}
            sx={{ width: "33%" }}
          />
        </Tabs>
      </Box>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={80} color="primary" />
        </Box>
      ) : (
        <>
          {value === 0 && (
            <Paper sx={{ p: 4, m: 2 }}>
              <Typography variant="h4" gutterBottom>
                Send Newsletter
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Subject"
                  name="subject"
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Title"
                  name="title"
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    className="black"
                    sx={{ p: 1.5, borderRadius: 7, width: "30%" }}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}
        </>
      )}
      {value === 1 && (
        <Paper sx={{ p: 4, m: 2 }}>
          <Typography variant="h4" gutterBottom>
            Newsletter Subscribers
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allEmails.map((emailItem) => (
                  <TableRow key={emailItem._id}>
                    <TableCell>{emailItem.email}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          dispatch(deleteEmailData(emailItem._id));
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {allEmails.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No subscribers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}
