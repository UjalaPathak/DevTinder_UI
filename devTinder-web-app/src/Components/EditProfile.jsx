import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  const { firstName, lastName, age, gender, photoUrl, description } = userData;
  const [form, setForm] = useState({
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    photoUrl: photoUrl,
    description: description,
  });

  const [error, setError] = useState("");

  return (
    <div className="flex justify-center  mt-10  mx-10 overflow-auto">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center"> Edit Profile</h2>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your firstname"
            className="input input-bordered w-full max-w-xs"
            value={form.firstName}
            // onChange={handleChange}
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your lastName"
            className="input input-bordered w-full max-w-xs"
            value={form.lastName}
            // onChange={handleChange}
          />

          <label>Photo URL:</label>
          <input
            type="text"
            name="photoUrl"
            placeholder="Enter a photo url"
            className="input input-bordered w-full max-w-xs"
            value={form.photoUrl}
            // onChange={handleChange}
          />

          <label>Age:</label>
          <input
            type="text"
            name="age"
            placeholder="Enter your age"
            className="input input-bordered w-full max-w-xs"
            value={form.age}
            // onChange={handleChange}
          />

          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            placeholder="Enter a gender"
            className="input input-bordered w-full max-w-xs"
            value={form.gender}
            // onChange={handleChange}
          />
          <label>About:</label>
          <input
            type="text"
            name="desciption"
            placeholder="Enter a gender"
            className="input input-bordered w-full max-w-xs"
            value={form.gender}
            // onChange={handleChange}
          />
        </div>
        <p className="text-red-600">{error}</p>
        <div className="card-actions justify-center m-2">
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
