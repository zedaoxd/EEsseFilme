import { ThemeProvider } from "@mui/material";
import Modal from "react-modal";
import { AuthContextProvider } from "./contexts/AuthContext";
import ReactQueryContext from "./contexts/reactQueryContext";
import AppRoutes from "./routes/AppRoutes";
import { darkTheme } from "./themes/darkTheme";

Modal.setAppElement("#root");

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
