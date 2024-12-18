import React, { useState, useEffect } from 'react';
import { Button, Typography, Col, Row } from 'antd';
import landing from './assets/logo.png';
import { IoCartOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import devAnimation from './assets/dev.json';
const { Title, Paragraph } = Typography;

export const SlideDown = (delay) => ({
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
});

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const words = ['Fast', 'Secure', 'Seamless', 'Reliable'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='bg-[#001F3D] min-h-screen flex justify-center items-center px-20 mt-20'>
      <div className='container mx-auto py-16 px-4'>
        <Row gutter={24} align="middle">
          <Col span={24} md={12}>
            <div className='space-y-5 text-center md:text-left'>
              <motion.h1
                variants={SlideDown(0.5)}
                initial="hidden"
                whileInView="show"
                className='text-xl lg:text-3xl xl:text-5xl font-bold uppercase text-[#CCFFFF]'>
                Better Solutions to
              </motion.h1>

              <motion.h1
                variants={SlideDown(1)}
                initial="hidden"
                whileInView="show"
                className='text-xl lg:text-3xl xl:text-5xl font-bold uppercase text-[#CCFFFF]'>
                <span className="text-[#00AED9]">{words[index]} </span> PC Registration
              </motion.h1>

              <motion.p
                variants={SlideDown(1.5)}
                initial="hidden"
                whileInView="show"
                className='text-base md:text-lg text-[#CCFFFF]'>
                PC registration made effortless with our cutting-edge platform. Whether you're
                looking to streamline processes, enhance security, or boost efficiency, we
                provide the tools and support you need. Experience a hassle-free registration
                process that's tailored to your needs.
              </motion.p>

              <motion.div
                variants={SlideDown(1)}
                initial="hidden"
                whileInView="show">
                <Button
                  type="primary"
                  className='mt-6 flex items-center'
                  style={{ backgroundColor: '#005F8F', borderColor: '#005F8F' }}
                  icon={<IoCartOutline className='mr-2' />}>
                  Get Started
                </Button>
              </motion.div>
            </div>
            </Col>
          {/* </Col>
          <Col span={24} md={12}>
  <div className="relative mt-5 h-80 lg:mt-2 flex justify-center">
    <motion.div
      initial={{ opacity: 0, rotate: 120, x: 200 }}
      whileInView={{ opacity: 1, rotate: 360, x: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute left-0 bottom-[-100px] w-[44rem] max-w-none rounded-md"
    >
      <Lottie
        animationData={devAnimation}
        loop={true} // Ensure the animation loops
      />
    </motion.div>
  </div>
</Col> */}


        <Col span={24} md={12}>
            <motion.div
              initial={{ opacity: 0, rotate: 120, x: 200 }}
              whileInView={{ opacity: 1, rotate: 360, x: 0 }}
              transition={{ duration: 0.8 }}/>
              <Lottie
        animationData={devAnimation}
        loop={true} // Ensure the animation loops
      />
          </Col>
          </Row>

      </div>
    </main>
  );
};

export default LandingPage;
