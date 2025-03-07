import React from "react";
import moment from "moment";
import star from "../Assets/icons8-star-30.png";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const rating = (rating) => {
    let num = parseInt(rating);
    let stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<img key={i} src={star} alt="star" />);
    }
    return stars;
  };

  return (
    <div
      className="review-card rounded-3xl w-full max-w-lg min-h-fit px-7 py-5 relative rounded-t-none"
      style={{ background: "#05061f", color: "#efefef" }}
    >
      <img
        className="reviewer-img size-14 absolute rounded-full"
        style={{ top: "-10px", right: "-10px" }}
        src={review?.clientId?.profilePicture}
        alt=""
      />
      <div className="flex flex-col mt-6 gap-3">
        <Link to={`/clients/${review?.clientId?._id}`}>
          <p
            className="flex items-center absolute text-lg px-7 py-2 rounded-3xl"
            style={{
              top: "-10px",
              left: "-10px",
              background: "#f2f2fd",
              color: "#05061f",
            }}
          >
            {review?.clientId?.username?.length > 20
              ? review?.clientId?.username?.slice(0, 20) + "..."
              : review?.clientId?.username}
          </p>
        </Link>
        <p className="flex items-center">{rating(review?.rating)}</p>
        <p className="flex items-center dancing-script text-xl">
          {review?.comment}
        </p>
        <p className=" text-right">{moment(review?.date).fromNow()}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
