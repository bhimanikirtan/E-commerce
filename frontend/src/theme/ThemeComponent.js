export const MuiButton = (theme) => ({
  styleOverrides: {
    root: {
      cursor: "pointer",
      fontFamily: "'Roboto', sans-serif",
      transition: "background-color 0.3s ease",
      textTransform: "none",
    },
  },
  variants: [
    {
      props: { variant: "contained" },
      style: {
        "&.black": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          fontWeight: 500,
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            border: `1px solid  ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
          },
        },
      },
    },
    {
      props: { variant: "outlined" },
      style: {
        "&.white": {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
          fontWeight: 500,
          border: `1px solid ${theme.palette.primary.main}`,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          },
        },
      },
    },
  ],
});

export const MuiTypography = (theme) => ({
  styleOverrides: {
    root: {},
  },
  variants: [
    {
      props: { variant: "h1" },
      style: {
        fontSize: "60px",
        fontWeight: 700,
        color: theme.palette.text.primary,
      },
    },
    {
      props: { variant: "h2" },
      style: {
        fontSize: "48px",
        fontWeight: 700,
        color: theme.palette.text.primary,
      },
    },
    {
      props: { variant: "h3" },
      style: {
        fontSize: "40px",
        fontWeight: 600,
        color: theme.palette.text.primary,
      },
    },
    {
      props: { variant: "h4" },
      style: {
        fontSize: "32px",
        fontWeight: 500,
        color: theme.palette.text.primary,
      },
    },
    {
      props: { variant: "h5" },
      style: {
        fontSize: "24px",
        fontWeight: 500,
        color: theme.palette.text.primary,
      },
    },
    {
      props: { variant: "h6" },
      style: {
        fontSize: "20px",
        fontWeight: 500,
        color: theme.palette.text.primary,
      },
    },
    {
      props: { variant: "body1" },
      style: {
        fontSize: "16px",
        fontWeight: 400,
        color: theme.palette.text.primary,
      },
    },
    {
      props: { variant: "body2" },
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: theme.palette.text.primary,
      },
    },
  ],
});
