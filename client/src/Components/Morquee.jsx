import React from "react";
import { motion } from "framer-motion";
import { categories } from "./Categories";


const Morquee = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center cursor-default">
      <div className="w-full mx-2 rounded-3xl flex overflow-hidden gap-2">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="min-w-full flex flex-shrink-0 gap-2 justify-center items-center"
        >
          {categories?.map((category, index) => (
            <div
              key={index}
              className="w-fit px-4 py-2 rounded-3xl bg-emerald-200 flex flex-shrink-0"
            >
              {category}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="min-w-full flex flex-shrink-0 gap-2 justify-center items-center"
        >
          {categories?.map((category, index) => (
            <div
              key={index}
              className="w-fit px-4 py-2 rounded-3xl bg-emerald-200 flex flex-shrink-0"
            >
              {category}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="w-full mx-2 rounded-3xl flex overflow-hidden gap-2">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="min-w-full flex flex-shrink-0 gap-2 justify-center items-center"
        >
          {categories?.map((category, index) => (
            <div
              key={index}
              className="w-fit px-4 py-2 rounded-3xl bg-emerald-200 flex flex-shrink-0"
            >
              {category}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="min-w-full flex flex-shrink-0 gap-2 justify-center items-center"
        >
          {categories?.map((category, index) => (
            <div
              key={index}
              className="w-fit px-4 py-2 rounded-3xl bg-emerald-200 flex flex-shrink-0"
            >
              {category}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="w-full mx-2 rounded-3xl flex overflow-hidden gap-2">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="min-w-full flex flex-shrink-0 gap-2 justify-center items-center"
        >
          {categories?.reverse().map((category, index) => (
            <div
              key={index}
              className="w-fit px-4 py-2 rounded-3xl bg-emerald-200 flex flex-shrink-0"
            >
              {category}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="min-w-full flex flex-shrink-0 gap-2 justify-center items-center"
        >
          {categories?.map((category, index) => (
            <div
              key={index}
              className="w-fit px-4 py-2 rounded-3xl bg-emerald-200 flex flex-shrink-0"
            >
              {category}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Morquee;
