import { motion } from 'framer-motion';
import { FaUser, FaLaptop, FaDatabase, FaCheckCircle } from 'react-icons/fa';
import React from 'react';

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
  };
};

const services = [
  {
    icon: <FaUser />,
    title: 'User Management',
    description: 'Manage and organize user information for your PC registration system seamlessly.'
  },
  {
    icon: <FaLaptop />,
    title: 'Device Registration',
    description: 'Register and track devices in your system with detailed device information.'
  },
  {
    icon: <FaDatabase />,
    title: 'Data Security',
    description: 'Ensure your registration data is secure and encrypted using advanced security protocols.'
  },
  {
    icon: <FaCheckCircle />,
    title: 'Verification Process',
    description: 'Automated verification for registered devices and users, ensuring compliance.'
  },
];

const Service = () => {
  return (
    <section className='bg-background py-12'>
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-background font-serif"
          style={{ color: '#edf3fc' }} 
          variants={SlideDown(0.5)}
          initial="hidden"
          whileInView="show"
        >
          Our Services
        </motion.h2>
        <motion.p3
          className="mt-4 text-paragraphColor font-serif text-sm md:text-lg"
          style={{ color: '#8da2c0' }} 
          variants={SlideDown(1)}
          initial="hidden"
          whileInView="show"
        >
          Explore the key features of our PC Registration System
        </motion.p3>
      </motion.div>
     
      <motion.div
        className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }} 
        variants={{
          show: {
            transition: {
              staggerChildren: 0.3 
            }
          }
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="rounded-lg shadow-lg p-6 text-center bg-[#e5e7eb]" 
            style={{ border: '1px solid #d1d5db' }} 
            variants={SlideDown(index * 0.3)} 
            whileHover={{ backgroundColor: '#f3f4f6', scale: 1.05 }} 
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center items-center text-4xl mb-4 text-background text-center mx-auto h-16 w-16 ">
              {service.icon}
            </div>

            <h3 className="text-xl font-semibold text-background font-serif">
              {service.title}
            </h3>
            <p className="mt-2 text-paragraphColor font-serif">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Service;
