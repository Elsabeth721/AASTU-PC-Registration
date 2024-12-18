import React, { useState } from 'react';
import logo from './assets/logo.png';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

const NavMenu = [
  { id: 1, title: 'Home', target: 'home-section', delay: 0.1 },
  { id: 2, title: 'Student', target: 'student-section', delay: 0.2 },
  { id: 3, title: 'Admin', target: 'admin-section', delay: 0.3 },
  { id: 4, title: 'Super-Admin', target: 'super-admin-section', delay: 0.4 },
  { id: 5, title: 'About Us', target: 'about-us', delay: 0.5 },
];

const SlideDown = (delay) => ({
  initial: { y: '-100%', opacity: 0 },
  animate: {
    y: '0',
    opacity: 1,
    transition: { duration: 0.8, delay: delay },
  },
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="shadow-md bg-background">
      <div className="container flex justify-between items-center font-serif py-2 md:py-4">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          src={logo}
          alt=""
          className="w-32 h-20 md:w-36 md:h-24"
        />
        <div className="hidden md:block">
          <ul className="flex gap-6">
            {NavMenu.map((menu) => (
              <motion.li
                variants={SlideDown(menu.delay)}
                initial="initial"
                animate="animate"
                key={menu.id}
                className="nav-menu inline-block px-2 py-2 text-xl md:text-2xl text-paragraphColor"
                data-delay={menu.delay}
              >
                <a href={`#${menu.target}`} className="inline-block px-2 py-2 text-xl md:text-2xl">
                  {menu.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button className="md:hidden text-2xl" onClick={toggleMenu}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1, transition: { duration: 0.5 } }}
          exit={{ height: 0, opacity: 0, transition: { duration: 0.5 } }}
        >
          <ul className="flex flex-col gap-4 px-4 py-6 shadow-md">
            {NavMenu.map((menu) => (
              <motion.li
                variants={SlideDown(menu.delay)}
                initial="initial"
                animate="animate"
                key={menu.id}
                className="nav-menu inline-block px-2 py-2 text-xl list-none text-paragraphColor"
                data-delay={menu.delay}
              >
                <a href={`#${menu.target}`} className="inline-block px-2 py-2 text-xl">
                  {menu.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
