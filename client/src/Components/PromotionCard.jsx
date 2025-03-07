import React from "react";
import twitter from "../Assets/x.svg";
import youtube from "../Assets/youtube.svg";
import instagram from "../Assets/insta.svg";
import { Link } from "react-router-dom";

const PromotionCard = ({ promotion, color }) => {
  
  return (
    <div
      className="influ-promo-card w-full max-w-6xl mx-auto rounded-3xl overflow-hidden px-5"
      style={{ background: color }}
    >
      <div className="w-full max-w-5xl min-h-fit text-black flex mx-auto">
        <div className="w-full max-w-52  flex flex-col items-center justify-around gap-3 py-2">
          <div className="flex gap-5">
            <div className="flex flex-col justify-evenly items-center gap-1">
              <Link
                to={`/clients/${promotion?.clientId?._id}`}
                className="size-24 overflow-hidden rounded-full grid place-items-center"
              >
                <img
                  className="size-24 rounded-full bg-black  overflow-hidden hover:scale-105 transition-transform duration-200"
                  src={promotion?.clientId?.profilePicture}
                  alt=""
                />
              </Link>
              <small className="role-client text-center">Client</small>
              <h2 className="text-sm">{promotion?.clientId?.username}</h2>
            </div>
            <div className="flex flex-col justify-evenly items-center gap-1">
              <Link
                to={`/influencers/${promotion?.influencerId?._id}`}
                className="size-24 overflow-hidden rounded-full grid place-items-center"
              >
                <img
                  className="size-24 rounded-full bg-black  overflow-hidden hover:scale-105 transition-transform duration-200"
                  src={promotion?.influencerId?.profilePicture}
                  alt=""
                />
              </Link>
              <small className="role-influencer text-center">Influencer</small>
              <h2 className="text-sm">{promotion?.influencerId?.username}</h2>
            </div>
          </div>
        </div>
        <div className="w-full max-w-full flex flex-col gap-2 pt-3">
          <h2 className="text-4xl text-center">
            {promotion?.promotionName.length > 40
              ? promotion?.promotionName?.slice(0, 37) + "..."
              : promotion?.promotionName}
          </h2>
          <p className="text-center">
            Brand: {promotion?.clientId?.businessName}
          </p>
          <div className="flex gap-3 items-center justify-center h-full">
            <h2 className="w-fit">Promotions :</h2>
            {promotion?.youtube?.url && (
              <Link to={`${promotion?.youtube?.url}`}><img
                src={youtube}
                alt=""
                className={`size-8 ${
                  promotion?.youtube?.url ? "" : "grayscale"
                }`}
              /></Link>
            )}
            {promotion?.instagram?.url && (
              <Link to={`${promotion?.instagram?.url}`}><img
                src={instagram}
                alt=""
                className={`size-8 ${
                  promotion?.instagram?.url ? "" : "grayscale"
                }`}
              /></Link>
            )}
            {promotion?.twitter?.url && (
              <Link to={`${promotion?.twitter?.url}`}><img
                src={twitter}
                alt=""
                className={`size-7 ${
                  promotion?.twitter?.url ? "" : "grayscale"
                }`}
              /></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
