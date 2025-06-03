import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
export const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center  mt-10  mx-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label>Email ID:</label>
          <input
            type="text"
            name="email"
            placeholder="abc@gmail.com"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={handleChange}
          />
          <label>Password:</label>
          <input
            type="text"
            name="password"
            placeholder="Enter a valid password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={handleChange}
          />
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
