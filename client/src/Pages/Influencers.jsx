import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { categories } from "../Components/Categories";
import default_profile from "../Assets/profile.svg";
import twitter from "../Assets/x.svg";
import youtube from "../Assets/youtube.svg";
import instagram from "../Assets/insta.svg";
import star from "../Assets/icons8-star-30.png";
import Loader from "../Components/Loader";
import search from "../Assets/search.svg";

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cat, setCat] = useState([]);

  const categoriesList = categories;

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/influencers`
        );
        setInfluencers(response?.data);
        setIsLoading(false);
        console.log(response?.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchInfluencers();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInfluencers = influencers?.filter((c) => {
    const categoryMatch =
      cat.length > 0
        ? cat.every((category) => c?.categories?.includes(category))
        : true;
    const searchTermMatch =
      c?.username?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      c?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      c?.bio?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return categoryMatch && searchTermMatch;
  });

  const avgRating = (reviews) => {
    if (reviews.length === 0) return "0.00";

    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(2);
  };

  const handleClick = (c) => {
    setCat((prevCat) => {
      if (!prevCat.includes(c)) {
        return [...prevCat, c];
      }
      return prevCat;
    });
  };

  const handleClose = (c) => {
    setCat((prevCat) => prevCat.filter((cat) => cat !== c));
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
    <section className="login-section mt-16 w-full max-w-full px-5 pt-8 mb-7">
      <div className="w-full max-w-full flex flex-wrap items-center justify-center gap-2 min-h-52 overflow-auto no-scrollbar pt-3">
        {categoriesList?.map((c, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.01 }}
            className="w-fit px-3 py-3 rounded-full cursor-pointer text-sm bg-emerald-200 hover:bg-emerald-400 relative"
            onClick={() => handleClick(c)}
          >
            {c}
            {cat?.includes(c) && (
              <div
                className="size-4 text-white absolute -top-1 right-2 rounded-full bg-red-600 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose(c);
                }}
              >
                X
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="w-full max-w-full h-28 mb-5">
        <form className="w-full max-w-2xl mx-auto relative mt-10">
          <img className="size-6 absolute top-3 left-3" src={search} alt="" />
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            value={searchTerm}
            onChange={(e) => {
              handleChange(e);
            }}
            className="p-3 w-full max-w-2xl mx-auto pl-12 rounded-full"
            type="text"
            placeholder="Search for your product marketer."
            autoFocus
          />
        </form>
      </div>
      <div className="w-full max-w-full flex flex-wrap gap-10 justify-center">
        {filteredInfluencers &&
          filteredInfluencers.map((influencer, index) => (
            <motion.a
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "backInOut" }}
              href={`/influencers/${influencer._id}`}
              key={index}
              className="w-full max-w-64 rounded-3xl max-h-80 flex-grow"
            >
              <div className="influencer-card group w-full h-full max-h-80 rounded-3xl hover:shadow-none transition-all duration-300 cursor-pointer flex flex-col pb-5">
                <div className="down w-full h-full relative flex flex-col gap-3 pt-20 px-2 pl-5">
                  <img
                    style={{ top: "-18px", left: "-20px" }}
                    className="influencer-profile size-20 rounded-full absolute transition-transform ease-in-out duration-300 transform group-hover:scale-125"
                    src={influencer?.profilePicture || default_profile}
                    alt=""
                  />
                  <p>{influencer?.username || "N/A"}</p>
                  <p className="font-medium">{influencer?.name || "N/A"}</p>
                  <small>
                    {influencer?.bio.length > 65
                      ? influencer?.bio.slice(0, 65) + "..."
                      : influencer?.bio || "N/A"}
                  </small>
                </div>
                <div className="w-full h-14 flex items-center justify-start gap-3 pl-5">
                  <div
                    className={
                      influencer.socialMediaLinks.youtube ? "" : "grayscaling"
                    }
                  >
                    <img src={youtube} alt="" />
                  </div>

                  <div
                    className={
                      influencer.socialMediaLinks.twitter ? "" : "grayscaling"
                    }
                  >
                    <img className="size-7" src={twitter} alt="" />
                  </div>
                  <div
                    className={
                      influencer.socialMediaLinks.instagram ? "" : "grayscaling"
                    }
                  >
                    <img src={instagram} alt="" />
                  </div>
                </div>
                <div className="overall-rating w-full flex items-center gap-2 mt-3 pl-5">
                  <img src={star} alt="" />
                  <p className="pt-2">
                    {influencer?.reviews.length > 0
                      ? avgRating(influencer.reviews)
                      : 0}
                    /5{" "}
                    <small className="text-slate-500">{` (${influencer?.reviews.length})`}</small>
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
      </div>
    </section>
  );
};

export default Influencers;
