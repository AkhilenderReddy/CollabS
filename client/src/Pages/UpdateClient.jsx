import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import uploadImageToCloudinary from "../CloudServices/cloudinaryServices";
import brand from "../Assets/brand.jpg";
import defaultProfilePicture from "../Assets/profile.svg";
import { UserContext } from "../Context/UserContext";
import Loader from "../Components/Loader";
import ToastMsg from "../Components/ToastMsg";

const UpdateClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const clientId = id;
  const [client, setClient] = useState({
    name: "",
    email: "",
    username: "",
    mobileNumber: "",
    businessName: "",
    profilePicture: defaultProfilePicture,
    backgroundImage: brand,
  });
  const [isLoading,setIsLoading] = useState(false);
  const [msg,setMsg] = useState('');

  useEffect(()=>{
    if(currentUser?.id !== clientId){
      navigate('/')
    }
  },[currentUser,clientId])

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/clients/${clientId}`
        );
        setClient(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
      }
    };
    getClient();
  }, [clientId]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setMsg('')
        setIsLoading(true);
        const imageUrl = await uploadImageToCloudinary(file);
        setClient({ ...client, [e.target.name]: imageUrl });
        setIsLoading(false)
        setMsg('Image updated. Save the changes')
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMsg('')
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/clients/${clientId}`,
        client,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );
      setMsg("Profile updated successfully.")
    } catch (error) {
      console.error("Error updating profile:", error);
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
      className="client-profile-section mt-16 py-3 w-full max-w-full bg-black"
      style={{ color: "#efefef" }}
    >
      <div style={{ minHeight: "70vh" }} className="w-full max-w-full">
        <form onSubmit={handleSubmit}>
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
                src={client?.profilePicture || defaultProfilePicture}
                alt=""
              />
            </div>
          </div>
          <div
            style={{ minHeight: "fit-content" }}
            className="client-update-details w-full max-w-full flex flex-col gap-3 mt-5 px-5"
          >
            <div className="flex flex-col items-center mb-6">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium px-5 py-2 rounded-3xl bg-slate-50 cursor-pointer"
              >
                Change Profile Picture
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col items-center mb-6">
              <label
                htmlFor="backgroundImage"
                className="block text-sm font-medium px-5 py-2 rounded-3xl bg-slate-50 cursor-pointer"
              >
                {" "}
                Change Background Image
                <input
                  type="file"
                  id="backgroundImage"
                  name="backgroundImage"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={client.username}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={client.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Product/Brand Name
              </label>
              <input
                type="text"
                name="businessName"
                value={client.businessName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mail at</label>
              <input
                type="email"
                name="email"
                value={client.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Contact Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={client.mobileNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full max-w-full min-h-fit flex justify-end px-5">
            {msg && <ToastMsg message={msg}/>}
            <button
              type="submit"
              className="px-7 py-2 rounded-3xl bg-slate-50 text-black"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateClient;
