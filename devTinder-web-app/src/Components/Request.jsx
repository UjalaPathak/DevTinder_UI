import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../slice/requestSlice";

function Request() {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const fetchRequest = async () => {
    try {
      const data = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const reviewRequest = async (status, _id) => {
    console.log("_id", _id);
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );

      //not working need to work on

      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  if (!request) return;
  // if (request.length === 0) return <h1>No request found</h1>;

  return (
    <div className=" text-center my-10 items-center">
      <h1 className="text-bold text-2xl">Connections Request</h1>
      {request?.data?.map((connection) => {
        console.log("connection", connection.fromUserId._id);
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
              <button
                className="btn mx-2 btn-active btn-primary"
                onClick={() => reviewRequest("rejected", connection._id)}
              >
                Reject
              </button>
              <button
                className="btn mx-2 btn-active btn-secondary"
                onClick={() => reviewRequest("accepted", connection._id)}
              >
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
