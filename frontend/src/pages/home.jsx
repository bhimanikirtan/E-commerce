import {
  Box,
  Button,
  Container,
  Divider,
  keyframes,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import hero from "../assets/hero.jpg";
import star from "../assets/Vector.png";
import NewArrivalProduct from "../components/newArrivalProduct";
import TopSellingProduct from "../components/topSellingProduct";
import Frame1 from "../assets/Frame 1.png";
import Frame2 from "../assets/Frame 2 (2).png";
import Frame3 from "../assets/Frame 3.png";
import Frame4 from "../assets/Frame 4.png";
import GreenTik from "../assets/greentik.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm", "ssm", "xs"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const Review = [
    {
      id: 1,
      name: "Sarah M.",
      review:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      id: 2,
      name: "Alex K.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      id: 3,
      name: "James L.",
      review:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
  ];
  const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

  const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];
  return (
    <>
      <Header />
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: {
                xs: "column",
                ssm: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
                xxl: "row",
              },
            }}
          >
            <Box
              sx={{
                width: "auto",
                backgroundColor: theme.palette.background.primary,
                p: isMobile ? 2 : 10,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 2 : 4,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: isMobile ? 500 : "",
                  }}
                  variant={isMobile ? "h4" : "h3"}
                >
                  FIND CLOTHES THAT MATCHES YOUR STYLE
                </Typography>
              </Box>
              <Box>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  Browse through our diverse range of meticulously crafted
                  garments, designed to bring out your individuality and cater
                  to your sense of style.
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => {
                    navigate("/categoryPage");
                  }}
                  variant="contained"
                  className="black"
                  sx={{
                    width: isMobile ? "100%" : "30%",
                    borderRadius: 10,
                    p: isMobile ? 1 : 1.5,
                  }}
                >
                  shop now
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: isMobile ? "wrap" : "",
                  flexDirection: "row",
                  gap: isMobile ? 2 : 8,
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box className="Box">
                  <Typography variant="h4">200 +</Typography>
                  <Typography variant="body2">International Brands</Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: isMobile ? "none" : "block" }}
                />

                <Box className="Box">
                  <Typography variant="h4">2,000 +</Typography>
                  <Typography variant="body2">High-Quality Products</Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: isMobile ? "none" : "block" }}
                />

                <Box className="Box">
                  <Typography variant="h4">30,000 +</Typography>
                  <Typography variant="body2">Happy Customers</Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  ssm: "100%",
                  sm: "100%",
                  md: "100%",
                  xl: "50%",
                  xxl: "50%",
                },
                height: {
                  xs: "600px",
                  ssm: "400px",
                  sm: "600px",
                  md: "700px",
                  xl: "600px",
                  xxl: "auto",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={hero}
                  alt="Hero"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  component="img"
                  src={star}
                  alt="Star Top"
                  sx={{
                    position: "absolute",
                    width: {
                      xs: "50px",
                      ssm: "35px",
                      sm: "70px",
                      md: "80px",
                      xl: "100px",
                    },
                    top: "30px",
                    right: "20px",
                  }}
                />
                <Box
                  component="img"
                  src={star}
                  alt="Star Bottom"
                  sx={{
                    position: "absolute",
                    width: {
                      xs: "40px",
                      ssm: "30px",
                      sm: "50px",
                      md: "60px",
                      xl: "80px",
                    },
                    bottom: { xs: "60%", sm: "40%" },
                    left: "10px",
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "auto",
              backgroundColor: "#000",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 2,
              py: 2,
            }}
          >
            {brands.map((brand, index) => (
              <Box
                key={brand}
                sx={{
                  opacity: 0,
                  animation: `${fadeIn} 0.5s ease forwards`,
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h3"}
                  sx={{ color: "#fff", textAlign: "center" }}
                >
                  {brand}
                </Typography>
              </Box>
            ))}
          </Box>

          <NewArrivalProduct />
          <TopSellingProduct />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "auto",
                backgroundColor: theme.palette.background.primary,
                borderRadius: "40px",
                mt: 6,
              }}
            >
              <Box sx={{ width: "auto" }}>
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "auto",
                  }}
                >
                  <Typography variant={isMobile ? "h5" : "h3"}>
                    BROWSE BY DRESS STYLE
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 5,
                    width: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        ssm: "column",
                        sm: "column",
                        md: "column",
                        lg: "row",
                        xl: "row",
                        xxl: "row",
                      },
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "auto",
                      }}
                    >
                      <Box
                        component="img"
                        src={Frame1}
                        alt=""
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "auto",
                      }}
                    >
                      <Box
                        component="img"
                        src={Frame2}
                        alt=""
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "auto",
                      }}
                    >
                      <Box
                        component="img"
                        src={Frame3}
                        alt=""
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "auto",
                      }}
                    >
                      <Box
                        component="img"
                        src={Frame4}
                        alt=""
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : isTab ? "column" : "row",
                gap: isMobile ? 1 : 4,
              }}
            >
              {Review.map((item) => (
                <Box
                  key={item.id}
                  container
                  sx={{
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      width: "auto",
                      height: "240px",
                      borderRadius: "20px",
                      border: "1px solid #ccc",
                      p: isMobile ? 1 : 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography>
                      <Rating
                        name="read-only"
                        value={4.5}
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
                      <Typography variant="h5">{item.name}</Typography>
                      <img width={20} height={20} src={GreenTik} alt="" />
                    </Box>
                    <Typography variant="body1">{item.review}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Footer />
        </Box>
      </Container>
    </>
  );
}

export default Home;
