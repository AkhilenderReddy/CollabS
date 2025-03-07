import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultProfilePicture from "../Assets/profile.svg";
import axios from "axios";
import twitter from '../Assets/x.svg'
import youtube from "../Assets/youtube.svg";
import instagram from "../Assets/insta.svg";
import star from "../Assets/icons8-star-30.png";
import { UserContext } from "../Context/UserContext";
import ReviewCard from "../Components/ReviewCardCompo";
import chatsvg from "../Assets/chat.svg";
import Loader from "../Components/Loader";
import ToastMsg from "../Components/ToastMsg";

const InfluencerProfile = () => {
  const { currentUser } = useContext(UserContext);
  const role = currentUser?.role;
  const { id } = useParams();
  const [influencer, setInfluencer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    clientId: role === "Client" ? currentUser.id : "",
    rating: "",
    comment: "",
  });
  const [error, setError] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [displayReviews, setDisplayReviews] = useState(reviews);
  const [isLoading,setIsLoading] = useState(false);
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/influencers/${id}`
        );
        setInfluencer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchInfluencer();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/influencers/${id}/reviews`
        );
        setReviews(response?.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [id, newReview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMsg('');
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/influencers/${id}/reviews`,
        newReview,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );
      setReviews([response?.data.newReview, ...reviews]);
      setNewReview({
        clientId: role === "Client" ? currentUser.id : "",
        rating: "",
        comment: "",
      });
      document.querySelectorAll('input[name="rating"]').forEach((input) => {
        input.checked = false;
      });
      setError("");
      setMsg("Review added successfully.")
    } catch (error) {
      setError(error?.response.data.message);
      console.log(error);
    }
  };

  const avgRating = (reviews) => {
    if (reviews?.length === 0) return "0.00";

    const sum = reviews?.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews?.length).toFixed(2);
  };

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  useEffect(() => {
    setDisplayReviews(showAllReviews ? reviews : reviews?.slice(0, 3));
  }, [showAllReviews, reviews]);

  const startChat = async () => {

    if(!currentUser){
      setIsLoading(true);
      navigate('/login');
      setIsLoading(false);
    }

    const senderId = currentUser?.id;
    const receiverId = id;
    try {
      setIsLoading(true);
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
      navigate('/chat')
      setIsLoading(false);
    } catch (error) {
      console.log(error)
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
        <div
          className="w-full justify-end"
          style={
            currentUser?.id === id ? { display: "flex" } : { display: "none" }
          }
        >
          <Link
            to={`/influencers/${id}/edit`}
            className="px-7 py-2 rounded-3xl"
            style={{ background: "#05061f", color: "#efefef" }}
          >
            Edit
          </Link>
        </div>
        <div
          className="w-full justify-start"
          style={
            currentUser?.id !== id ? { display: "flex" } : { display: "none" }
          }
        >
          <button onClick={startChat}>
            <img className="size-7" src={chatsvg} alt="" />
          </button>
        </div>
        <div className="w-full flex flex-col gap-3">
          <p>{influencer?.username}</p>
          <p>{influencer?.name}</p>
          <p>{influencer?.bio}</p>
          <p>{influencer?.email}</p>
          <div className="connect w-full flex h-fit gap-5 py-3">
            {(
              <Link to={influencer?.socialMediaLinks?.twitter} className={influencer?.socialMediaLinks?.twitter ? '' : 'grayscaling'}>
                <img className="size-7" src={twitter} alt="" />
              </Link>
            )}
            {(
              <Link to={influencer?.socialMediaLinks?.instagram} className={influencer?.socialMediaLinks?.instagram ? '' : 'grayscaling'}>
                <img src={instagram} alt="" />
              </Link>
            )}
            {(
              <Link to={influencer?.socialMediaLinks?.youtube} className={influencer?.socialMediaLinks?.youtube ? '' : 'grayscaling'}>
                <img src={youtube} alt="" />
              </Link>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <img src={star} alt="" />{" "}
            <p className="pt-1">
              {reviews?.length > 0 ? avgRating(reviews) : 0}/5{" "}
              <small className="text-slate-500">{` (${reviews?.length})`}</small>
            </p>
          </div>
        </div>
        <div className="w-full">
            <h2 className="mt-5 text-2xl">Prefered Promotions</h2>
            <div className="w-full flex flex-wrap gap-3 mt-3">
              {influencer?.categories?.length > 0 ? influencer?.categories?.map(c => (
                <div key={c} className="w-fit px-4 py-2 rounded-3xl bg-emerald-400">{c}</div>
              )) : <p>N/A</p>} 
            </div>
        </div>
      </div>
      <div className="w-full reviews-div mt-7">
        <h2 className="text-2xl">Reviews</h2>
        <div
          className="reviews w-full"
          style={role === "Client" ? { display: "block" } : { display: "none" }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 justify-center "
          >
            <label className="flex items-center gap-12 w-fit">
              Rating :
              <div className="rating inline-block">
                <input
                  className="hidden"
                  value="5"
                  name="rating"
                  id="star5"
                  type="radio"
                  onChange={handleInputChange}
                />
                <label
                  className="float-right cursor-pointer"
                  htmlFor="star5"
                ></label>
                <input
                  className="hidden"
                  value="4"
                  name="rating"
                  id="star4"
                  type="radio"
                  onChange={handleInputChange}
                />
                <label
                  className="float-right cursor-pointer"
                  htmlFor="star4"
                ></label>
                <input
                  className="hidden"
                  value="3"
                  name="rating"
                  id="star3"
                  type="radio"
                  onChange={handleInputChange}
                />
                <label
                  className="float-right cursor-pointer"
                  htmlFor="star3"
                ></label>
                <input
                  className="hidden"
                  value="2"
                  name="rating"
                  id="star2"
                  type="radio"
                  onChange={handleInputChange}
                />
                <label
                  className="float-right cursor-pointer"
                  htmlFor="star2"
                ></label>
                <input
                  className="hidden"
                  value="1"
                  name="rating"
                  id="star1"
                  type="radio"
                  onChange={handleInputChange}
                />
                <label
                  className="float-right cursor-pointer"
                  htmlFor="star1"
                ></label>
              </div>
            </label>
            <label className="flex items-center gap-5">
              Comment :
              <textarea
                name="comment"
                className="w-full max-w-lg min-h-28 text-black rounded-3xl px-7 py-2"
                value={newReview.comment}
                onChange={handleInputChange}
                required
              ></textarea>
            </label>
            {error && <p className="text-red-500">{error}</p>}
            {msg && <ToastMsg message={msg}/>}
            <button
              type="submit"
              className="w-fit px-7 py-2 rounded-3xl bg-slate-50 text-black ml-28"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
      <div className="w-full mt-5">
        {reviews?.length > 0 ? (
          <ul className="flex flex-col gap-5">
            {displayReviews?.map((review) => (
              <li key={review?._id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
        <button
          style={
            reviews?.length > 5 ? { display: "block" } : { display: "none" }
          }
          onClick={toggleReviews}
          className="w-fit px-7 py-2 rounded-3xl text-black bg-slate-50 mx-auto mt-5"
        >
          {showAllReviews ? "View Less" : "View More"}
        </button>
      </div>
    </section>
  );
};

export default InfluencerProfile;
