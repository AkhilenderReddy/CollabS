import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import default_profile from "../Assets/profile.svg";
import FaSearch from "../Assets/search.svg";
import InfluencerPromotionCard from "../Components/InfluencerPromotionCard";
import Loader from "../Components/Loader";
import ErrComponent from "../Components/ErrComponent";

const InfluencerDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const [formData, setFormData] = useState({
    promotionName: "",
    clientId: "",
    twitter: { url: "", postType: "post" },
    instagram: { url: "", postType: "post" },
    youtube: { url: "", postType: "video" },
  });
  const [clients, setClients] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [promotionId, setPromotionId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [err, setErr] = useState("");

  const handleFocus = () => {
    setIsSearchActive(true);
  };

  const handleBlur = () => {
    setIsSearchActive(false);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/clients`
        );
        setClients(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const getPromotions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/promotions`
        );
        setPromotions(response?.data);
        // console.log(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getPromotions();
  }, [isUpdated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating field: ${name} with value: ${value}`);
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!isUpdating) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/promotions`,
          { ...formData },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Promotion created:", response?.data);
        setIsFormOpen(false);
        toggleForm();
        setIsUpdated(!isUpdated);
      } catch (error) {
        console.error("Error creating promotion:", error);
        setErr(error?.response?.data?.message);
        console.log(formData);
      }
    } else {
      try {
        console.log(promotionId);
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/promotions/${promotionId}`,
          { ...formData },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsUpdated(!isUpdated);
        setIsUpdating(false);
        console.log("Promotion updated:", response.data);
        setIsFormOpen(false);
        toggleForm();
      } catch (error) {
        console.error("Error updating promotion:", error);
        setErr(error?.response?.data?.message);
        console.log(formData);
      }
    }
  };

  const filteredClients = clients?.filter(
    (client) =>
      client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.businessName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPromotions = promotions?.filter(
    (p) => p.influencerId?._id === currentUser?.id
  );

  const lightColors = [
    "#eac7f6",
    "#f0cd86",
    "#e77f94",
    "#9bebb0",
    "#84eff4",
    "#ffb69a",
    "#fcf372",
    "#bcc4ab",
  ];

  const toggleForm = () => {
    const form = document.getElementById("form");
    if (form.classList.contains("form-open-animation")) {
      form.classList.remove("form-open-animation");
      form.classList.add("form-close-animation");
    } else {
      if (form.classList.contains("form-close-animation")) {
        form.classList.remove("form-close-animation");
      }
      form.classList.add("form-open-animation");
    }
  };

  if (isLoading || !filteredPromotions) {
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
      className={`dashboard mt-16 w-full max-w-full px-3 relative rounded-3xl`}
      style={{ minHeight: "500px", background: "#f2f2fd" }}
    >
      <div className="w-full h-full pt-5">
        <div
          className={`size-14 grid place-items-center text-4xl rounded-full cursor-pointer ml-5 mb-3 fixed z-10 text-slate-50 ${
            isFormOpen ? "rotate-45" : ""
          }`}
          style={{ background: "#4C6EEE", transitionDuration: ".3s" }}
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            toggleForm();
          }}
        >
          +
        </div>
        <div className="flex flex-col gap-3 pb-2">
          {filteredPromotions.length > 0 ? (
            filteredPromotions.map((promotion, index) => (
              <div key={index}>
                <InfluencerPromotionCard
                  setIsUpdated={setIsUpdated}
                  isUpdated={isUpdated}
                  setPromotionId={setPromotionId}
                  setIsUpdating={setIsUpdating}
                  isUpdating={isUpdating}
                  setSelectedClient={setSelectedClient}
                  setFormData={setFormData}
                  setIsFormOpen={setIsFormOpen}
                  toggleForm={toggleForm}
                  isFormOpen={isFormOpen}
                  color={lightColors[index % lightColors.length]}
                  promotion={promotion}
                />
              </div>
            ))
          ) : (
            <p className="text-center mt-32 text-3xl">No promotions yet.</p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          id="form"
          className="p-4 z-0 w-full max-w-xl fixed form-class overflow-auto"
          // className={`${
          //   isFormOpen
          //     ? "p-4 z-0 w-full max-w-xl fixed form-class form-open-animation"
          //     : "p-4 z-0 w-full max-w-xl fixed form-class form-close-animation"
          // }`}
          style={{ background: "#f2f2fd", borderRadius: "24px",maxHeight: '90%' }}
        >
          <div className="relative mb-4 mt-3">
            <img
              src={FaSearch}
              alt=""
              className="size-5 absolute left-3 top-3  text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search Clients with name or brand"
              className="pl-10 p-2 border rounded-full w-full"
            />

            {selectedClient && (
              <div className="flex items-center gap-3 p-2 border-b cursor-pointer">
                <img
                  src={selectedClient?.profilePicture || default_profile}
                  alt={selectedClient?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{selectedClient?.username}</p>
                  <p className="text-sm text-gray-600">
                    {selectedClient?.businessName}
                  </p>
                </div>
              </div>
            )}

            {isSearchActive && (
              <div className="w-full max-h-40 box-border overflow-y-auto mb-4 absolute top-11 rounded-3xl bg-fuchsia-100">
                {filteredClients.map((client) => (
                  <div
                    key={client?._id}
                    className="flex items-center gap-3 p-2 border-b cursor-pointer hover:bg-fuchsia-300"
                    onMouseDown={(e) => {
                      setFormData({ ...formData, clientId: client?._id });
                      setSelectedClient(client);
                    }}
                  >
                    <img
                      src={client?.profilePicture || default_profile}
                      alt={client?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{client?.username}</p>
                      <p className="text-sm text-gray-600">
                        {client?.businessName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            name="promotionName"
            value={formData.promotionName}
            onChange={handleChange}
            placeholder="Product Title"
            className="mb-4 p-2 pl-4 border rounded-full w-full"
          />
          <input
            type="text"
            name="youtube.url"
            value={formData.youtube.url}
            onChange={handleChange}
            placeholder="YouTube URL"
            className="mb-4 p-2 pl-4 border rounded-full w-full"
          />
          <h2 className="pl-2 mb-2">Youtube Promotion Type</h2>
          <select
            name="youtube.postType"
            value={formData.youtube.postType}
            onChange={handleChange}
            className="mb-4 p-2 pl-4 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          >
            <option value="video">Video</option>
            <option value="short">Short</option>
          </select>
          <input
            type="text"
            name="instagram.url"
            value={formData.instagram.url}
            onChange={handleChange}
            placeholder="Instagram URL"
            className="mb-4 p-2 pl-4 border rounded-full w-full"
          />
          <h2 className="pl-2 mb-2">Instagram Promotion Type</h2>
          <select
            name="instagram.postType"
            value={formData.instagram.postType}
            onChange={handleChange}
            className="mb-4 p-2 pl-4 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          >
            <option value="post">Post</option>
            <option value="reel">Reel</option>
          </select>
          <input
            type="text"
            name="twitter.url"
            value={formData.twitter.url}
            onChange={handleChange}
            placeholder="Twitter URL"
            className="mb-4 p-2 pl-4 border rounded-full w-full"
          />
          <h2 className="pl-2 mb-2">Twitter Promotion Type</h2>
          <select
            name="twitter.postType"
            value={formData.twitter.postType}
            onChange={handleChange}
            className="mb-4 p-2 pl-4 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          >
            <option value="post">Post</option>
            <option value="video">video</option>
          </select>
          {err && (
            <div>
              <ErrComponent err={err} />
            </div>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-full"
            style={{ background: "#ea00ff" }}
          >
            {!isUpdating ? "Add Promotion" : "Update Promotion"}
          </button>
        </form>
      </div>

      <div className="w-full h-screen"></div>
    </section>
  );
};

export default InfluencerDashboard;
