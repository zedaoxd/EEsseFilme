import { ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "./contexts/AuthContext";
import ReactQueryContext from "./contexts/reactQueryContext";
import AppRoutes from "./routes/AppRoutes";
import { darkTheme } from "./themes/darkTheme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ReactQueryContext>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </ReactQueryContext>
    </ThemeProvider>
  );
};

export default App;
