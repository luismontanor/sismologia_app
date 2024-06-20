import React from 'react';

const CardList = ({ feature, onClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer" onClick={() => onClick(feature)}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{feature.attributes.title}</div>
        <p className="text-gray-700 text-base">
          Magnitude: {feature.attributes.magnitude}
        </p>
        <p className="text-gray-700 text-base">
          Place: {feature.attributes.place}
        </p>
      </div>
    </div>
  );
};

export default CardList;
