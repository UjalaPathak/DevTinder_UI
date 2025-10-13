import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../slice/requestSlice";

function Request() {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  console.log("request", request);

  const fetchRequest = async () => {
    console.log("api call");
    try {
      const data = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(data.data));
    } catch (arr) {}
  };

  useEffect(() => {
    console.log("render");
    fetchRequest();
  }, []);

  const reviewRequest=  async ()=>{
     
  }

  if (!request) return;
  // if (request.length === 0) return <h1>No request found</h1>;

  return (
    <div className=" text-center my-10 items-center">
      <h1 className="text-bold text-2xl">Connections Request</h1>
      {request?.data?.map((connection) => {
        console.log("connection", connection);
        const { firstName, lastName, photoUrl, description } =
          connection.fromUserId;
        return (
          <div className="flex flex-row my-4 gap-5 border rounded-lg">
            <img
              className="rounded-full w-16 h-16 object-cover"
              alt="photo"
              src={photoUrl}
            />
            <div className="flex flex-col justify-center">
              <h2 className="font-semibold text-lg">
                {firstName + " " + lastName}
              </h2>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
            <div>
              <button className="btn mx-2 btn-active btn-primary">
                Reject
              </button>
              <button className="btn mx-2 btn-active btn-secondary">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Request;
