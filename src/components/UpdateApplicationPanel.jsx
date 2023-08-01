import React from 'react';
import closeCircleIcon from '../components/assests/close-circle.svg'
import { DarkButton } from './Buttons';

const UpdateApplicationPanel = ({ nameValue, appKeyValue, handleNameChange, handleAppKeyChange, onSubmitAction,
  handleClosePanel, handleAutoGenerateClick }) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="w-1/3 bg-white shadow-md p-4 rounded-lg backdrop-blur-md bg-opacity-30">
        <form onSubmit={onSubmitAction}>
          <div className="flex-col">
            <div className="flex justify-between items-center border-b-2 border-slate-400 mb-4 pb-4">
              <div className="text-black font-bold text-lg">Edit application</div>
              <button onClick={() => handleClosePanel()}>
                <img src={closeCircleIcon} alt="close panel icon" />
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
                <div className="flex justify-between">
                  <label className="block text-gray-700 mb-2" htmlFor="input2">
                    App Key:
                  </label>
                  <button
                    className="block text-gray-700 mb-2 text-sm underline decoration-solid font-bold"
                    htmlFor="input2"
                    onClick={handleAutoGenerateClick}
                    type="button"
                  >
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
            <div className="ml-2 mr-2 mb-5">
              <DarkButton variable={"Update Application"} fullWidth={true} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateApplicationPanel;