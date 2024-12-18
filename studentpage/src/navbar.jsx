import React, { useState } from 'react';
import { Menu } from 'antd';
import computerIcon from '../src/assets/user-with-laptop-computer-icon-over-white-background-silhouette-style-illustration-free-vector.jpg';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const { Item } = Menu;

const NavMenu = [
  { id: 1, title: 'Home', target: 'home-section' },
  { id: 2, title: 'Student', target: 'student-section' },
  { id: 3, title: 'Admin', target: 'admin-section' },
  { id: 4, title: 'Super-Admin', target: 'super-admin-section' },
  { id: 5, title: 'About Us', target: 'about-us' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem.key);
    setIsMenuOpen(false); // Close the menu on item click
  };

  return (
    <nav className="bg-[#000F1F] fixed top-0 left-0 right-0 h-[14vh] z-50 shadow-md p-4 font-poppins">
      <div className="flex justify-between sm:justify-evenly items-center h-full px-4 md:px-8">
        <div className="flex items-center gap-2">
          <img src={computerIcon} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" alt="Computer Icon" />
        </div>

        <div className="hidden md:block">
          <Menu
            mode="horizontal"
            selectedKeys={[activeMenu]}
            className="flex gap-3"
            onClick={handleMenuClick}
            style={{ backgroundColor: 'transparent' }} // Set menu background to transparent
          >
            {NavMenu.map((menu) => (
              <Item 
                key={menu.title} 
                style={{ backgroundColor: 'transparent' }} // Set item background to transparent
                className="text-lg md:text-xl"
              >
                <a
                  href={`#${menu.target}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent reload
                    handleMenuClick(menu); // Handle click
                  }}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    color: 'white', // Set text color to white
                    fontWeight: 'bold', // Make text bold
                    textDecoration: 'none',
                    borderBottom: activeMenu === menu.title ? '4px solid #00AED9' : 'none', // Unified border color
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#00AED9'; // Change color on hover
                    e.currentTarget.style.borderBottom = '4px solid #00AED9'; // Set border color on hover
                  }} 
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white'; // Reset color
                    e.currentTarget.style.borderBottom = activeMenu === menu.title ? '4px solid #00AED9' : 'none'; // Reset border
                  }} 
                >
                  {menu.title}
                </a>
              </Item>
            ))}
          </Menu>
        </div>

        <button
          className="md:hidden text-xl text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[10vh] left-0 right-0 bg-[#000F1F] shadow-md">
          <Menu
            mode="vertical"
            selectedKeys={[activeMenu]}
            className="flex flex-col gap-4 px-4 py-6"
            onClick={handleMenuClick}
            style={{ backgroundColor: 'transparent' }} // Set menu background to transparent
          >
            {NavMenu.map((menu) => (
              <Item 
                key={menu.title} 
                style={{ backgroundColor: 'transparent' }} // Set item background to transparent
              >
                <a
                  href={`#${menu.target}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent reload
                    handleMenuClick(menu); // Handle click
                  }}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    color: 'white', // Set text color to white
                    fontWeight: 'bold', // Make text bold
                    textDecoration: 'none',
                    borderBottom: activeMenu === menu.title ? '4px solid #00AED9' : 'none', // Unified border color
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#00AED9'; // Change color on hover
                    e.currentTarget.style.borderBottom = '4px solid #00AED9'; // Set border color on hover
                  }} 
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white'; // Reset color
                    e.currentTarget.style.borderBottom = activeMenu === menu.title ? '4px solid #00AED9' : 'none'; // Reset border
                  }} 
                >
                  {menu.title}
                </a>
              </Item>
            ))}
          </Menu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
