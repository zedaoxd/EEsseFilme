import { red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    primary: {
      light: red[500],
      main: red[700],
      dark: red[300],
      contrastText: "#fff",
    },
    secondary: {
      light: yellow[500],
      main: yellow[400],
      dark: yellow[300],
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
      disabled: "#fff",
      secondary: "#fff",
    },
    background: {
      default: "rgb(44, 44, 44)",
    },
  },
});
