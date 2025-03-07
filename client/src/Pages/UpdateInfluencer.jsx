import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import uploadImageToCloudinary from "../CloudServices/cloudinaryServices";
import brand from "../Assets/brand.jpg";
import defaultProfilePicture from "../Assets/profile.svg";
import { UserContext } from "../Context/UserContext";
import Loader from "../Components/Loader";
import ToastMsg from "../Components/ToastMsg";
import Select from "react-select";
import { categories } from "../Components/Categories";

const UpdateInfluencer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const influencerId = id;
  const [influencer, setInfluencer] = useState({
    name: "",
    email: "",
    username: "",
    mobileNumber: "",
    bio: "",
    socialMediaLinks: {
      youtube: "",
      twitter: "",
      instagram: "",
    },
    profilePicture: defaultProfilePicture,
    backgroundImage: brand,
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [categoriesOptions, ] = useState(categories.map(category => ({ value: category, label: category })));

  useEffect(() => {
    if (currentUser?.id !== influencerId) {
      navigate("/");
    }
  }, [currentUser, influencerId, navigate]);

  useEffect(() => {
    const getInfluencer = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/influencers/${influencerId}/edit`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser?.token}` },
          }
        );
        setInfluencer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getInfluencer();
  }, [influencerId, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in influencer.socialMediaLinks) {
      setInfluencer({
        ...influencer,
        socialMediaLinks: {
          ...influencer.socialMediaLinks,
          [name]: value,
        },
      });
    } else {
      setInfluencer({ ...influencer, [name]: value });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setMsg("");
        setIsLoading(true);
        const imageUrl = await uploadImageToCloudinary(file);
        setInfluencer({ ...influencer, [e.target.name]: imageUrl });
        setIsLoading(false);
        setMsg("Image updated. Save the changes");
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsLoading(false);
      }
    }
  };

  const handleCategoriesChange = (selectedOptions) => {
    setInfluencer({ ...influencer, categories: selectedOptions.map(option => option.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMsg("");
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/influencers/${influencerId}/edit`,
        influencer,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );
      setMsg("Profile updated successfully.");
      // Re-fetch the influencer's data to reflect the changes
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/influencers/${influencerId}/edit`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );
      setInfluencer(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{ height: "100vh", maxHeight: "100vh" }}
        className="w-full max-w-full grid place-items-center"
      >
        <Loader />
      </div>
    );
  }

  return (
    <section
      className="mt-16 p-5 rounded-3xl rounded-es-none rounded-ee-none"
      style={{
        color: "#05061f",
        background: "linear-gradient(245deg,#4C6EEE22,#ea00ff22)",
      }}
    >
      <div className="w-full max-w-full flex flex-col gap-3">
        <div className="flex items-center justify-center">
          <img
            className="size-28 bg-white rounded-full"
            src={influencer.profilePicture || defaultProfilePicture}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium px-5 py-2 rounded-3xl bg-slate-50 text-black cursor-pointer"
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
            className="block text-sm font-medium px-5 py-2 rounded-3xl bg-slate-50 text-black cursor-pointer"
          >
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="w-full flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={influencer.username}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={influencer.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={influencer.bio}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mail at</label>
              <input
                type="email"
                name="email"
                value={influencer.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contact Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={influencer.mobileNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">YouTube</label>
              <input
                type="text"
                name="youtube"
                value={influencer.socialMediaLinks.youtube}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={influencer.socialMediaLinks.twitter}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={influencer.socialMediaLinks.instagram}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Categories</label>
              <Select
                isMulti
                name="categories"
                options={categoriesOptions}
                value={categoriesOptions.filter(option => influencer.categories.includes(option.value))}
                onChange={handleCategoriesChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
          </div>
          <div className="w-full max-w-full min-h-fit flex justify-end px-5">
            {msg && <ToastMsg message={msg} />}
            <button
              type="submit"
              className="w-fit px-7 py-2 rounded-3xl bg-slate-50 text-black"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateInfluencer;