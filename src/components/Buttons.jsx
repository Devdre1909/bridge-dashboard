import React from 'react';
import addApplicationIcon from '../components/assests/add-application-icon.svg';

export const DarkButton = ({ variable, onClickAction, fullWidth }) => {
  const buttonWidth = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`flex items-center justify-center px-4 py-2 bg-[#161619] text-white gap-2 ${buttonWidth}`}
      onClick={onClickAction}
    >
      <img src={addApplicationIcon} alt="Icon" />
      <span>{variable}</span>
    </button>
  );
};

export const LightButton = ({ variable, icon, onClickAction, borderColor, textColor }) => {
  return (
    <div className='2xl:w-20 xl:w-20 950:w-10 md:w-10 sm:w-20 603:w-10 '>
      <button
        className={`flex w-full p-1.5 justify-center items-center gap-2 border-2 border-black px-2 py-3 h-6 rounded-sm ${borderColor} ${textColor}`}
        onClick={onClickAction}
      >
        <img src={icon} alt="Icon" />
        <span className="hidden xl:inline 2xl:inline  ">{variable}</span>
      </button>
    </div>
  );
}
