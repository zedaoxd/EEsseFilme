import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import MovieRepository from "../pages/MovieRepository";
import Profile from "../pages/Profile";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<MovieRepository />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/profile" element={<PrivateRoutes />}>
          <Route path="" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
