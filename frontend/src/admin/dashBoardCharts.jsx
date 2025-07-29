import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalyticsData } from "../Thunk/adminThunk";

const DashboardCharts = () => {
  const dispatch = useDispatch();
  const { monthlySales, userGrowth, orderStatus, productStock } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAnalyticsData());
  }, [dispatch]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const colors = ["#FF0000", "#008000", "#FFA500"];
  const monthlyView = monthlySales.map((m) => ({
    month: months[m._id],
    sales: m.totalSales,
  }));
  const userGrowthData = userGrowth.map((item) => ({
    month: months[item._id],
    users: item.count,
  }));
  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Monthly Sales
            </Typography>
            <BarChart
              dataset={monthlyView}
              xAxis={[{ dataKey: "month", label: "Month" }]}
              series={[{ dataKey: "sales", label: "Sales (₹)" }]}
              width={565}
              height={175}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              User Growth
            </Typography>

            <BarChart
              dataset={userGrowthData}
              xAxis={[{ dataKey: "month", label: "Month" }]}
              series={[{ dataKey: "users", label: "Users Registered" }]}
              width={565}
              height={175}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Order Status
            </Typography>
            <PieChart
              series={[
                {
                  data: orderStatus.map((s) => ({
                    id: s._id,
                    value: s.count,
                    label: s._id,
                  })),
                },
              ]}
              width={475}
              height={200}
              colors={colors}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Product Status
            </Typography>
            <BarChart
              dataset={productStock}
              xAxis={[{ dataKey: "name", label: "Product" }]}
              series={[{ dataKey: "stock", label: "Stock" }]}
              width={565}
              height={175}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default DashboardCharts;
