import React from "react";
import landing from "./assets/landing-Photoroom.png";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] font-serif">
      <div className="container py-14 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-paragraphColor">
          <div className="space-y-3 lg:max-w-[300px]">
            <img src={landing} alt="" className="w-24" />
            <p>Better Solutions to Secure PC Registration</p>
            <a href="" className="inline-block mt-6 text-sm ">
              Kurazinterns.com
            </a>
          </div>
          <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h1 className="text-xl font-semibold">Links</h1>
              <ul className="space-y-3 mt-6">
                <Link to={'/'}><li className="footer-link hover:text-green-400 transition-colors duration-300 hover:scale-180 hover:border-b border-purple-500 w-1/5 ">Home</li></Link>
                <li className="footer-link hover:text-green-400 transition-colors duration-300 hover:scale-180 hover:border-b border-purple-500 w-1/5">About</li>
                <li className="footer-link hover:text-green-400 transition-colors duration-300 hover:scale-180 hover:border-b border-purple-500 w-1/3">Contact-us</li>
                <li className="footer-link hover:text-green-400 transition-colors duration-300 hover:scale-180 hover:border-b border-purple-500 w-1/5">Menu</li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Contact us</h1>
              <ul className="space-y-3 mt-6">
                <li className="footer-link">09xxxxxxxx</li>
                <li className="footer-link">pcregister.com</li>
                <li className="footer-link">22Golagol Tower</li>
                <li className="footer-link"></li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Follow us</h1>
              <ul className="space-y-3 mt-6">
                <li className="footer-link flex items-center hover:text-green-400 transition-colors duration-300">
                  <FaGithub className="mr-2 hover:scale-110 transition-transform duration-300" />{" "}
                  Github
                </li>
                <li className="footer-link flex items-center hover:text-green-400 transition-colors duration-300">
                  <FaLinkedin className="mr-2 hover:scale-110 transition-transform duration-300" />{" "}
                  Linkedin
                </li>
                <li className="footer-link flex items-center hover:text-green-400 transition-colors duration-300">
                  <FaTelegram className="mr-2 hover:scale-110 transition-transform duration-300" />{" "}
                  Telegram
                </li>
                <li className="footer-link flex items-center hover:text-green-400 transition-colors duration-300">
                  <FaInstagram className="mr-2 hover:scale-110 transition-transform duration-300" />{" "}
                  Instagram
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-1 bg-gray-400 mt-7"></div>
        <div className="flex justify-between text-paragraphColor p-5">
          <div>Prepared by our team</div>
          <div>Address: 22 Hanak Building, Addis Ababa, Ethiopia </div>
          <div>Copy right resererved @2024</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
