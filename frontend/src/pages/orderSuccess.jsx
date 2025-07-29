import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

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

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/profile/myOrders")}
          sx={{ mt: 4, px: 4, py: 1.5, borderRadius: 2 }}
        >
          View My Orders
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderSuccessPage;
