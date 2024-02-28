import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "../redux/store";
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
