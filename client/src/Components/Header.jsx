import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import defaultPic from "../Assets/profile.svg";
import Marquee from "react-fast-marquee";
import logo from "../Assets/mylogo.png";

const Header = () => {
  const { currentUser,setCurrentUser } = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const token = currentUser?.token;  
        if (!token) {
          alert("No token. Please login again", 401);
          navigate('/login');
          return;
        }
  
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users/decode/${token}`
        );
  
        const isValid = response?.data?.message;
        if (!isValid) {
          setCurrentUser(null);
          alert("Session expired. Please login again", 401);
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    if (currentUser && location?.pathname !== "/login") {
      decodeToken();
    }
  }, [currentUser, location?.pathname]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${currentUser?.id}`
        );
        setUser(response?.data?.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      getUser();
    }
  }, [currentUser, user]);

  useEffect(() => {
    if (currentUser?.token === null) {
      navigate("/login");
    }
  }, [currentUser?.token]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > scrollPosition) {
        setVisible(false); //scrolling down
      } else {
        setVisible(true); //scrolling up
      }

      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const handleMenu = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <header
      className={`nav-header fixed flex justify-between transition-transform duration-300 ease-in-out ${
        visible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="product-heading flex justify-center items-center">
        <Link
          to={"/"}
          className="coloring flex items-center justify-center pl-3"
        >
          <img className="size-10 mb-1.5" src={logo} alt="" />
          COLAB SPHERE
        </Link>
      </div>
      <nav className="flex items-center">
        <ul className="flex gap-5 items-center justify-around w-full">
          <MotionConfig transition={{ duration: 0.3 }}>
            <motion.a
              whileHover={{ scaleX: [0.9, 1.1, 1] }}
              href={"/clients"}
              onClick={() => setIsChecked(false)}
            >
              Clients
            </motion.a>
            <motion.a
              whileHover={{ scaleX: [0.9, 1.1, 1] }}
              href={"/influencers"}
              onClick={() => setIsChecked(false)}
            >
              Influencers
            </motion.a>
            <motion.a
              whileHover={{ scaleX: [0.9, 1.1, 1] }}
              href={"/chat"}
              onClick={() => setIsChecked(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </motion.a>
          </MotionConfig>
        </ul>
      </nav>
      <div className="flex items-center justify-center p-1">
        {currentUser ? (
          <div
            className="flex w-14 h-14 items-center justify-center cursor-pointer"
            onClick={handleClick}
          >
            <img
              className="w-full h-full rounded-full"
              src={user?.profilePicture || defaultPic}
              alt=""
            />
          </div>
        ) : (
          <label className="flex flex-col gap-2 w-8 justify-center cursor-pointer">
            <input
              className="peer hidden"
              type="checkbox"
              checked={isChecked}
              onChange={handleMenu}
            />
            <div className="rounded-full h-[3px] w-1/2 bg-blue-500 duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"></div>
            <div className="rounded-full h-[3px] w-full bg-blue-500 duration-500 peer-checked:-rotate-45"></div>
            <div className="rounded-full h-[3px] w-1/2 bg-blue-500 duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"></div>
          </label>
        )}
      </div>
      <div
        className="menu-nav w-56   absolute top-14 z-20 right-1 flex flex-col items-center gap-3 px-10 py-5 rounded-3xl"
        style={
          !isChecked
            ? { display: "none", background: "#F8FDFE" }
            : { display: "flex", background: "#F8FDFE" }
        }
      >
        {!currentUser?.id && (
          <motion.a
            whileHover={{ scaleX: [0.9, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            href={"/login"}
            className="login w-full max-w-full px-5 py-2 rounded-3xl"
            style={{
              background: "linear-gradient(245deg,#4C6EEE22,#ea00ff22)",
            }}
            onClick={() => setIsChecked(false)}
          >
            Login
          </motion.a>
        )}
        {!currentUser?.id && (
          <motion.a
            whileHover={{ scaleX: [0.9, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            href={"/signup"}
            className="signup px-5 py-2 rounded-3xl"
            onClick={() => setIsChecked(false)}
          >
            SignUp
          </motion.a>
        )}
        {currentUser?.id && (
          <Marquee className="text-lg">
            <p>{` Hi! ${user?.username} `} </p>
            <p className="w-5"></p>
          </Marquee>
        )}
        {currentUser?.id && (
          <Link
            to={`/${currentUser?.role}s/${currentUser?.id}`}
            className="login w-full px-5 py-2 rounded-3xl"
            style={{
              background: "linear-gradient(245deg,#4C6EEE22,#ea00ff22)",
            }}
            onClick={() => setIsChecked(false)}
          >
            Profile
          </Link>
        )}
        {currentUser?.id && (
          <Link
            to={`/${currentUser?.role}s/${currentUser?.id}/dashboard`}
            className="login w-full px-5 py-2 rounded-3xl"
            style={{
              background: "linear-gradient(245deg,#4C6EEE22,#ea00ff22)",
            }}
            onClick={() => setIsChecked(false)}
          >
            Dashboard
          </Link>
        )}
        {currentUser?.id && (
          <Link
            to={"/logout"}
            className="signup flex justify-evenly gap-3 w-full px-5 py-2 rounded-3xl"
            onClick={() => setIsChecked(false)}
          >
            <p>Log Out</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
