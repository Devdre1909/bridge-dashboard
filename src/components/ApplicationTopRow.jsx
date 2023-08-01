import React, { useEffect, useState } from 'react';
import { DarkButton } from './Buttons';
import AddApplicationPanel from './AddApplicationPanel';
import axios from 'axios';
import { API_BASE_URL, TEST_TOKEN } from '../libs/consts';
import {
  ToastErrorMessage, ToastSuccessMessage, generateRandomString
} from '../libs/utils'

export default function TopRow() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [appKeyValue, setAPIKeyValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClosePanel = () => {
    setIsDrawerOpen(false)
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleAppKeyChange = (event) => {
    setAPIKeyValue(event.target.value);
  };

  const handleAutoGenerateClickFunction = () => {
    const randomValue = generateRandomString();
    setAPIKeyValue(randomValue);
  };

  useEffect(() => {

    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isError, isSuccess]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: nameValue,
      api_key: appKeyValue
    };

    try {
      await axios.post(`${API_BASE_URL}/application/create`, payload, {
        headers: {
          'Authorization': 'Bearer ' + TEST_TOKEN
        }
      });
      setIsSuccess(true)
      window.location.reload()
    } catch (e) {
      setIsError(true)
    }
  };


  return (
    <div className='bg-[#F2F2F3] h-16 flex justify-between items-center border-gray-200 pt-3 pb-3 '>
      <div className='text-black font-bold text-xl ml-5'>My Applications</div>
      <div className='mr-5' >
        <DarkButton variable={'Add Application'} onClickAction={handleButtonClick} />
      </div>
      {isDrawerOpen && (
        <AddApplicationPanel onSubmitAction={handleSubmit}
          appKeyValue={appKeyValue} nameValue={nameValue}
          handleAppKeyChange={handleAppKeyChange}
          handleNameChange={handleNameChange}
          handleClosePanel={handleClosePanel}
          handleAutoGenerateClick={handleAutoGenerateClickFunction}
        />
      )}
      {isError && <ToastErrorMessage variable={'Error occured!'} />}
      {isSuccess && <ToastSuccessMessage variable={'Done!'} />}
    </div>
  );
}
