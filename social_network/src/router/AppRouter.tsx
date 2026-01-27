import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Posts from "../pages/login/Posts";
import { useAuth } from "../auth/useAuth";
import Navbar from "../components/Navbar";
import Register from "../pages/register/Register";

export default function AppRouter() {
  const { token } = useAuth();

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    </BrowserRouter>
  );
}
