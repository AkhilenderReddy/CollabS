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
    </section>

    




  );
};

export default Home;
