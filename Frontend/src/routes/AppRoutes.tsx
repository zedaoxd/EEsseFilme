import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Auth from "../pages/Auth";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Forbidden from "../pages/Forbidden";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import MovieRepository from "../pages/MovieRepository";
import Profile from "../pages/Profile";
import MyData from "../pages/Profile/MyData";
import MyMovies from "../pages/Profile/MyMovies";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<MovieRepository />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route element={<Auth />}>
          <Route path="/auth" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoutes role={"ROLE_MEMBER"} />}>
          <Route path="/profile" element={<Profile />}>
            <Route
              path="/profile"
              element={<Navigate to="/profile/movies" />}
            />
            <Route path="/profile/movies" element={<MyMovies />} />
            <Route path="/profile/settings" element={<MyData />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Forbidden />} />
        <Route path="*" element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
