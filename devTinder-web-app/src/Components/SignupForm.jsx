import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldInput from "./utils/FieldInput";
import { Lock, Mail, User } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formError, setFormErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 💥 prevents full reload
    setIsSubmitting(true);
    setSuccessMessage(false);
    const { firstName, lastName, email, password } = formData;
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setIsSubmitting(false);
      setFormErrors(err.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex justify-center  mt-10  mx-10">
        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Create Your Account</h2>
            <h4 className="text-center mb-3">
              Sign up to get started. All fields are required.
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <FieldInput
                  name="firstName"
                  label="First Name :"
                  placeholder="Enter your firstname"
                  value={formData.firstName}
                  icon={User}
                  onChange={handleChange}
                />
                <FieldInput
                  name="lastName"
                  label="Last Name :"
                  placeholder="Enter your lastname"
                  icon={User}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <FieldInput
                name="email"
                label="Email ID :"
                placeholder="Enter your Email"
                type="email"
                value={formData.email}
                icon={Mail}
                onChange={handleChange}
              />
              <FieldInput
                name="password"
                label="Password:"
                placeholder="Enter your Password"
                type="passoword"
                value={formData.passoword}
                icon={Lock}
                onChange={handleChange}
              />

              <p className="text-red-600 p-4">{formError}</p>

              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account...." : "Create Account"}
                </button>
              </div>
            </form>

            <p className="text-center ">
              Already have an account ?{" "}
              <a onClick={() => navigate("/login")}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
