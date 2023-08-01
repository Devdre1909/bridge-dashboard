import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, TEST_TOKEN } from '../libs/consts';
import { DarkButton } from './Buttons';
import folder_connector_icon from '../components/assests/folder-connection.svg'
import application_name_icon_soft from '../components/assests/application_name_icon_soft.svg';
import { useParams } from 'react-router-dom';
import arrow_right from '../components/assests/arrow-right.svg'
import { useNavigate } from 'react-router-dom';
import AddDatabasePanel from './AddDatabasePanel'
import {
  ToastErrorMessage, ToastSuccessMessage
} from '../libs/utils'

export default function TopRow() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClosePanel = () => {
    setIsDrawerOpen(false)
  };
  const { application_id, application_name } = useParams();


  const handleFormSubmit = async (data) => {
    const payload = {
      host: data.host,
      port: Number(data.port),
      database: data.database,
      username: data.username,
      password: data.password,
      db_engine: data.selectedDatabase
    };

    try {
      await axios.post(`${API_BASE_URL}/application/${application_id}/add-database`, payload, {
        headers: {
          'Authorization': 'Bearer ' + TEST_TOKEN
        }
      });
      setIsSuccess(true)
      window.location.reload()
    } catch (e) {
      setIsError(true)
    }
  }

  const navigate = useNavigate();
  return (
    <div className='bg-[#F2F2F3] h-16 flex justify-between items-center border-gray-200 pt-3 pb-3 '>
      <div className='flex items-center ml-5'>
        <div className='flex items-center cursor-pointer' onClick={() => navigate('/applications')}>
          <img src={application_name_icon_soft} className='h-5 w-5'
            alt='application name icon' />
          <span className='ml-2 mr-1 font-medium	text-xl text-gray-500'>{application_name}</span>
        </div>
        <img src={arrow_right} alt='arrow right' />
        <img src={folder_connector_icon} alt=' folder connector icon' />
        <div className='text-black font-bold text-xl ml-2'>Databases</div>
      </div>
      <div className='mr-5'>
        <DarkButton variable={'Add database'} onClickAction={handleButtonClick} />
      </div>
      {isDrawerOpen && (
        <AddDatabasePanel
          handleClosePanel={handleClosePanel}
          onFinalSubmitAction={handleFormSubmit}
        />
      )}
      {isError && <ToastErrorMessage variable={'Error occured!'} />}
      {isSuccess && <ToastSuccessMessage variable={'Done!'} />}
    </div>
  );
}
