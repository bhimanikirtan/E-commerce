import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { invoiceData } from "../Thunk/paymentThunk";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const downloadPDF = async () => {
    try {
      const blob = await dispatch(invoiceData(sessionId)).unwrap();
      console.log("abdchjfbhjdbhfbs", blob);
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${sessionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: "green", mb: 2 }} />
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          Your order has been placed successfully.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/profile/myOrders")}
            sx={{ mt: 4, px: 4, py: 1.5, borderRadius: 2 }}
          >
            View My Orders
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPDF}
            sx={{ mt: 4, px: 4, py: 1.5, borderRadius: 2 }}
          >
            Download PDF
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderSuccessPage;
