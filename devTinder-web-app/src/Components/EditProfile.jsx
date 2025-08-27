import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCards from "./UserCards";
import { BASE_URL } from "../constant";
import { updateProfile } from "../slice/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, description } = user;
  const [form, setForm] = useState({
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    photoUrl: photoUrl,
    description: description,
  });
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [showToast, setToast] = useState(false);

  const isFieldChange = (
    form,
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    description
  ) => {
    let changed =
      form.firstName !== firstName ||
      form.lastName !== lastName ||
      form.age !== age ||
      form.gender !== gender ||
      form.photoUrl !== photoUrl ||
      form.description !== description;
    return changed;
  };

  const isApplyDisable = !isFieldChange(
    form,
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    description
  );

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prevProp) => ({
      ...prevProp,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const previousData = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      age: user.age,
      photoUrl: user.photoUrl,
      description: user.description,
    };

    const changeField = {};

    //forEach only works with array so object.keys(form) ({}->[])
    //this to filter out and send only updated fields
    Object.keys(form).forEach((element) => {
      if (form[element] != previousData[element]) {
        changeField[element] = form[element];
      }
    });

    try {
      const value = await axios.patch(BASE_URL + "/profile/edit", changeField, {
        withCredentials: true,
      });
      dispatch(updateProfile(value.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center  mt-10  mx-10 ">
      <div className="card bg-base-200 w-96 h-[500px] shadow-sm">
        <h2 className="card-title justify-center mt-10"> Edit Profile</h2>
        <div className="card-body  overflow-auto">
          <label>First Name:</label>
          <input
            type="text"
            required
            name="firstName"
            placeholder="Enter your firstname"
            className="input input-bordered w-full max-w-xs flex-shrink-0"
            value={form.firstName}
            onChange={handleChange}
          />

          <label>Last Name:</label>
          <input
            type="text"
            required
            name="lastName"
            placeholder="Enter your lastName"
            className="input input-bordered w-full max-w-xs flex-shrink-0"
            value={form.lastName}
            onChange={handleChange}
          />

          <label>Photo URL:</label>
          <input
            type="text"
            name="photoUrl"
            placeholder="Enter a photo url"
            className="input input-bordered w-full max-w-xs flex-shrink-0"
            value={form.photoUrl}
            onChange={handleChange}
          />

          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            className="input input-bordered w-full max-w-xs flex-shrink-0"
            value={form.age}
            onChange={handleChange}
          />

          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            placeholder="Enter a gender"
            className="input input-bordered w-full max-w-xs flex-shrink-0"
            value={form.gender}
            onChange={handleChange}
          />
          <label>About:</label>
          <input
            type="text"
            name="description"
            placeholder="Enter about yourself"
            className="input input-bordered w-full max-w-xs flex-shrink-0"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <p className="text-red-600  mx-20 ">{error}</p>
        <div className="card-actions justify-center m-2">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isApplyDisable}
          >
            Submit
          </button>
        </div>
      </div>

      <UserCards
        user={{
          firstName: form.firstName,
          lastName: form.lastName,
          photoUrl: form.photoUrl,
          age: form.age,
          gender: form.gender,
          description: form.description,
        }}
      />
      {showToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success">
            <span>Profile Update Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
