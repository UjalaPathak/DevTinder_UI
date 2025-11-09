import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../slice/feedSlice";
import Card from "./UI/Card";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  console.log("feeddata", feedData);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeedData(res.data));
    } catch (err) {
      console.log(err);
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, [feedData]);

  // it stacks the card one after the other
  return (
    <div className="relative flex justify-center items-center h-[500px]">
      {feedData?.map((user, index) => (
        <div
          key={user._id}
          className="absolute transition-transform duration-300"
          style={{
            transform: `translateY(${index * 5}px) scale(${1 - index * 0.02})`,
            zIndex: feedData.length - index,
          }}
        >
          <Card user={user} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
