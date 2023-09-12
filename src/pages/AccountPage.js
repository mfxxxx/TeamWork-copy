import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const AccountPage = () => {
  const location = useLocation();

  return <>{location.pathname === "/login" ? <Login /> : <Register />}</>;
};

export default AccountPage;
