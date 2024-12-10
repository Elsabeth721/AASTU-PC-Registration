// src/components/InfoCard.jsx
import React from 'react';

const InfoCard = ({ title, value }) => {
  return (
    <div className="p-4 navbar rounded-md shadow-md "  style={{
      border: `solid var(--text-color) 2px`, // Apply shadow using --text-color
    }}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-xl">{value}</p>
  </div>
  );
};

export default InfoCard;
