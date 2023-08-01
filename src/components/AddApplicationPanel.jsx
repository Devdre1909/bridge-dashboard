import React, { useEffect, useRef } from 'react';
import closeCircleIcon from '../components/assests/close-circle.svg'
import { DarkButton } from './Buttons';

const AddApplicationPanel = ({ nameValue, appKeyValue, handleNameChange, handleAppKeyChange, onSubmitAction,
  handleClosePanel, handleAutoGenerateClick }) => {
  const drawerRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      handleClosePanel();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <div ref={drawerRef} className="fixed top-0 right-0 h-100 w-1/3 bg-white shadow-md p-4 mt-36 rounded-lg mr-5 backdrop-blur-md bg-opacity-30 ">
      <form onSubmit={onSubmitAction}>
        <div className='flex-col'>
          <div className='flex justify-between items-center border-b-2 border-slate-400 mb-4 pb-4'>
            <div className='text-black font-bold text-lg'>Add new application</div>
            <button onClick={() => handleClosePanel()}>
              <img src={closeCircleIcon}
                alt='close panel icon' />
              <span></span>
            </button>
          </div>
          <div className="mt-7">
            <div className="mb-5">
              <label className="block text-gray-700 mb-2" htmlFor="input1">
                Name:
              </label>
              <input
                className="border border-gray-400 p-2 w-full"
                type="text"
                id="input1"
                value={nameValue}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-7">
              <div className='flex justify-between '>
                <label className="block text-gray-700 mb-2" htmlFor="input2">
                  App Key:
                </label>
                <button className="block text-gray-700 mb-2 text-sm underline decoration-solid font-bold" htmlFor="input2" onClick={handleAutoGenerateClick} type='button'>
                  Auto generate
                </button>
              </div>
              <input
                className="border border-gray-400 p-2 w-full"
                type="text"
                id="input2"
                value={appKeyValue}
                onChange={handleAppKeyChange}
              />
            </div>
          </div>
          <div className='ml-2 mr-2 mb-5'>
            <DarkButton variable={'Add Application'} fullWidth={true} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddApplicationPanel;