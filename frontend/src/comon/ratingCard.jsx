import { Box, Container, Grid, Rating, Typography } from "@mui/material";
import GreenTik from "../assets/greentik.png";
import moment from "moment";

const RatingCard = ({ item}) => {
  return (
     <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          width: "auto",
          height: "220px",
          borderRadius: "10px",
          border: "2px solid #ccc",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
        }}
      >
        <Typography>
          <Rating
            size="large"
            name="read-only"
            value={Number(item.rating?.toFixed(1))}
            precision={0.5}
            readOnly
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{item.userId.fullName}</Typography>
          <img width={20} height={20} src={GreenTik} alt="" />
        </Box>
        <Typography variant="body1">{item.comment}</Typography>
        <Typography variant="h6">
          {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
      </Box>
    </Container>
  );
};
export default RatingCard;
