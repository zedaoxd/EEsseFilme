import { ThemeProvider } from "@mui/material";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <ToastContainer />
        </AuthContextProvider>
      </ReactQueryContext>
    </ThemeProvider>
  );
};

export default App;
