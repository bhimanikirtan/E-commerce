import { Box, Card, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountByAdminData } from "../Thunk/adminThunk";
import product from "../assets/product-line-icon-vector.jpg";
import orders from "../assets/clipboard.png";
import users from "../assets/group.png";
import DashboardCharts from "./dashBoardCharts";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { usersCount, orderCount, productCount } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAllCountByAdminData());
  }, [dispatch]);
  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          width: "100%",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "auto",
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          <Card sx={{ p: 2, mb: 2, width: "33%" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" component="h2">
                  Total Product
                </Typography>

                <Typography variant="h4" component="h2">
                  {productCount}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <img src={product} alt="" style={{ width: "100px" }} />
              </Box>
            </Box>
          </Card>

          <Card sx={{ p: 2, mb: 2, width: "33%" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" component="h2">
                  Total Orders
                </Typography>

                <Typography variant="h4" component="h2">
                  {orderCount}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <img src={orders} alt="" style={{ width: "90px" }} />
              </Box>
            </Box>
          </Card>

          <Card sx={{ p: 2, mb: 2, width: "33%" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" component="h2">
                  Total Users
                </Typography>

                <Typography variant="h4" component="h2">
                  {usersCount}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <img src={users} alt="" style={{ width: "90px" }} />
              </Box>
            </Box>
          </Card>
        </Box>
        <DashboardCharts />
      </Box>
    </Container>
  );
}

export default AdminDashboard;
