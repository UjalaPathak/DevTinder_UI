import { Car } from "lucide-react";
import React from "react";

const Card = ({ user, index }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    description,
    age = 18,
    gender,
    email,
    skills = ["Communication"],
  } = user;
  console.log(user, index);
  return (
    <div className="h-[432px] w-80 border rounded-xl shadow-md p-4">
      <div className="flex justify-between">
        <button>❌</button>
        <button>💚</button>
      </div>
      <figure className="flex justify-center">
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
              className={`w-6 h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
