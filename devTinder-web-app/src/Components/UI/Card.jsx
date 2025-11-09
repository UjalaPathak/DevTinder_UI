import axios from "axios";
import { Car } from "lucide-react";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../../constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../slice/feedSlice";

const skillColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-yellow-500",
];

const Card = ({ user, level }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    description = "this is default description",
    age = 18,
    gender,
    email,
    skills = ["Communication"],
  } = user;

  const [index, setIndex] = useState(0);

  //how far (in pixels) the top card has been dragged horizontally
  const [translateX, setTranslateX] = useState(0);
  //isDragging is a boolean indicating whether the user is currently dragging the top card.
  //Used to disable CSS transitions during the drag (so movement is immediate).
  const [isDragging, setIsDragging] = useState(false);
  //X coordinate where the drag started (mouse or touch).
  const startX = useRef(0);

  const dispatch = useDispatch();

  const handleStart = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    setTranslateX(currentX - startX.current);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (translateX > 100) {
      console.log("💚 Interested");
      setIndex((prev) => prev + 1);
    } else if (translateX < -100) {
      console.log("❌ Rejected");
      setIndex((prev) => prev + 1);
    }
    setTranslateX(0);
  };

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div
      className=" h-[440px] w-80 bg-base-200 rounded-xl shadow-lg p-4 flex flex-col justify-between"
      style={{
        transform: `translateX(${translateX}px) rotate(${translateX / 20}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease",
      }}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="flex justify-between items-center mb-3">
        <button onClick={() => handleSendRequest("ignore", _id)}>❌</button>
        <button onClick={() => handleSendRequest("interested", _id)}>💚</button>
      </div>
      <figure className="flex justify-center mb-3">
        <img
          className=" w-[150px] border-2 rounded-full "
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div>
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{description}</p>
        <div className="flex items-center justify-center gap-3 text-xs text-blue-200 mb-2">
          <span>📍 {"Delhi"}</span>
          <span>🎂 {age}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3 text-blue-200">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
        </svg>
        <span className="text-xs">{email}</span>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white mb-2">Skills</h3>
        <div className="flex flex-wrap gap-1 justify-center">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={skill}
                className={`badge ${
                  skillColors[index % skillColors.length]
                } badge-xs text-white font-medium cursor-pointer transform transition-all duration-300 hover:scale-110`}
              >
                {skill}
              </div>
            ))
          ) : (
            <span className="text-gray-400  text-sm italic">
              No skills added
            </span>
          )}

          <div className="flex gap-1 mb-3">
            <div
              key={index}
              //   className={`w-6 h-1 rounded-full transition-all duration-300 ${
              //     index === currentIndex ? "bg-white" : "bg-white/30"
              //   }`
              // }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
