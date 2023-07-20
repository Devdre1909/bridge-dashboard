import React from 'react';
import addApplicationIcon from './add-application-icon.svg'

const DarkButton = ({variable}) => {
  return (
    <button className="flex items-center mr-5 px-4 py-2 bg-[#161619] text-white gap-2">
      <img
        src={addApplicationIcon}
        alt="Logo"
      />
      <span>{variable}</span>
    </button>
  );
};

export default DarkButton;