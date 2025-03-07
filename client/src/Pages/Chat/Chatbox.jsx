import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import EmojiInput from "react-input-emoji";

const Chatbox = ({
  chat,
  currentUser,
  setSendMessage,
  recieveMessage,
  authToken,
  checkOnlineStatus,
}) => {
  const [userData, setUserData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Reference for scrolling
  const scrollRef = useRef(null);

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat?._id) {
      setMessages((prevMessages) => [...prevMessages, recieveMessage]);
    }
  }, [recieveMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}`
        );
        setUserData(response?.data?.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat) getUserData();
  }, [currentUser, chat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/message/${chat?._id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setMessages(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat) getMessages();
  }, [chat, authToken]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleChangeInput = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage.trim(),
      chatId: chat._id,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/message`,
        message,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = response?.data;
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    // send msg to socket server
    const recieverId = chat?.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, recieverId });
  };

  return (
    <section className="chatbox-section w-full max-w-full h-full p-2 flex flex-col">
      <section
        className="w-full max-w-full h-20 flex gap-3 p-1 rounded-full cursor-pointer"
        style={{ backgroundColor: "#7596fa44" }}
      >
        <div
          className="w-full rounded-full grid place-items-center relative overflow-hidden"
          style={{ maxWidth: "4.5rem" }}
        >
          {userData?.profilePicture ? (
            <img className="size-full rounded-full" src={userData?.profilePicture} alt="" />
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
          {checkOnlineStatus(chat) && (
            <div
              className="size-3 rounded-full absolute top-0 left-2"
              style={{ background: "#67fb1c" }}
            ></div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center text-left">
          <p>{userData?.username}</p>
        </div>
      </section>
      {/* chat body */}
      <div className="chat-body w-full max-w-full flex flex-col gap-3 p-3 overflow-y-auto">
        {messages &&
          messages?.map((message, index) => (
            <div
              key={index}
              className={`${
                message?.senderId === currentUser
                  ? "flex justify-end "
                  : "flex justify-start"
              }`}
            >
              <div
                className={`${
                  message?.senderId === currentUser
                    ? "message own"
                    : "message other"
                }`}
              >
                <span>{message?.text}</span>
                <small>{moment(message?.createdAt).fromNow()}</small>
              </div>
            </div>
          ))}
        {/* Empty div for auto scroll */}
        <div ref={scrollRef}></div>
      </div>
      {/* message sender */}
      <div className="msg-sender flex gap-2 items-center">
        <div className="flex items-center justify-center rounded-lg bg-slate-300 w-full max-w-10 h-full max-h-10 cursor-pointer">
          +
        </div>
        <EmojiInput value={newMessage} onChange={handleChangeInput} />
        <div className="send-btn cursor-pointer" onClick={handleSend}>
          <svg
            style={{ transform: "rotate(-45deg)" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            fill="#df84ec"
            className="size-6"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Chatbox;
