import { ThemeProvider } from "@mui/material";
import ReactQueryContext from "./contexts/reactQueryContext";
import AppRoutes from "./routes/AppRoutes";
import { darkTheme } from "./themes/darkTheme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ReactQueryContext>
        <AppRoutes />
      </ReactQueryContext>
    </ThemeProvider>
  );
};

export default App;
