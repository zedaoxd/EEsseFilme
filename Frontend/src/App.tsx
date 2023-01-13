import ReactQueryContext from "./contexts/reactQueryContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ReactQueryContext>
      <AppRoutes />
    </ReactQueryContext>
  );
};

export default App;
