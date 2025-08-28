import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
import { Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginData = useSelector((store) => store.user);
  console.log("loginData", loginData);

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
    if (loginData && loginData.email) {
      return navigate("/");
    }
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
      setError(err?.response?.data);
    }
  };

  return (
    <>
      {!loginData && (
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
              <div className="relative">
                <label>Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter a valid password"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={handleChange}
                />
                <span
                  className=" absolute cursor-pointer right-8  top-2/4"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </span>
              </div>
              <p className="text-red-600">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
