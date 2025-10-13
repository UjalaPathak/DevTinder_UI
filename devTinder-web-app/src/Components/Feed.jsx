import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import UserCards from "./UserCards";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../slice/feedSlice";
import Card from "./UI/Card";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  console.log("feeddata", feedData);
  const dispatch = useDispatch();

  console.log("feedData", feedData);

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("res", res);
      dispatch(addFeedData(res));
    } catch (err) {
      console.log(err);
      //TODO: handle error
    }
  };

  useEffect(() => {
    console.log("insideuseeffcet");
    getFeed();
  }, [feedData]);

  return (
    <div className="flex justify-center my-10 gap-3">
      {feedData?.data.map((value, index) => (
        // <Card key={value._id} user={value} index={index} />
        console.log("value")
      ))}
    </div>
  );
};

export default Feed;
