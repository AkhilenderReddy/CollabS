import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import default_profile from "../Assets/profile.svg";
import brand from "../Assets/brand.jpg";
import Loader from "../Components/Loader";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/clients`
        );
        setClients(response?.data);
        setIsLoading(false);
        console.log(response?.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <div style={{height:'100vh',maxHeight: '100vh',}} className="w-full max-w-full grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="clients-section mt-16 w-full max-w-full flex flex-wrap items-center justify-center gap-3 p-3">
      {clients &&
        clients.map((client, index) => (
          <Link
            to={`/clients/${client._id}`}
            key={index}
            className="w-full max-w-72 rounded-3xl"
            style={{height: '355px'}}
          >
            <div className="client-card group w-full h-full max-h-96 rounded-3xl hover:shadow-none transition-all duration-300 cursor-pointer flex flex-col overflow-hidden">
              <div className="up w-full h-2/5 ">
                <img
                  className="size-full"
                  src={client?.backgroundImage || brand}
                  alt=""
                />
              </div>
              <div className="down w-full h-3/5 relative flex flex-col gap-3 pt-10 px-2">
                <img
                  className="client-profile-pic size-20 rounded-full absolute transition-transform ease-in-out duration-300 transform group-hover:scale-125"
                  src={client?.profilePicture || default_profile}
                  alt=""
                  style={{border: '10px solid #eaeff6'}}
                />
                <p>{client?.username}</p>
                <p className="font-medium">{client?.name || 'N/A'}</p>
                <p>Email : {client?.email}</p>
                <p>Brand/Product : {client?.businessName.toUpperCase() || 'N/A'}</p>
              </div>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default Clients;
