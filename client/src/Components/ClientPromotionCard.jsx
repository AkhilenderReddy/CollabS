import React, { useEffect, useState } from "react";
import youtube from "../Assets/youtube.svg";
import twitter from "../Assets/x.svg";
import instagram from "../Assets/insta.svg";
import views from "../Assets/icons8-eyes-30.png";
import retweet from "../Assets/icons8-retweet-30.png";  
import comments from "../Assets/icons8-comments-30 (2).png";
import likes from "../Assets/icons8-heart-30.png";
import axios from "axios";

const ClientPromotionCard = ({ promotion, color }) => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [ytId,setYtId] = useState(null);
  const [youtubeMetrics, setYoutubeMetrics] = useState(null);
  const [instaMetrics, setInstaMetrics] = useState(null);
  const [xMetrics, setXMetrics] = useState(null);
  const [tweetId,setTweetId] = useState(null)

  const extractYouTubeId = (url)=> {
    const regex = /youtu\.be\/([^/?&\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;}

    function extractTweetId(url) {
      const regex = /status\/(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    }

  useEffect(() => {
    const fetchYoutubeMetrics = async () => {
      try { 
        if(promotion?.youtube?.url){
          setYtId(extractYouTubeId(promotion?.youtube?.url))
        }
      
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ytId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        );

        const data = response?.data;
        if (data?.items && data?.items?.length > 0) {
          const videoDetails = data?.items[0];
          setYoutubeMetrics({
            title: videoDetails?.snippet?.title,
            views: videoDetails?.statistics?.viewCount,
            likes: videoDetails?.statistics?.likeCount,
            comments: videoDetails?.statistics?.commentCount,
          });
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchYoutubeMetrics();
  }, [promotion,ytId]);

  useEffect(() => {
    const fetchInstaMetrics = async () => {
      const options = {
        method: "GET",
        url: "https://instagram-statistics-api.p.rapidapi.com/posts/one",
        params: {
          postUrl: process.env.REACT_APP_INSTAGRAM_POST_URL,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          "x-rapidapi-host": "instagram-statistics-api.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);

        if (response?.data && response?.data?.data) {
          setInstaMetrics({
            views: response?.data?.data?.views,
            likes: response?.data?.data?.likes,
            comments: response?.data?.data?.comments,
          });
        }

        console.log("insta: ", response?.data);
      } catch (error) {
        console.error("Error fetching Instagram metrics:", error);
        if(error?.response?.status === 429){
          setInstaMetrics('Too many requests.')
        }
      }
    };

    fetchInstaMetrics();
  }, [promotion]);

  useEffect(() => {
    const fetchTwitterMetrics = async () => {
      try {
        if (promotion?.twitter?.url) {
          setTweetId(extractTweetId(promotion?.twitter?.url));
        }
        const options = {
          method: "GET",
          url: `https://x66.p.rapidapi.com/tweet/${tweetId}`,
          headers: {
            "x-rapidapi-key":
              "f7b8c44101msh5d86a881d5d182dp17f220jsnd07eb91c13b0",
            "x-rapidapi-host": "x66.p.rapidapi.com",
          },
        };
        const { data } = tweetId && await axios.request(options);
        const result =
          data?.threaded_conversation_with_injections?.[0]?.entries?.[0]
            ?.content?.itemContent?.tweet_results?.result;
        // const itemContent  = result?.itemContent;
        setXMetrics(result);
        console.log(xMetrics && xMetrics);
        if (result) {
          console.log(result);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (promotion) {
      fetchTwitterMetrics();
    }
  }, [promotion,tweetId]);

  function formatNumber(num) {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "k";
    } else {
      return num;
    }
  }

  return (
    <div
      className="influ-promo-card w-full max-w-5xl mx-auto rounded-3xl overflow-hidden cursor-pointer"
      style={{ background: color }}
      onClick={() => setIsDisplay(!isDisplay)}
    >
      <div className="w-full max-w-5xl min-h-fit text-black flex mx-auto">
        <div className="w-full max-w-52  flex flex-col items-center justify-around gap-3 py-2">
          <img
            className="size-20 rounded-full bg-black"
            src={promotion?.influencerId?.profilePicture}
            alt=""
          />
          <h2>{promotion?.influencerId?.username}</h2>
        </div>
        <div className="w-full max-w-full flex flex-col gap-2 pt-3">
          <h2 className="text-4xl text-center">
            {promotion?.promotionName}
          </h2>
          <div className="flex gap-3 items-center justify-center h-full">
            <h2 className="w-fit">Promotions :</h2>
            <img src={youtube} alt="" className={`size-8 ${promotion?.youtube?.url ? '' : 'grayscale'}`} />
            <img src={instagram} alt="" className={`size-8 ${promotion?.instagram?.url ? '' : 'grayscale'}`} />
            <img src={twitter} alt="" className={`size-7 ${promotion?.twitter?.url ? '' : 'grayscale'}`} />
          </div>
        </div>
      </div>
      <div
        className={`w-full max-w-full flex gap-10 pt-3 items-center justify-center transition-all duration-500 ease-in-out ${
          isDisplay ? "min-h-20 opacity-100" : "h-0 opacity-0"
        }`}
        style={{ borderTop: "1px solid #efefef" }}
      >
        {/* youtube */}
        <div
          className="w-52 h-64 my-5 relative rounded-3xl pt-3 text-slate-50"
          style={{ background: "#cd201f" }}
        >
          <div
            className="size-20 bg-black absolute -top-5 -left-5"
            style={{
              borderRadius: " 35% 30% 75% 30% / 49% 30% 70% 51%",
              border: `5px solid ${color}`,
            }}
          >
            <img className={`size-10 mt-3 ml-3 transition-transform duration-300 ${promotion?.youtube?.url ? 'cursor-pointer hover:scale-150' : 'cursor-not-allowed grayscale'}`} src={youtube} onClick={()=> window.open(promotion?.youtube?.url,'_blank')} alt="" />
          </div>
          <h2 className="text-center">
            {promotion?.youtube?.postType?.charAt(0).toUpperCase() +
              promotion?.youtube?.postType?.slice(1)}
          </h2>
          <div className="flex flex-col pt-10 items-center gap-5">
            <div className="flex gap-3 w-full pl-10">
              <img className="size-6" src={views} alt="" />
              {formatNumber(youtubeMetrics?.views) || "No Results"}
            </div>
            <div className="flex gap-3 w-full pl-10">
              <img className="size-6" src={likes} alt="" />
              {formatNumber(youtubeMetrics?.likes) || "No Results"}
            </div>
            <div className="flex gap-3 w-full pl-10">
              <img className="size-6" src={comments} alt="" />
              {formatNumber(youtubeMetrics?.comments) || "No Results"}
            </div>
          </div>
        </div>
        <div
          className="w-52 h-64 my-5 relative rounded-3xl pt-3 text-slate-50"
          style={{ background:
            "radial-gradient(circle at 90% 100%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
        >
          <div
            className="size-20 grid bg-black absolute -top-5 -left-5"
            style={{
              borderRadius: "35% 30% 75% 30% / 49% 30% 70% 51%",
              border: `5px solid ${color}`,
            }}
          >
            <img className={`size-10 mt-3 ml-3 transition-transform duration-300 ${promotion?.instagram?.url ? 'cursor-pointer hover:scale-150' : 'cursor-not-allowed grayscale'}`} src={instagram} onClick={()=> window.open(promotion?.instagram?.url,'_blank')} alt="" />
          </div>
          <h2 className="text-center">
            {promotion?.instagram?.postType?.charAt(0).toUpperCase() +
              promotion?.instagram?.postType?.slice(1)}
          </h2>
          { typeof(instaMetrics) === 'string' ? <p className="text-center mt-20">{instaMetrics + ' Try again later'}</p> : <div className="flex flex-col pt-10 items-center gap-5">
            <div className="flex gap-3 w-full pl-10">
              <img className="size-6" src={views} alt="" />
              {formatNumber(instaMetrics?.views) || "No Results"}
            </div>
            <div className="flex gap-3 w-full pl-10">
              <img className="size-6" src={likes} alt="" />
              {formatNumber(instaMetrics?.likes) || "No Results"}
            </div>
            <div className="flex gap-3 w-full pl-10">
              <img className="size-6" src={comments} alt="" />
              {formatNumber(instaMetrics?.comments) || "No Results"}
            </div>
          </div>}
        </div>
        {/* twitter */}
        <div
          className="w-52 h-64 my-5 relative rounded-3xl pt-3 text-slate-50 shrink-0 mr-5"
          style={{ background: "#05061f" }}
        >
          <div
            className="size-20 absolute -top-5 -left-5"
            style={{
              borderRadius: "35% 30% 75% 30% / 49% 30% 70% 51%",
              border: `5px solid ${color}`,
              background: "#f2f2fd",
            }}
          >
            <img className={`size-10 mt-3 ml-3 transition-transform duration-300 ${promotion?.twitter?.url ? 'cursor-pointer hover:scale-150':'cursor-not-allowed grayscale' }`} onClick={()=> window.open(promotion?.twitter?.url,'_blank')} src={twitter} alt="" />
          </div>
          <h2 className="text-center">
            {promotion?.twitter?.postType?.charAt(0).toUpperCase() +
              promotion?.twitter?.postType?.slice(1)}
          </h2>
          {xMetrics ? (
            <div className="flex flex-col pt-10 items-center gap-5">
              <div className="flex gap-3 w-full pl-10">
                <img className="size-6" src={views} alt="" />
                {formatNumber(xMetrics?.views?.count) || "No Results"}
              </div>
              <div className="flex gap-3 w-full pl-10">
                <img className="size-6" src={likes} alt="" />
                {formatNumber(xMetrics?.legacy?.favorite_count) || "No Results"}
              </div>
              <div className="flex gap-3 w-full pl-10">
                <img className="size-6" src={comments} alt="" />
                {formatNumber(xMetrics?.legacy?.reply_count) || "No Results"}
              </div>
              <div className="flex gap-3 w-full pl-10">
                <img className="size-6" src={retweet} alt="" />
                {formatNumber(xMetrics?.legacy?.retweet_count) || "No Results"}
              </div>
            </div>
          ) : (
            <div className="size-full flex justify-center pt-20">
              Analytics Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPromotionCard;
