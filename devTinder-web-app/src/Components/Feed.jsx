import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import UserCards from "./UserCards";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../slice/feedSlice";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  console.log("feedData", feedData);

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeedData(res?.data[0]));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center my-10">
      <UserCards />
    </div>
  );
};

export default Feed;
