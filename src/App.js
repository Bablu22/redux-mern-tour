import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import Header from "./components/Header";
import AddTour from "./pages/AddTour";
import Dashboard from "./pages/Dashboard";
import SingleTour from "./pages/SingleTour";
import PrivateRoute from "./PrivateRoute";


function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addtour" element={<>
          <AddTour />
        </>} />
        <Route path="/dashboard" element={<>
          <Dashboard />
        </>} />
        <Route path="/tour/:id" element={<SingleTour />} />
      </Routes>
    </div>
  );
}

export default App;
