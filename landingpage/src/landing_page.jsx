import React, { useState, useEffect } from 'react';
import landing from './assets/landing-Photoroom.png';
import { IoCartOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

export const SlideDown = (delay) => {
  return {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    show: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay,
      }
    }
  }
};

const LandingPage = () => {
  const [index, setIndex] = useState(0);

  const words = ['Fast', 'Secure', 'Seamless', 'Reliable'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [index]);

  return (
    <main className='bg-background'>
      <div className='container min-h-[600px] flex justify-center mt-[-60px] font-serif'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 place-items-center justify-between'>
   
          <div className='space-y-3 mt-14 text-center md:text-left md:mt-0'>
           
            <motion.h1
              variants={SlideDown(0.5)}
              initial="hidden"
              whileInView="show"
              className='mt-5 relative md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase text-titleColor'>
              Better Solutions to
            </motion.h1>

            <motion.h1
              variants={SlideDown(1)}
              initial="hidden"
              whileInView="show"
              className='relative  text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase text-titleColor'>
              <span className="text-buttonBackground">{words[index]} </span> PC Registration
            </motion.h1>

            <motion.p
              variants={SlideDown(1.5)}
              initial="hidden"
              whileInView="show"
              className='text-sm md:text-lg  text-paragraphColor'>
              PC registration made effortless with our cutting-edge platform. Whether you're
              looking to streamline processes, enhance security, or boost efficiency, we
              provide the tools and support you need. Experience a hassle-free registration
              process that's tailored to your needs.
            </motion.p>

            <motion.button
              variants={SlideDown(1)}
              initial="hidden"
              whileInView="show"
              className='mt-6 px-6 py-3 bg-buttonBackground text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition ease-in-out'>
              <IoCartOutline className='inline mr-2' /> Get Started
            </motion.button>
          </div>

          <div>
            <motion.img
              initial={{ opacity: 0, rotate: 120, x: 200, y: 100 }}
              whileInView={{ opacity: 1, rotate: 360, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              src={landing}
              alt=""
              className='w-[350px] img-shadow' />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
