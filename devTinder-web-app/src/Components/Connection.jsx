import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { listConnection } from "../slice/connectionSlice";
import axios from "axios";

function Connection() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(listConnection(res.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnection();
  }, []);
  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      {connections?.data?.map((connection) => {
        const { firstName, lastName, photoUrl } = connection;
        return (
          <div className="flex flex-row my-4 gap-5 border rounded-lg">
            <img className="rounded-full" alt="photo" src={photoUrl} />
            <h2>{firstName + " " + lastName}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default Connection;
