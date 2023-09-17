import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const CustomContext = createContext();

export const Context = (props) => {
  const [count, setCount] = useState(1);
  const [user, setUser] = useState({
    login: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const registerUser = (data) => {
    const role = data.email === "adminsportshop@gmail.com" ? "admin" : "user";
    axios
      .post("http://localhost:3002/register", { ...data, orders: [], role })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginUser = (data) => {
    axios
      .post("http://localhost:3002/login", data)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify({ ...data.user }));
        setUser({ ...data.user });
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(true);
        } else {
          console.error(error);
        }
      });
  };

  const logOutUser = () => {
    localStorage.removeItem("user");
    setUser({
      login: "",
    });
  };

  const value = {
    count,
    setCount,
    user,
    setUser,
    registerUser,
    logOutUser,
    loginUser,
    error,
    setError,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
