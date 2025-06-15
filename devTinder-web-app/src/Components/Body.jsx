import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slice/userSlice";

export const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.user);

  const fetchUser = async () => {
    if (UserData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err.messaage);
    }
  };
  useEffect(() => {
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
