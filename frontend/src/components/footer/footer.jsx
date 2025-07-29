import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import paymenttype1 from "../../assets/paymenttype1.png";
import paymenttype2 from "../../assets/paymenttype2.png";
import paymenttype3 from "../../assets/paymenttype3.png";
import paymenttype4 from "../../assets/paymenttype4.png";
import paymenttype5 from "../../assets/paymenttype5.png";
import { useTheme } from "@emotion/react";
import { useMediaQuery, Button } from "@mui/material";
import { Box } from "@mui/material";
import { openSnackbar } from "../../redux/snackBarSlice";
import { addNewSletterData } from "../../Thunk/newSletterThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../redux/authSlice";

function Footer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubscribe = async () => {
    if (!email) {
      openSnackbar({ massage: "Please enter your email", severity: "error" });
      return;
    }
    try {
      console.log(email);
      dispatch(addNewSletterData({ email }));
      setEmail("");
    } catch (err) {
      openSnackbar({ massage: err.message, severity: "error" });
    }
  };
  console.log(user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          mt: 20,
          backgroundColor: theme.palette.background.primary,
          position: "relative",
        }}
      >
        <Box
          sx={{
            padding: isMobile ? "10px" : "50px",
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 4, sm: 7, md: 10, lg: 15, xl: 16 },
            alignItems: "flex-start",
            mt: 20,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box>
                <Typography variant="h4">SHOP.CO</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1">
                {" "}
                We have clothes that suits your style <br />
                and which you’re proud to wear. <br />
                From women to men.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <TwitterIcon />
              </Avatar>
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#000",
                  color: "#fff",
                }}
              >
                <FacebookIcon />
              </Avatar>
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <InstagramIcon />
              </Avatar>
              <Avatar
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <GitHubIcon />
              </Avatar>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                COMPANY
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">About</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Features</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Works </Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Career </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                HELP
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Customer Support</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Delivery Details</Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Terms & Conditions</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Privacy Policy</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                FAQ
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Account</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Manage Deliveries</Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Orders</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Payments</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                RESOURCES
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Free eBooks</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Development Tutorial</Typography>
            </Box>
            <Box>
              <Typography variant="body1"> How to - Blog</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Youtube Playlist</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />
        <Box
          sx={{
            display: "flex",
            p: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">
            Shop.co © 2000-2023, All Rights Reserved
          </Typography>
          <Box>
            <img src={paymenttype1} alt="" />
            <img src={paymenttype2} alt="" />
            <img src={paymenttype3} alt="" />
            <img src={paymenttype4} alt="" />
            <img src={paymenttype5} alt="" />
          </Box>
        </Box>
        {user?.isSubscribe !== "free" && (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "20px",
              backgroundColor: "#000",
              position: "absolute",
              top: "-100px",
            }}
          >
            <Box
              sx={{
                gap: 3,
                width: "auto",
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                p: 3,
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: { md: "50%", lg: "60%" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1.25rem",
                      sm: "2rem",
                      md: "2.5rem",
                    },
                    color: "#fff",
                  }}
                >
                  STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </Typography>
              </Box>

              <Box
                sx={{
                  width: { md: "50%", lg: "40%", xl: "30%" },
                  height: "100px",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <input
                  type="email"
                  aria-label="Subscribe Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    height: "100%",
                    padding: "0 20px",
                    backgroundColor: "#FFF",
                    borderRadius: "62px",
                    fontSize: "1rem",
                    border: "none",
                    outline: "none",
                  }}
                  placeholder="Enter your email"
                  required
                />
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    p: 1,
                    width: "100%",
                    borderRadius: "62px",
                  }}
                  onClick={handleSubscribe}
                >
                  Subscribe to Newsletter
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Footer;
