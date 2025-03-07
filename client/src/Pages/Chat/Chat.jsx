import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";
import Chatbox from "./Chatbox";
import { io } from "socket.io-client";
import Loader from "../../Components/Loader";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setrecieveMessage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  const socket = useRef();

  // send msg to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("https://fullstack-marketing-hub-1.onrender.com");
    socket.current.emit("new-user-add", currentUser?.id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [currentUser]);

  // recieve msg from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log("data recieved in parent chat.jsx", data);
      setrecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/chat/${currentUser?.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser?.token}` },
          }
        );
        setChats(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getChats();
  }, [currentUser?.id]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members.find((id) => id !== currentUser?.id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  useEffect(() => {
    if (!currentUser || !token) {
      setIsLoading(true);
      navigate("/login");
      setIsLoading(false);
    }
  }, [currentUser,token]);

  if (isLoading) {
    return (
      <div style={{height:'100vh',maxHeight: '100vh',}} className="w-full max-w-full grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="chat-section mt-16 w-screen max-w-full p-3 flex gap-3 h-screen">
      <div className="chat-left w-full max-w-xs bg-white rounded-3xl h-full p-1 flex flex-col gap-5">
        <h2 className="text-center mt-5 text-xl">Chats</h2>
        <div className="chats-list flex flex-col gap-2 overflow-y-auto">
          {chats.length > 0 ? (
            chats.map((chat, index) => {
              return (
                <div key={index} onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    onClick={() => setCurrentChat(chat)}
                    currentUser={currentUser}
                    chat={chat}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              );
            })
          ) : (
            <h2 className="text-center text-slate-300 text-xl">
              No conversations yet.
            </h2>
          )}
        </div>
      </div>
      <div className="chat-right w-full bg-white rounded-3xl p-1">
        {currentChat ? (
          <Chatbox
            key={currentChat._id}
            chat={currentChat}
            currentUser={currentUser?.id}
            authToken={currentUser?.token}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
            checkOnlineStatus={checkOnlineStatus}
          />
        ) : (
          <h2 className="text-center text-xl mt-8 text-slate-300">
            Tap on chat to open the conversation.
          </h2>
        )}
      </div>
    </section>
  );
};

export default Chat;
