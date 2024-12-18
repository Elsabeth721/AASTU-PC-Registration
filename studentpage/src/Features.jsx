import React from "react";
import img1 from "/1.png";  // Importing the first image from assets
import img2 from "/3.png";  // Importing the second image from assets
import img3 from "/2.png";  // Importing the third image from assets

const Features = () => {
  const cardData = [
    {
      title1: "Admin role functionality",
      title2: "some Admin role",
      img: img1,  // Using 1.png for the first card
      description:
        "Admin can register pc,authorize pc when student exit and manage them",
      position: true,
    },
    {
      title1: "Super Admin can do    ",
      title2: "Some superAdmin role",
      img: img2,  // Using 2.png for the second card
      description:
        "it can manage Admin, view recorder pc and data backup!",
      position: true,
    },
    {
      title1: "pc",
      title2: "How pc can be registered",
      img: img3,  // Using 3.png for the third card
      description:
        "when registering pc students should fulfill some criteria like serial number,student id ,student name ,pc brand and pc color needed",
      position: true,
    },
  ];

  return (
    <div className="py-40 bg-background text-center text-white">
      <div className="flex flex-col w-full h-[500px] bg-gradient-to-br bg-black pl-3 md:pl-20 lg:pl-40 pt-16">
        <div className=" flex flex-col w-fit justify-left">
        <h1 className="text-lg font-bold text-white text-left mb-5">
  Basic <span className="text-[#5516DA]">Features</span>
</h1>

          <h1 className="font-bold text-white text-left text-3xl mb-1">
          and  Roles
          </h1>
          <h1 className="font-bold text-[#5516DA] text-left text-3xl">
of our actors          </h1>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-center -mt-[275px] w-full">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title1={card.title1}
            title2={card.title2}
            img={card.img}
            description={card.description}
            position={card.position}
          />
        ))}
      </div>
    </div>
  );
};
const Card = ({ title1, title2, description, img, position }) => {
  return (
    <div className="w-[400px] h-[597px] flex-shrink-0 rounded-[28px] bg-white flex justify-center items-center flex-col p-5 hover:scale-105 cursor-pointer transition-all duration-300">
      <h3 className={`${!position ? "hidden" : ""} text-[27px] font-bold text-black`}>
        {title1} <span className="text-[#5516DA]">{title2}</span>
      </h3>
      <p className={`${!position ? "hidden" : ""} text-black text-center text-[12px] font-bold px-[14px]`}>
        {description}
      </p>
      <img src={img} alt="Screen Shoot" className="w-[214px] h-[430px] flex-shrink-0 mt-5" />
      <h3 className={`${position ? "hidden" : ""} text-[27px] font-bold text-black`}>
        {title1} <span className="text-[#5516DA]">{title2}</span>
      </h3>
      <p className={`${position ? "hidden" : ""} text-black text-center text-[12px] font-bold px-[14px]`}>
        {description}
      </p>
    </div>
  );
};

const HowCard = ({ img, title, description }) => {
  return (
    <div className="flex gap-3 md:gap-5 items-center h-fit w-fit px-4 ">
      <img className="h-[70px] w-[70px]" src={img} alt="" />
      <div className="flex flex-col gap-1">
        <h1 className="text-[20px] font-bold">{title}</h1>
        <p className="text-xs md:pr-32 text-justify text-wrap">{description}</p>
      </div>
    </div>
  );
};

export default Features;
