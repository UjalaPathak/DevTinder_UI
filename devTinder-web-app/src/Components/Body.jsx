import React, { useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slice/userSlice";

export const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  console.log("UserData", userData);

  const fetchUser = async () => {
    if (userData) {
      console.log("insideif");
      return;
    }
    try {
      console.log("inside try");
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("res", res);
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err.messaage);
    }
  };
  useEffect(() => {
    console.log("inside useEffect");
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
