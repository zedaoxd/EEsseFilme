import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="*" element={<div>'404'</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
