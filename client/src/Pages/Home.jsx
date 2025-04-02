import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import handShake from "../Assets/3d-mini-handshake.png";
import service1 from "../Assets/a905bcc2-74d3-4ad1-a63f-591cde34ba28.png";
import service2 from "../Assets/c24eb4d2-7187-4f3b-97a6-75c1ce618863.png";
import service3 from "../Assets/28c28307-d823-4f64-9ed4-10aa41c539ea.png";
import { UserContext } from "../Context/UserContext";
import GetStarted from "../Components/GetStarted";
import axios from "axios";
import PromotionCard from "../Components/PromotionCard";
import Loader from "../Components/Loader";
import Morquee from "../Components/Morquee";
import akhilender from "../Assets/akhilenderremovebg.png";
import anish from "../Assets/anish.jpg";
import rajiv from "../Assets/rajiv.jpg";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });
  const isInView4 = useInView(ref4, { once: true });
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPromotions = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/promotions/`
        );
        setPromotions(res?.data?.splice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getPromotions();
  }, []);

  const lightColors = [
    "#fcf372",
    "#9bebb0",
    "#ffb69a",
    "#f0cd86",
    "#bcc4ab",
    "#84eff4",
    "#e77f94",
    "#eac7f6",
  ];

  return (
    <section className="home-section mt-16">
      <div className="w-full flex flex-col px-3 pt-20 gap-5">
        <div className="content-div flex flex-col gap-2">
          <motion.h2
            ref={ref1}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.5, type: "tween" }}
            className="text-center pt-5 "
          >
            Elevate Your{" "}
            <motion.span
              ref={ref2}
              initial={{ opacity: 0, y: -50 }}
              animate={isInView2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, type: "tween" }}
              className="coloring"
            >
              Brand
            </motion.span>{" "}
            , Expand Your Demand!
          </motion.h2>
          {!currentUser && <GetStarted />}
        </div>
        <div className="services w-full flex gap-3 items-center justify-around">
          <motion.div
            initial={{ opacity: 0, backgroundColor: "none" }}
            whileInView={{
              opacity: 1,
              backgroundColor: "rgba(214, 10, 255, 0.133)",
            }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1 items-center rounded-2xl p-2"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6, type: "spring" }}
              src={service1}
              alt=""
            />
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="text-lg font-medium"
            >
              Search and Connect
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, backgroundColor: "none" }}
            whileInView={{
              opacity: 1,
              backgroundColor: "rgba(214, 10, 255, 0.133)",
            }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1 items-center rounded-2xl p-2"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.6, type: "spring" }}
              src={service2}
              alt=""
            />
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 }}
              className="text-lg font-medium"
            >
              Seamless Collaboration
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, backgroundColor: "none" }}
            whileInView={{
              opacity: 1,
              backgroundColor: "rgba(214, 10, 255, 0.133)",
            }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1 items-center rounded-2xl p-2"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
              src={service3}
              alt=""
            />
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6 }}
              className="text-lg font-medium"
            >
              Performance Tracking
            </motion.h2>
          </motion.div>
        </div>
      </div>
      
      <div className="home-div-2 w-full flex flex-wrap items-end px-3 justify-around">
        <div className="content-div flex flex-col gap-2 items-center justify-center">
          <motion.h2
            ref={ref3}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView3 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, type: "keyframes" }}
            className="text-center pt-10"
          >
            Where <span className="coloring">Marketing</span> Meets Momentum
          </motion.h2>
          <div className="marketing-2 text-lg px-5 pt-10 py-3 w-fit rounded-2xl items-center justify-center">
            <motion.img
              ref={ref4}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView4 ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.5, type: "tween" }}
              src={handShake}
              alt=""
            />
          </div>
        </div>
        {/* Morquee component */}
        <Morquee />
        <div className="w-full flex flex-col gap-5 mb-5">
          <h2
            className="text-center text-4xl my-3 mt-14"
            style={{
              fontSize: "clamp(20px,5vw + 5px , 60px)",
              fontWeight: "500",
            }}
          >
            Recent Promotions
          </h2>
          {isLoading ? (
            <Loader />
          ) : promotions.length > 0 ? (
            promotions?.map((promotion, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration : 0.5,ease: "backInOut"}}
                key={index}
              >
                <PromotionCard
                  promotion={promotion}
                  color={lightColors[index % lightColors.length]}
                />
              </motion.div>
            ))
          ) : (
            <p>No results</p>
          )}
        </div>
      </div>

      {/* Technical Support Section */}
      <section className="w-full flex justify-center md:my-[5rem] my-10">
        <div className="w-full flex flex-col gap-10">
          <h1 className="text-center text-[#8a00c2] md:text-7xl text-3xl font-bold">
            Technical Support
          </h1>
          <div className="w-full overflow-hidden">
            <div className="w-full px-4 mx-auto">
              <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                    Hey 👋 I am Akhilender
                  </h2>
                  <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                    At CollabSphere, we're here to assist you with any technical questions or issues you may encounter. For support, please reach out to us via email at support@collabsphere.com, and our team will respond promptly to resolve your concerns. We are committed to providing a seamless collaboration experience and ensuring that your workflows remain efficient and uninterrupted.
                    <br /><br />
                    Thank you for choosing CollabSphere!
                  </p>

                  <p className="mt-4 text-xl text-gray-600 md:mt-8">
                    <span className="relative inline-block">
                      <span className="absolute inline-block w-full bottom-0.5 h-2" style={{ background: "rgba(214, 10, 255, 0.133)" }}></span>
                      <span className="relative"> Have a question? </span>
                    </span>
                    <br className="block sm:hidden" />
                    Ask me on <a href="https://x.com/akhil_reddy_t" title=""
                      className="transition-all duration-200 text-[#8a00c2] hover:text-[#6b00a3] hover:underline">Twitter</a>
                  </p>
                </div>

                <div className="relative">
                  <div className="relative w-full xl:max-w-lg xl:mx-auto">
                    <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />
                    <img className="relative w-full" src={akhilender} alt="Akhilender" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-manrope text-5xl text-center font-bold text-gray-900">Collab Sphere Contributors</h2>
          </div>
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-xl mx-auto md:max-w-3xl lg:max-w-full">
            <div className="block group md:col-span-2 lg:col-span-1">
              <div className="relative mb-6">
                <img src={anish} alt="Anish"
                  className="w-60 h-80 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600" style={{ objectPosition: "top" }} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                P Anish Reddy
              </h4>
              <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                Community Outreach and Engagement
              </span>
            </div>
            <div className="block group md:col-span-2 lg:col-span-1">
              <div className="relative mb-6">
                <img src={rajiv} alt="Rajiv"
                  className="w-60 h-80 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                D Rajiv Reddy
              </h4>
              <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                Social Media and Digital Marketing
              </span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
