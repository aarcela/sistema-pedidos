import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#091a5d",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f50057",
      },
      error: {
        main: "#ec2139",
      },
      text: {
        primary: "#505050",
      },
      success: {
        main: "#48d98a",
      },
      shape: {
        borderRadius: 0,
      },
      spacing: 8,
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
