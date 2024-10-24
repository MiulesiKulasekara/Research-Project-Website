"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ProgressCircle from "../components/ProgressCircle";
import { data } from "../data/milestoneData";

const Timeline = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white dark:bg-neutral-800 font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl"></h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm"></p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-40">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-orange-600 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-600 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <div className="flex flex-col">
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500 dark:text-neutral-500 ">
                  {item.year}
                </h3>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500 dark:text-neutral-500 ">
                  {item.month}
                </h3>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.year}
              </h3>
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.month}
              </h3>
              <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-3xl font-bold mb-8">
                  {item.title}
                </p>
                <div className="flex flex-row gap-5">
                  <div class="bg-white bg-opacity-25 backdrop-blur-xl shadow-lg rounded-lg p-6 w-80 text-2xl">
                    <ProgressCircle progress={item.marks} />
                    <p className="text-lg text-center mt-5 font-bold text-white">Marks Allocated</p>
                  </div>
                  <div class="bg-white bg-opacity-25 backdrop-blur-xl shadow-lg rounded-lg p-6 w-full">
                    <p className="text-2xl font-semibold" style={{ color: "#F79733" }}>
                      PURPOSE:
                    </p>
                    <p className="text-xl font-semibold text-white">{item.purpose}</p>
                    <p className="text-xl font-normal text-white mt-10">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1/3 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-orange-500 via-white-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
