import { createTheme } from "@mui/material/styles";
import { MuiButton, MuiTypography } from "./ThemeComponent";

const getTheme = (mode) => {
  const baseTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#ffffff" : "#000000",
      },
      secondary: {
        main: mode === "dark" ? "#000000" : "#ffffff",
      },
      background: {
        primary: mode === "dark" ? "#000000" : "#f0f0f0",
        secondary: mode === "dark" ? "#ffffff" : "#000000",
        container: mode === "dark" ? "#000000" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
    breakpoints: {
      xs: 375,
      ssm: 541,
      sm: 769,
      md: 931,
      lg: 1240,
      xl: 1440,
      xxl: 1536,
    },
  });

  return createTheme(baseTheme, {
    components: {
      MuiButton: MuiButton(baseTheme),
      MuiTypography: MuiTypography(baseTheme),
    },
  });
};

export default getTheme;
