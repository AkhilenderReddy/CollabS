import axios from "axios";
import React, { useEffect, useState } from "react";

const Conversation = ({online, currentUser, chat }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userId = chat.members.find((id) => id !== currentUser?.id);

    const getUserData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`
      );
      setUserData(response?.data);
    };
    getUserData();
  }, [currentUser?.id, userData, chat]);

  return (
    <section
      className="w-full max-w-full h-20 flex gap-3 p-1 rounded-full cursor-pointer"
      style={{ backgroundColor: "#7596fa44" }}
    >
      <div
        className="w-full rounded-full grid place-items-center relative overflow-hidden"
        style={{ maxWidth: "4.5rem" }}
      >
        {userData?.user?.profilePicture ? (
          <img className="size-full rounded-full " src={userData?.user?.profilePicture} alt="" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#4C6EEE"
            className="size-16"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {online && <div className="size-3 rounded-full absolute top-0 left-2" style={{background: '#67fb1c'}}></div>}
      </div>
      <div className="flex flex-col items-start w-full">
        <p>{userData?.user?.username}</p>
        <small className="">{online ? "Online" : "Offline"}</small>
        <small className={userData?.role === 'Client' ? 'role-client' : 'role-influencer'}>{userData?.role}</small>
      </div>
    </section>
  );
};

export default Conversation;
