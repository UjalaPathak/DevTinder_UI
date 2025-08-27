import React from "react";
import EditProfile from "./EditProfile";
import UserCards from "./UserCards";
import { useSelector } from "react-redux";

export const Profile = () => {
  const userData = useSelector((store) => store.user);
  return (
    userData && (
      <>
        {
          <div className="flex flex-row items-center justify-center">
            <EditProfile user={userData} />
          </div>
        }
      </>
    )
  );
};
