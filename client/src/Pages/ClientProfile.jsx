import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import brand from "../Assets/brand.jpg";
import defaultProfilePicture from "../Assets/profile.svg";
import { UserContext } from "../Context/UserContext";
import messageIcon from "../Assets/message.svg";
import Loader from "../Components/Loader";

const ClientProfile = () => {
  const { id } = useParams();
  const clientId = id;
  const [client, setClient] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/clients/${clientId}`
        );
        setClient(response?.data);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false);
      }
    };
    getClient();
  }, [clientId]);

  const createChat = async () => {

    if(!currentUser){
      setIsLoading(true);
      navigate('/login');
      setIsLoading(false);
    }

    try {
      setIsLoading(true);
      const senderId = currentUser?.id;
      const receiverId = id;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/chat/find/${senderId}/${receiverId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );
      if(!response?.data){
        const create = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/chat`,
          { senderId, receiverId },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser?.token}` },
          }
        );
      }
      navigate('/chat');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{height:'100vh',maxHeight: '100vh',}} className="w-full max-w-full grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section
      className="client-profile-section mt-16 pt-3 w-full max-w-full"
      style={{ color: "#efefef", background: "#05061f" }}
    >
      <div style={{ minHeight: "70vh" }} className=" w-full max-w-full">
        <div
          style={{ height: "320px", border: "1px solid #eeddf1" }}
          className="client-bg-img w-full max-w-fit bg-slate-300 relative mx-auto"
        >
          <img
            className="w-full h-full"
            src={client?.backgroundImage || brand}
            alt=""
          />
          <div
            style={{ background: "#f2f2fd" }}
            className="size-20 absolute bottom-0 rounded-full"
          >
            <img
              className="img-profile w-full h-full rounded-full"
              src={client.profilePicture || defaultProfilePicture}
              alt=""
            />
          </div>
        </div>
        <div
          style={{ minHeight: "fit-content" }}
          className="client-details w-full max-w-full flex flex-col gap-3 mt-5 px-5"
        >
          <div className="w-full max-w-full min-h-fit justify-start" style={currentUser?.id === clientId ? {display: 'none'} : {display: 'flex'}}>
            <button>
              <img
                className="size-7"
                src={messageIcon}
                alt="message"
                onClick={createChat}
              />
            </button>
          </div>
          <div
            className="w-full max-w-full min-h-fit justify-end px-5"
            style={
              currentUser?.id === clientId
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <Link
              to={`/clients/${clientId}/edit`}
              className="px-7 py-2 rounded-3xl bg-slate-50 text-black"
            >
              Edit
            </Link>
          </div>
          <p style={{ color: "#df84ec" }}>{client?.username}</p>
          <p style={{ color: "#df84ec" }}>{client?.name}</p>
          <div className="flex gap-3">
            <p>Product/Brand Name :</p>{" "}
            <p style={{ color: "#df84ec" }}>{client?.businessName?.toUpperCase() || "N/A"}</p>
          </div>
          <div className="flex gap-3">
            <p>Mail at :</p> <p style={{ color: "#df84ec" }}>{client?.email}</p>
          </div>
          <div className="flex gap-3">
            <p>Contact Number :</p>{" "}
            <p style={{ color: "#df84ec" }}>{client?.mobileNumber || "N/A"}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientProfile;
