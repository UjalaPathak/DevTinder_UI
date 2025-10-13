import React from "react";
import { useSelector } from "react-redux";

const UserCards = ({ user }) => {
  console.log("are we here");
  console.log("user", user);
  //const user = useSelector((store) => store.user);
  const { firstName, lastName, photoUrl, description, age, gender } = user;

  return (
    user && (
      <div className="card bg-base-100 w-96 shadow-sm ">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <h3>{age + "," + gender}</h3>}
          <p>{description}</p>
          <div className="card-actions justify-start">
            <button className="btn btn-secondary mx-10">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCards;
